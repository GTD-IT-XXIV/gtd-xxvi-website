import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/config";

export const eventsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany();
  }),
  getById: publicProcedure
    .input(z.number().positive())
    .query(({ ctx, input }) => {
      return ctx.prisma.event.findUnique({ where: { id: input } });
    }),
  getByName: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.event.findUnique({ where: { name: input } });
  }),
});
