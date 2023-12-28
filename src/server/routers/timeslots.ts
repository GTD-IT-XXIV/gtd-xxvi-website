import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/config";

export const timeslotsRouter = createTRPCRouter({
  getAllForEvent: publicProcedure
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
