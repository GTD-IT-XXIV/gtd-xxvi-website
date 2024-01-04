import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/config";

export const bundlesRouter = createTRPCRouter({
  getManyByEvent: publicProcedure
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

  getByEventAndName: publicProcedure
    .input(
      z.object({
        eventId: z.number().positive(),
        name: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.bundle.findUnique({
        where: {
          name_eventId: {
            name: input.name,
            eventId: input.eventId,
          },
        },
      });
    }),
});
