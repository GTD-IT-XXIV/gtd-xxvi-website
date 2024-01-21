import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { dashboardProcedure } from "@/server/procedures/dashboard-procedure";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

import { handleCreate, handleUpdate } from "./handlers";
import { bookingSchema } from "./schemas";

export const bookingRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().positive().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const bookings = await ctx.db.booking.findMany({
        where: {},
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { created: "desc" },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (bookings.length > limit) {
        const nextBooking = bookings.pop();
        nextCursor = nextBooking?.id ?? undefined;
      }
      return { bookings, nextCursor };
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.number().positive(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const booking = await ctx.db.booking.findUnique({ where: { id } });
      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No booking with id '${id}'`,
        });
      }
      return booking;
    }),

  getManyByEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      const { email } = input;
      const bookings = await ctx.db.booking.findMany({ where: { email } });
      return bookings;
    }),

  getManyByEmailAndEvents: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        eventIds: z.number().positive().array(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { email, eventIds } = input;
      const bookings = await ctx.db.booking.findMany({
        where: { email, eventId: { in: eventIds } },
      });
      return bookings;
    }),

  create: publicProcedure
    .input(bookingSchema)
    .mutation(async ({ ctx, input }) => {
      return await handleCreate({ ctx, input });
    }),

  updateById: dashboardProcedure
    .input(
      z.object({
        id: z.number().positive(),
        name: z.string().optional(),
        telegramHandle: z.string().optional(),
        phoneNumber: z.string().optional(),
        quantity: z.number().nonnegative().optional(),
        bundleId: z.number().positive().optional(),
        timeslotId: z.number().positive().optional(),
        sessionId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await handleUpdate({ ctx, input });
    }),

  updateByEmailAndEvent: dashboardProcedure
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
        sessionId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await handleUpdate({ ctx, input });
    }),

  deleteById: dashboardProcedure
    .input(z.number().positive())
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.booking.findUnique({
        where: { id: input },
        include: { bundle: true },
      });

      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking not found",
        });
      }

      const partySize = booking.quantity * booking.bundle.quantity;
      // free up bundles
      await ctx.db.bundle.update({
        where: { id: booking.bundleId },
        data: { remainingAmount: { increment: booking.quantity } },
      });
      // free up timeslots
      await ctx.db.timeslot.update({
        where: { id: booking.timeslotId },
        data: { remainingSlots: { increment: partySize } },
      });

      return await ctx.db.booking.delete({ where: { id: input } });
    }),

  deleteByEmailAndEvent: dashboardProcedure
    .input(
      z.object({
        email: z.string().email(),
        eventId: z.number().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, eventId } = input;
      const booking = await ctx.db.booking.findUnique({
        where: { email_eventId: { email, eventId } },
        include: { bundle: true },
      });

      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking not found",
        });
      }

      const partySize = booking.quantity * booking.bundle.quantity;
      // free up bundles
      await ctx.db.bundle.update({
        where: { id: booking.bundleId },
        data: { remainingAmount: { increment: booking.quantity } },
      });
      // free up timeslots
      await ctx.db.timeslot.update({
        where: { id: booking.timeslotId },
        data: { remainingSlots: { increment: partySize } },
      });

      return await ctx.db.booking.delete({
        where: { email_eventId: { email, eventId } },
      });
    }),

  deleteManyByEmail: dashboardProcedure
    .input(z.string().email())
    .mutation(async ({ ctx, input }) => {
      const bookings = await ctx.db.booking.findMany({
        where: { email: input },
        include: { bundle: true },
      });

      if (bookings.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Bookings not found",
        });
      }

      for (const booking of bookings) {
        const partySize = booking.quantity * booking.bundle.quantity;
        // free up bundles
        await ctx.db.bundle.update({
          where: { id: booking.bundleId },
          data: { remainingAmount: { increment: booking.quantity } },
        });
        // free up timeslots
        await ctx.db.timeslot.update({
          where: { id: booking.timeslotId },
          data: { remainingSlots: { increment: partySize } },
        });
      }

      return await ctx.db.booking.deleteMany({ where: { email: input } });
    }),
});
