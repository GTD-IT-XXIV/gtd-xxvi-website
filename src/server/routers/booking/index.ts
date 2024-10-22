import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { dashboardProcedure } from "@/server/procedures/dashboard-procedure";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

import { nameKeySchema } from "../schemas";
import { handleCreate, handleCreateMany } from "./handlers";
import { bookingSchema } from "./schemas";

// import { checkEventConsistency } from "./utils";

export const bookingRouter = createTRPCRouter({
  getAll: dashboardProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
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

  getById: dashboardProcedure
    .input(z.object({ id: z.number().positive() }))
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

  getManyByEmail: dashboardProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      const { email } = input;
      const bookings = await ctx.db.booking.findMany({ where: { email } });
      return bookings;
    }),

  getManyByEmailAndEvents: dashboardProcedure
    .input(
      z.object({
        email: z.string().email(),
        events: nameKeySchema.array(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { email, events } = input;
      const bookings = await ctx.db.booking.findMany({
        where: { email, eventName: { in: events } },
      });
      return bookings;
    }),

  getAllEmails: dashboardProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const take = input.limit ?? 10;
      const skip = take * (input.cursor ?? 0);
      const bookings = await ctx.db.booking.findMany({
        select: {
          email: true,
        },
        take,
        skip,
        distinct: ["email"],
      });
      const emails = bookings.map((booking) => booking.email);
      return {
        emails,
        nextCursor: input.cursor ? input.cursor + 1 : undefined,
      };
    }),

  create: publicProcedure
    .input(bookingSchema)
    .mutation(async ({ ctx, input }) => {
      return await handleCreate({ ctx, input });
    }),

  createMany: publicProcedure
    .input(z.object({ bookings: bookingSchema.array() }))
    .mutation(async ({ ctx, input }) => {
      return await handleCreateMany({ ctx, input });
    }),

  getPriceByEmailAndEvents: dashboardProcedure
    .input(
      z.object({
        email: z.string().email(),
        events: nameKeySchema.array(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { email, events } = input;
      const bookings = await ctx.db.booking.findMany({
        where: { email, eventName: { in: events } },
        include: { bundle: true },
      });
      return bookings.reduce(
        (accum, booking) =>
          accum +
          new Prisma.Decimal(booking.bundle.price)
            .times(booking.names.length)
            .toNumber(),
        0,
      );
    }),
});
