import { type MerchBooking, type PrismaClient } from "@prisma/client";
import { z } from "zod";

import { extendPrismaTransaction } from "@/server/routers/utils";

import { merchBookingSchema } from "./schemas";
import { createBooking } from "./utils";

type HandlerOptions = {
  ctx: {
    headers: Headers;
    db: PrismaClient;
  };
};

type CreateHandlerOptions = {
  input: z.infer<typeof merchBookingSchema>;
} & HandlerOptions;

export async function handleCreate({ ctx, input }: CreateHandlerOptions) {
  return await createBooking(ctx.db, input);
}

const createManyInputSchema = z.object({
  bookings: merchBookingSchema.array(),
});

type CreateManyHandlerOptions = {
  input: z.infer<typeof createManyInputSchema>;
} & HandlerOptions;

export async function handleCreateMany({
  ctx,
  input,
}: CreateManyHandlerOptions) {
  const { bookings } = input;

  return await ctx.db.$transaction(async (tx) => {
    const result: MerchBooking[] = [];
    const extendedTx = extendPrismaTransaction(tx);
    for (const booking of bookings) {
      result.push(await createBooking(extendedTx as PrismaClient, booking));
    }
    return result;
  });
}
