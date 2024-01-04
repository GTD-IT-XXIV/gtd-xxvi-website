import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/config";

export const bookingsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.booking.findMany();
  }),

  getById: publicProcedure
    .input(z.number().positive())
    .query(({ ctx, input }) => {
      return ctx.prisma.booking.findUnique({ where: { id: input } });
    }),

  getByEmail: publicProcedure
    .input(z.string().email())
    .query(({ ctx, input }) => {
      return ctx.prisma.booking.findUnique({ where: { email: input } });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        telegramHandle: z.string(),
        phoneNumber: z.string(),
        paymentIntentId: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.booking.create({ data: input });
    }),

  updateById: publicProcedure
    .input(
      z.object({
        id: z.number().positive(),
        name: z.string().optional(),
        telegramHandle: z.string().optional(),
        phoneNumber: z.string().optional(),
        paymentIntentId: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.booking.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),

  updateByEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().optional(),
        telegramHandle: z.string().optional(),
        phoneNumber: z.string().optional(),
        paymentIntentId: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.booking.update({
        where: { email: input.email },
        data: { ...input },
      });
    }),
});
