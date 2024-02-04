import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

import { nameKeySchema } from "./schemas";

export const timeslotRouter = createTRPCRouter({
  getByTimeAndEvent: publicProcedure
    .input(
      z.object({
        startTime: z.date(),
        endTime: z.date(),
        event: nameKeySchema,
      }),
    )
    .query(async ({ ctx, input }) => {
      const { event, startTime, endTime } = input;
      const timeslot = await ctx.db.timeslot.findUnique({
        where: {
          startTime_endTime_eventName: {
            eventName: event,
            startTime,
            endTime,
          },
        },
      });
      if (!timeslot) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No timeslot start at '${dayjs(
            startTime,
          ).format()}' and end at '${dayjs(
            endTime,
          ).format()}' from event with name '${event}'`,
        });
      }
      return timeslot;
    }),
  getManyByEvent: publicProcedure
    .input(z.object({ event: nameKeySchema }))
    .query(async ({ ctx, input }) => {
      const { event } = input;
      const timeslots = await ctx.db.timeslot.findMany({
        where: { eventName: event },
        orderBy: {
          startTime: "asc",
        },
      });
      return timeslots;
    }),

  getTotalSlotsByTimeAndEvent: publicProcedure
    .input(
      z.object({
        startTime: z.date(),
        endTime: z.date(),
        event: nameKeySchema,
      }),
    )
    .query(async ({ ctx, input }) => {
      const { startTime, endTime, event } = input;
      const timeslot = await ctx.db.timeslot.findUnique({
        where: {
          startTime_endTime_eventName: {
            startTime,
            endTime,
            eventName: event,
          },
        },
        select: {
          remainingSlots: true,
          orders: { select: { tickets: { select: { id: true } } } },
        },
      });
      if (!timeslot) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No timeslot start at '${dayjs(
            startTime,
          ).format()}' and end at '${dayjs(
            endTime,
          ).format()}' from event with name '${event}'`,
        });
      }
      const purchasedSlots = timeslot.orders.reduce(
        (accum, order) => accum + order.tickets.length,
        0,
      );
      return timeslot.remainingSlots + purchasedSlots;
    }),
});
