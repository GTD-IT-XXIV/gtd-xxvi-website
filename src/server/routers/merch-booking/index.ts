import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

import { handleCreate, handleCreateMany } from "./handlers";
import { merchBookingSchema } from "./schemas";

export const merchBookingRouter = createTRPCRouter({
  create: publicProcedure
    .input(merchBookingSchema)
    .mutation(async ({ ctx, input }) => {
      return await handleCreate({ ctx, input });
    }),

  createMany: publicProcedure
    .input(z.object({ bookings: merchBookingSchema.array() }))
    .mutation(async ({ ctx, input }) => {
      return await handleCreateMany({ ctx, input });
    }),
});
