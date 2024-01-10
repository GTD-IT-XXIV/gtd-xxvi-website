import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

export const ticketsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.ticket.findMany();
  }),
  getById: publicProcedure
    .input(z.number().positive())
    .query(({ ctx, input }) => {
      return ctx.prisma.ticket.findUnique({ where: { id: input } });
    }),
  getManyByEvent: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.ticket.findMany({
      where: { timeslot: { eventId: input } },
    });
  }),
  deleteById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.ticket.delete({
      where: { id: input },
    });
  }),
});
