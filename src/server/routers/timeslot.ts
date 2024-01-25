import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

export const timeslotRouter = createTRPCRouter({
  getManyByEvent: publicProcedure
    .input(
      z.object({
        eventId: z.number().positive(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { eventId } = input;
      const timeslots = await ctx.db.timeslot.findMany({
        where: { eventId },
        orderBy: {
          startTime: "asc",
        },
      });
      return timeslots;
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.number().positive(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const timeslot = await ctx.db.timeslot.findUnique({ where: { id } });
      if (!timeslot) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No timeslot with id '${id}'`,
        });
      }
      return timeslot;
    }),

  getTotalSlotsById: publicProcedure
    .input(
      z.object({
        id: z.number().positive(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const timeslot = await ctx.db.timeslot.findUnique({
        where: { id },
        select: { remainingSlots: true, _count: { select: { tickets: true } } },
      });
      if (!timeslot) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No timeslot with id '${id}'`,
        });
      }
      return timeslot.remainingSlots + timeslot._count.tickets;
    }),
});
