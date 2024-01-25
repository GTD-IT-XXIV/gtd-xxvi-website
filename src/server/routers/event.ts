import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany();
  }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.number().positive(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const event = await ctx.db.event.findUnique({ where: { id } });
      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No event with id '${id}'`,
        });
      }
      return event;
    }),

  getByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
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

  countBookingsById: publicProcedure
    .input(z.object({ id: z.number().positive() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const event = await ctx.db.event.findUnique({
        where: { id },
        select: { _count: { select: { bookings: true } } },
      });
      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No event with id '${id}'`,
        });
      }
      return event._count.bookings;
    }),
});
