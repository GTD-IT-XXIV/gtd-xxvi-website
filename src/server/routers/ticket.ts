import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

export const ticketRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const tickets = await ctx.db.ticket.findMany({
        where: {},
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { created: "desc" },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (tickets.length > limit) {
        const nextTicket = tickets.pop();
        nextCursor = nextTicket?.id ?? undefined;
      }
      return { tickets, nextCursor };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
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

  getManyByEvent: publicProcedure
    .input(
      z.object({
        eventId: z.number().positive(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { eventId, cursor } = input;
      const tickets = await ctx.db.ticket.findMany({
        where: { timeslot: { eventId } },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { created: "desc" },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (tickets.length > limit) {
        const nextTicket = tickets.pop();
        nextCursor = nextTicket?.id ?? undefined;
      }
      return { tickets, nextCursor };
    }),

  getManyByPaymentIntent: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.db.ticket.findMany({ where: { paymentIntentId: id } });
    }),

  deleteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.db.ticket.delete({
        where: { id },
      });
    }),
});
