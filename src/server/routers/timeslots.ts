import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

export const timeslotsRouter = createTRPCRouter({
  getManyByEvent: publicProcedure
    .input(z.number().positive())
    .query(({ ctx, input }) => {
      return ctx.prisma.timeslot.findMany({
        where: { eventId: input },
      });
    }),

  getById: publicProcedure
    .input(z.number().positive())
    .query(({ ctx, input }) => {
      return ctx.prisma.timeslot.findUnique({ where: { id: input } });
    }),
});
