import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/config";

export const ticketsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.ticket.findMany();
  }),
  getById: publicProcedure
    .input(z.number().positive())
    .query(({ ctx, input }) => {
      return ctx.prisma.ticket.findUnique({ where: { id: input } });
    }),
  getManyByEventId: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) => {
      return ctx.prisma.ticket.findMany({
        where: { timeslot: { eventId: input } },
      });
    }),
});