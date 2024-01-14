import { Prisma, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

export const bookingSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  telegramHandle: z.string(),
  phoneNumber: z.string(),
  quantity: z.number().nonnegative(),
  eventId: z.number().positive(),
  bundleId: z.number().positive(),
  timeslotId: z.number().positive(),
  sessionId: z.string().optional(),
});

export const bookingRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().positive().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const bookings = await ctx.db.booking.findMany({
        where: {},
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { created: "desc" },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (bookings.length > limit) {
        const nextBooking = bookings.pop();
        nextCursor = nextBooking?.id ?? undefined;
      }
      return { bookings, nextCursor };
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.number().positive(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const booking = await ctx.db.booking.findUnique({ where: { id } });
      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No booking with id '${id}'`,
        });
      }
      return booking;
    }),

  getByEmailAndEvent: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        eventId: z.number().positive(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { email, eventId } = input;
      const booking = await ctx.db.booking.findUnique({
        where: { email_eventId: { ...input } },
      });
      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No booking by email '${email}' for event with id '${eventId}'`,
        });
      }
      return booking;
    }),

  getManyByEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      const { email } = input;
      const bookings = await ctx.db.booking.findMany({ where: { email } });
      return bookings;
    }),

  getManyByEmailAndEvents: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        eventIds: z.number().positive().array(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { email, eventIds } = input;
      const bookings = await ctx.db.booking.findMany({
        where: { email, eventId: { in: eventIds } },
      });
      return bookings;
    }),

  create: publicProcedure
    .input(bookingSchema)
    .mutation(async ({ ctx, input }) => {
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

      if (!bundle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No bundle with id '${bundleId}'`,
        });
      }
      if (!timeslot) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No timeslot with id '${timeslotId}'`,
        });
      }

      const partySize = quantity * bundle.quantity;

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
          return await ctx.db.booking.create({ data: input });
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
    }),

  updateById: publicProcedure
    .input(
      z.object({
        id: z.number().positive(),
        name: z.string().optional(),
        telegramHandle: z.string().optional(),
        phoneNumber: z.string().optional(),
        quantity: z.number().nonnegative().optional(),
        bundleId: z.number().positive().optional(),
        timeslotId: z.number().positive().optional(),
        sessionId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, bundleId, timeslotId, quantity } = input;

      if (!quantity && !bundleId && !timeslotId) {
        return await ctx.db.booking.update({
          where: { id },
          data: { ...input },
        });
      }

      const booking = await ctx.db.booking.findUnique({
        where: { id },
      });
      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No booking with id '${id}'`,
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
        return await tx.booking.update({
          where: { id },
          data: { ...input },
        });
      });
    }),

  updateByEmailAndEvent: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        eventId: z.number().positive(),
        name: z.string().optional(),
        telegramHandle: z.string().optional(),
        phoneNumber: z.string().optional(),
        quantity: z.number().nonnegative().optional(),
        bundleId: z.number().positive().optional(),
        timeslotId: z.number().positive().optional(),
        sessionId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, eventId, bundleId, timeslotId, quantity } = input;

      if (!quantity && !bundleId && !timeslotId) {
        return await ctx.db.booking.update({
          where: { email_eventId: { email, eventId } },
          data: { ...input },
        });
      }

      const booking = await ctx.db.booking.findUnique({
        where: { email_eventId: { email, eventId } },
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
        return await tx.booking.update({
          where: { email_eventId: { email, eventId } },
          data: { ...input },
        });
      });
    }),

  deleteById: publicProcedure
    .input(z.number().positive())
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.booking.findUnique({
        where: { id: input },
        include: { bundle: true },
      });

      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking not found",
        });
      }

      const partySize = booking.quantity * booking.bundle.quantity;
      // free up bundles
      await ctx.db.bundle.update({
        where: { id: booking.bundleId },
        data: { remainingAmount: { increment: booking.quantity } },
      });
      // free up timeslots
      await ctx.db.timeslot.update({
        where: { id: booking.timeslotId },
        data: { remainingSlots: { increment: partySize } },
      });

      return await ctx.db.booking.delete({ where: { id: input } });
    }),

  deleteByEmailAndEvent: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        eventId: z.number().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, eventId } = input;
      const booking = await ctx.db.booking.findUnique({
        where: { email_eventId: { email, eventId } },
        include: { bundle: true },
      });

      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking not found",
        });
      }

      const partySize = booking.quantity * booking.bundle.quantity;
      // free up bundles
      await ctx.db.bundle.update({
        where: { id: booking.bundleId },
        data: { remainingAmount: { increment: booking.quantity } },
      });
      // free up timeslots
      await ctx.db.timeslot.update({
        where: { id: booking.timeslotId },
        data: { remainingSlots: { increment: partySize } },
      });

      return await ctx.db.booking.delete({
        where: { email_eventId: { email, eventId } },
      });
    }),

  deleteManyByEmail: publicProcedure
    .input(z.string().email())
    .mutation(async ({ ctx, input }) => {
      const bookings = await ctx.db.booking.findMany({
        where: { email: input },
        include: { bundle: true },
      });

      if (bookings.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Bookings not found",
        });
      }

      for (const booking of bookings) {
        const partySize = booking.quantity * booking.bundle.quantity;
        // free up bundles
        await ctx.db.bundle.update({
          where: { id: booking.bundleId },
          data: { remainingAmount: { increment: booking.quantity } },
        });
        // free up timeslots
        await ctx.db.timeslot.update({
          where: { id: booking.timeslotId },
          data: { remainingSlots: { increment: partySize } },
        });
      }

      return await ctx.db.booking.deleteMany({ where: { email: input } });
    }),
});

const bookingEventConsistencySchema = bookingSchema.pick({
  eventId: true,
  bundleId: true,
  timeslotId: true,
});

export async function checkEventConsistency(
  db: PrismaClient,
  booking: z.infer<typeof bookingEventConsistencySchema>,
) {
  const id = booking.eventId; // source of truth
  const bundle = await db.bundle.findUnique({
    where: { id: booking.bundleId },
    select: { eventId: true },
  });
  const timeslot = await db.timeslot.findUnique({
    where: { id: booking.timeslotId },
    select: { eventId: true },
  });
  return id === bundle?.eventId && id === timeslot?.eventId;
}
