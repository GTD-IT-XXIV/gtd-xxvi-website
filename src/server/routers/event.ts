import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { dashboardProcedure } from "@/server/procedures/dashboard-procedure";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

import { nameKeySchema } from "./schemas";

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany();
  }),

  getByName: publicProcedure
    .input(z.object({ name: nameKeySchema }))
    .query(async ({ ctx, input }) => {
      const { name } = input;
      const event = await ctx.db.event.findUnique({ where: { name } });
      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No event with name '${name}'`,
        });
      }
      return event;
    }),

  countBookingsByName: dashboardProcedure
    .input(z.object({ name: nameKeySchema }))
    .query(async ({ ctx, input }) => {
      const { name } = input;
      const event = await ctx.db.event.findUnique({
        where: { name },
        select: { _count: { select: { bookings: true } } },
      });
      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No event with name '${name}'`,
        });
      }
      return event._count.bookings;
    }),
});
