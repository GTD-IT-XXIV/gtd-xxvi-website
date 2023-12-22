import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/config";

export const bundlesRouter = createTRPCRouter({
  getAllForEvent: publicProcedure
    .input(z.number().positive())
    .query(({ ctx, input }) => {
      return ctx.prisma.bundle.findMany({
        where: { eventId: input },
      });
    }),
  getById: publicProcedure
    .input(z.number().positive())
    .query(({ ctx, input }) => {
      return ctx.prisma.bundle.findUnique({ where: { id: input } });
    }),
  getByIdAndName: publicProcedure
    .input(
      z.object({
        id: z.number().positive(),
        name: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.bundle.findUnique({
        where: { id: input.id, name: input.name },
      });
    }),
});
