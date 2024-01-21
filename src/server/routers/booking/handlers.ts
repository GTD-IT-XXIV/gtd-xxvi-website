import { Prisma, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type z } from "zod";

import { retryPrismaTransaction } from "@/server/routers/utils";

import {
  bookingEventConsistencySchema,
  type bookingSchema,
  type updateHandlerInputSchema,
} from "./schemas";
import { checkEventConsistency } from "./utils";

type HandlerOptions = {
  ctx: {
    headers: Headers;
    db: PrismaClient;
  };
};

type CreateHandlerOptions = {
  input: z.infer<typeof bookingSchema>;
} & HandlerOptions;

export async function handleCreate({ ctx, input }: CreateHandlerOptions) {
  const isBookingConsistent = await checkEventConsistency(
    ctx.db,
    bookingEventConsistencySchema.parse(input),
  );
  if (!isBookingConsistent) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Event ids of booking, bundle and timeslot do not match",
    });
  }

  const { quantity, bundleId, timeslotId } = input;
  const bundle = await ctx.db.bundle.findUnique({
    where: { id: bundleId },
  });
  const timeslot = await ctx.db.timeslot.findUnique({
    where: { id: timeslotId },
  });

  // Unreachable code but necessary for type safety
  if (!bundle || !timeslot) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occurred",
    });
  }

  const partySize = quantity * bundle.quantity;

  async function transaction() {
    // Unreachable code but necessary for type safety
    if (!bundle || !timeslot) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred",
      });
    }
    return await ctx.db.$transaction(
      async (tx) => {
        if (bundle.remainingAmount !== null) {
          const bundle = await tx.bundle.update({
            where: { id: bundleId },
            data: { remainingAmount: { decrement: quantity } },
          });
          if (bundle.remainingAmount! < 0) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Insufficient number of bundles",
            });
          }
        }

        const timeslot = await tx.timeslot.update({
          where: { id: timeslotId },
          data: { remainingSlots: { decrement: partySize } },
        });
        if (timeslot.remainingSlots < 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Insufficient number of timeslots",
          });
        }
        return await tx.booking.create({ data: input });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );
  }

  return await retryPrismaTransaction(transaction);
}

type UpdateHandlerOptions = {
  input: z.infer<typeof updateHandlerInputSchema>;
} & HandlerOptions;

export async function handleUpdate({ ctx, input }: UpdateHandlerOptions) {
  const { id, email, eventId, bundleId, timeslotId, quantity } = input;
  let bookingIdentifier: Prisma.BookingWhereUniqueInput | undefined = undefined;

  // if (id) XNOR (email && eventId)
  if (id ? email && eventId : !(email && eventId)) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Invalid inputs",
    });
  }
  if (id) {
    bookingIdentifier = { id };
  }
  if (email && eventId) {
    bookingIdentifier = { email_eventId: { email, eventId } };
  }
  if (!bookingIdentifier) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Invalid inputs",
    });
  }

  if (!quantity && !bundleId && !timeslotId) {
    return await ctx.db.booking.update({
      where: bookingIdentifier,
      data: { ...input },
    });
  }

  const booking = await ctx.db.booking.findUnique({
    where: bookingIdentifier,
  });
  if (!booking) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Booking not found",
    });
  }

  const isBookingConsistent = await checkEventConsistency(ctx.db, {
    eventId: booking.eventId,
    bundleId: bundleId ?? booking.bundleId,
    timeslotId: timeslotId ?? booking.timeslotId,
  });
  if (!isBookingConsistent) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Event ids of booking, bundle and timeslot do not match",
    });
  }

  const oldBundle = await ctx.db.bundle.findUnique({
    where: { id: booking.bundleId },
  });
  const oldTimeslot = await ctx.db.timeslot.findUnique({
    where: { id: booking.timeslotId },
  });
  if (!oldBundle) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Existing booking bundle not found",
    });
  }
  if (!oldTimeslot) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Existing booking timeslot not found",
    });
  }

  const oldPartySize = booking.quantity * oldBundle.quantity;
  const newPartySize = quantity ?? booking.quantity * oldBundle.quantity;

  async function transaction() {
    // Unreachable code but necessary for type safety
    if (!booking || !oldBundle) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred",
      });
    }
    return await ctx.db.$transaction(async (tx) => {
      if (bundleId && bundleId !== booking.bundleId) {
        if (oldBundle.remainingAmount != null) {
          // free up old bundle slots
          await tx.bundle.update({
            where: { id: booking.bundleId },
            data: { remainingAmount: { increment: booking.quantity } },
          });
        }

        let newBundle = await tx.bundle.findUnique({
          where: { id: bundleId },
        });
        if (!newBundle) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `No bundle with id '${bundleId}'`,
          });
        }
        if (newBundle.remainingAmount != null) {
          // fill up new bundle slots
          newBundle = await tx.bundle.update({
            where: { id: bundleId },
            data: { remainingAmount: { decrement: booking.quantity } },
          });
          if (newBundle.remainingAmount! < 0) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Insufficient number of bundles",
            });
          }
        }
      }
      if (timeslotId && timeslotId !== booking.timeslotId) {
        // free up old timeslots
        await tx.timeslot.update({
          where: { id: booking.timeslotId },
          data: { remainingSlots: { increment: oldPartySize } },
        });

        // fill up new timeslots
        const newTimeslot = await tx.timeslot.update({
          where: { id: timeslotId },
          data: { remainingSlots: { decrement: newPartySize } },
        });
        if (newTimeslot.remainingSlots < 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Insufficient number of timeslots",
          });
        }
      }

      // Unreachable code but necessary for type safety
      if (!bookingIdentifier) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred",
        });
      }
      return await tx.booking.update({
        where: bookingIdentifier,
        data: { ...input },
      });
    });
  }

  return await retryPrismaTransaction(transaction);
}
