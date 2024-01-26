import { type Booking, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { extendPrismaTransaction } from "@/server/routers/utils";

import { bookingEventConsistencySchema, bookingSchema } from "./schemas";
import { checkEventConsistency, createBooking } from "./utils";

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

  return await createBooking(ctx.db, input);
}

const createManyInputSchema = z.object({
  bookings: bookingSchema.array(),
});

type CreateManyHandlerOptions = {
  input: z.infer<typeof createManyInputSchema>;
} & HandlerOptions;

export async function handleCreateMany({
  ctx,
  input,
}: CreateManyHandlerOptions) {
  const { bookings } = input;
  const isBookingsConsistent = bookings.every(
    async (booking) =>
      await checkEventConsistency(
        ctx.db,
        bookingEventConsistencySchema.parse(booking),
      ),
  );

  if (!isBookingsConsistent) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Event ids of booking, bundle and timeslot do not match",
    });
  }

  return await ctx.db.$transaction(async (tx) => {
    const result: Booking[] = [];
    const extendedTx = extendPrismaTransaction(tx);
    for (const booking of bookings) {
      result.push(await createBooking(extendedTx as PrismaClient, booking));
    }
    return result;
  });
}
