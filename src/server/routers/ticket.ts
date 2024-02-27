import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { dashboardProcedure } from "@/server/procedures/dashboard-procedure";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

import { nameKeySchema } from "./schemas";

export const ticketRouter = createTRPCRouter({
  getAll: dashboardProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const tickets = await ctx.db.ticket.findMany({
        where: {},
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { id: "asc" },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (tickets.length > limit) {
        const nextTicket = tickets.pop();
        nextCursor = nextTicket?.id ?? undefined;
      }
      return { tickets, nextCursor };
    }),

  getById: dashboardProcedure
    .input(z.object({ id: z.number().positive() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const ticket = await ctx.db.ticket.findUnique({ where: { id } });
      if (!ticket) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No ticket with id '${id}'`,
        });
      }
      return ticket;
    }),

  getManyByEvent: dashboardProcedure
    .input(z.object({ event: nameKeySchema }))
    .query(async ({ ctx, input }) => {
      const { event } = input;
      const tickets = await ctx.db.ticket.findMany({
        where: { eventName: event },
      });
      return tickets;
    }),

  countByEvent: dashboardProcedure
    .input(z.object({ event: nameKeySchema }))
    .query(async ({ ctx, input }) => {
      const { event } = input;
      const tickets = await ctx.db.ticket.findMany({
        where: { eventName: event },
      });
      return tickets.length;
    }),

  getManyByPaymentIntent: publicProcedure
    .input(z.object({ paymentIntentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { paymentIntentId } = input;
      const orders = await ctx.db.order.findMany({
        where: { paymentIntentId },
        include: { tickets: true },
      });
      const tickets = orders.flatMap((order) => order.tickets);
      return tickets;
    }),
});
