import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
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

  getByEmailAndEvent: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        eventId: z.number().positive(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.booking.findUnique({
        where: { email_eventId: { ...input } },
      });
    }),

  getManyByEmail: publicProcedure
    .input(z.string().email())
    .query(({ ctx, input }) => {
      return ctx.prisma.booking.findMany({ where: { email: input } });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        telegramHandle: z.string(),
        phoneNumber: z.string(),
        quantity: z.number().nonnegative(),
        eventId: z.number().positive(),
        bundleId: z.number().positive(),
        timeslotId: z.number().positive(),
        paymentIntentId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { quantity, bundleId, timeslotId } = input;
      const bundle = await ctx.prisma.bundle.findUnique({
        where: { id: bundleId },
      });
      const timeslot = await ctx.prisma.timeslot.findUnique({
        where: { id: timeslotId },
      });

      if (!bundle) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Bundle not found",
        });
      }
      if (!timeslot) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Timeslot not found",
        });
      }

      const partySize = quantity * bundle.quantity;

      return await ctx.prisma.$transaction(
        async (tx) => {
          if (bundle.remainingAmount !== null) {
            const bundle = await tx.bundle.update({
              where: { id: bundleId },
              data: { remainingAmount: { decrement: quantity } },
            });

            if (bundle.remainingAmount! < 0) {
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Insufficient number of bundles",
              });
            }
          }

          const timeslot = await tx.timeslot.update({
            where: { id: timeslotId },
            data: { remainingSlots: { decrement: partySize } },
          });

          if (timeslot.remainingSlots < 0) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Insufficient number of timeslots",
            });
          }
          await tx.booking.create({ data: input });
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
    }),

  updateById: publicProcedure
    .input(
      z.object({
        id: z.number().positive(),
        email: z.string().email().optional(),
        eventId: z.number().positive().optional(),
        name: z.string().optional(),
        telegramHandle: z.string().optional(),
        phoneNumber: z.string().optional(),
        quantity: z.number().nonnegative().optional(),
        bundleId: z.number().positive().optional(),
        timeslotId: z.number().positive().optional(),
        paymentIntentId: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.booking.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),

  updateByEmailAndEvent: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        eventId: z.number().positive(),
        name: z.string().optional(),
        telegramHandle: z.string().optional(),
        phoneNumber: z.string().optional(),
        quantity: z.number().nonnegative().optional(),
        bundleId: z.number().positive().optional(),
        timeslotId: z.number().positive().optional(),
        paymentIntentId: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.booking.update({
        where: {
          email_eventId: { email: input.email, eventId: input.eventId },
        },
        data: { ...input },
      });
    }),
});
