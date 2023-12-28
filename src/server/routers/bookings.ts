import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/config";

import { BookingSchema } from "../../../prisma/generated/zod";

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
    .input(BookingSchema.omit({ id: true, valid: true, created: true }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.booking.create({ data: input });
    }),
});
