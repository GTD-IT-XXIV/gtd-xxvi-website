import { Prisma, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

export const bookingSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  telegramHandle: z.string(),
  phoneNumber: z.string(),
  quantity: z.number().nonnegative(),
  eventId: z.number().positive(),
  bundleId: z.number().positive(),
  timeslotId: z.number().positive(),
  paymentIntentId: z.string().optional(),
});

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

  getManyByEmailAndEvents: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        eventIds: z.number().positive().array(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.booking.findMany({
        where: { email: input.email, eventId: { in: input.eventIds } },
      });
    }),

  create: publicProcedure
    .input(bookingSchema)
    .mutation(async ({ ctx, input }) => {
      if (
        !(await checkEventConsistency(
          ctx.prisma,
          bookingEventConsistencySchema.parse(input),
        ))
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Event ids of booking, bundle and timeslot do not match",
        });
      }

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
            console.log({
              bundleId: bundle.id,
              decrement: quantity,
              remainingAmount: bundle.remainingAmount,
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
          return await ctx.prisma.booking.create({ data: input });
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
        name: z.string().optional(),
        telegramHandle: z.string().optional(),
        phoneNumber: z.string().optional(),
        quantity: z.number().nonnegative().optional(),
        bundleId: z.number().positive().optional(),
        timeslotId: z.number().positive().optional(),
        paymentIntentId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, bundleId, timeslotId, quantity } = input;

      if (!quantity && !bundleId && !timeslotId) {
        return await ctx.prisma.booking.update({
          where: { id },
          data: { ...input },
        });
      }

      const booking = await ctx.prisma.booking.findUnique({
        where: { id },
      });

      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking not found",
        });
      }

      if (
        !(await checkEventConsistency(ctx.prisma, {
          eventId: booking.eventId,
          bundleId: bundleId ?? booking.bundleId,
          timeslotId: timeslotId ?? booking.timeslotId,
        }))
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Event ids of booking, bundle and timeslot do not match",
        });
      }

      const oldBundle = await ctx.prisma.bundle.findUnique({
        where: { id: booking.bundleId },
      });
      const newTimeslot = await ctx.prisma.timeslot.findUnique({
        where: { id: booking.timeslotId },
      });

      if (!oldBundle) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Existing booking bundle not found",
        });
      }
      if (!newTimeslot) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Existing booking timeslot not found",
        });
      }
      if (oldBundle.eventId !== booking.eventId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Existing booking",
        });
      }

      const oldPartySize = booking.quantity * oldBundle.quantity;
      const newPartySize = quantity ?? booking.quantity * oldBundle.quantity;

      return await ctx.prisma.$transaction(async (tx) => {
        if (bundleId && bundleId !== booking.bundleId) {
          if (oldBundle.remainingAmount != null) {
            // free up old bundle slots
            await tx.bundle.update({
              where: { id: booking.bundleId },
              data: { remainingAmount: { increment: booking.quantity } },
            });
          }

          console.log({
            oldBundleId: oldBundle.id,
            decrement: quantity,
            remainingAmount: oldBundle.remainingAmount,
          });
          let newBundle = await tx.bundle.findUnique({
            where: { id: bundleId },
          });
          if (newBundle?.remainingAmount != null) {
            // fill up new bundle slots
            newBundle = await tx.bundle.update({
              where: { id: bundleId },
              data: { remainingAmount: { decrement: booking.quantity } },
            });
            console.log({
              newBundleId: newBundle.id,
              decrement: quantity,
              remainingAmount: newBundle.remainingAmount,
            });

            if (newBundle.remainingAmount! < 0) {
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Insufficient number of bundles",
              });
            }
          }
        }
        if (timeslotId && timeslotId !== booking.timeslotId) {
          // free up old timeslots
          await tx.timeslot.update({
            where: { id: booking.timeslotId },
            data: { remainingSlots: { increment: oldPartySize } },
          });

          // fill up new timeslots
          const newTimeslot = await tx.timeslot.update({
            where: { id: timeslotId },
            data: { remainingSlots: { decrement: newPartySize } },
          });

          if (newTimeslot.remainingSlots < 0) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Insufficient number of timeslots",
            });
          }
        }
        return await tx.booking.update({
          where: { id },
          data: { ...input },
        });
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
    .mutation(async ({ ctx, input }) => {
      const { email, eventId, bundleId, timeslotId, quantity } = input;

      if (!quantity && !bundleId && !timeslotId) {
        return await ctx.prisma.booking.update({
          where: { email_eventId: { email, eventId } },
          data: { ...input },
        });
      }

      const booking = await ctx.prisma.booking.findUnique({
        where: { email_eventId: { email, eventId } },
      });

      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking not found",
        });
      }

      if (
        !(await checkEventConsistency(ctx.prisma, {
          eventId: booking.eventId,
          bundleId: bundleId ?? booking.bundleId,
          timeslotId: timeslotId ?? booking.timeslotId,
        }))
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Event ids of booking, bundle and timeslot do not match",
        });
      }

      const oldBundle = await ctx.prisma.bundle.findUnique({
        where: { id: booking.bundleId },
      });
      const newTimeslot = await ctx.prisma.timeslot.findUnique({
        where: { id: booking.timeslotId },
      });

      if (!oldBundle) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Existing booking bundle not found",
        });
      }
      if (!newTimeslot) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Existing booking timeslot not found",
        });
      }
      if (oldBundle.eventId !== booking.eventId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Existing booking",
        });
      }

      const oldPartySize = booking.quantity * oldBundle.quantity;
      const newPartySize = quantity ?? booking.quantity * oldBundle.quantity;

      return await ctx.prisma.$transaction(async (tx) => {
        if (bundleId && bundleId !== booking.bundleId) {
          if (oldBundle.remainingAmount != null) {
            // free up old bundle slots
            await tx.bundle.update({
              where: { id: booking.bundleId },
              data: { remainingAmount: { increment: booking.quantity } },
            });
          }

          let newBundle = await tx.bundle.findUnique({
            where: { id: bundleId },
          });
          if (newBundle?.remainingAmount != null) {
            // fill up new bundle slots
            newBundle = await tx.bundle.update({
              where: { id: bundleId },
              data: { remainingAmount: { decrement: booking.quantity } },
            });

            if (newBundle.remainingAmount! < 0) {
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Insufficient number of bundles",
              });
            }
          }
        }
        if (timeslotId && timeslotId !== booking.timeslotId) {
          // free up old timeslots
          await tx.timeslot.update({
            where: { id: booking.timeslotId },
            data: { remainingSlots: { increment: oldPartySize } },
          });

          // fill up new timeslots
          const newTimeslot = await tx.timeslot.update({
            where: { id: timeslotId },
            data: { remainingSlots: { decrement: newPartySize } },
          });

          if (newTimeslot.remainingSlots < 0) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Insufficient number of timeslots",
            });
          }
        }
        return await tx.booking.update({
          where: { email_eventId: { email, eventId } },
          data: { ...input },
        });
      });
    }),

  deleteById: publicProcedure
    .input(z.number().positive())
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.prisma.booking.findUnique({
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
      await ctx.prisma.bundle.update({
        where: { id: booking.bundleId },
        data: { remainingAmount: { increment: booking.quantity } },
      });
      // free up timeslots
      await ctx.prisma.timeslot.update({
        where: { id: booking.timeslotId },
        data: { remainingSlots: { increment: partySize } },
      });

      return await ctx.prisma.booking.delete({ where: { id: input } });
    }),

  deleteByEmailAndEvent: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        eventId: z.number().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, eventId } = input;
      const booking = await ctx.prisma.booking.findUnique({
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
      await ctx.prisma.bundle.update({
        where: { id: booking.bundleId },
        data: { remainingAmount: { increment: booking.quantity } },
      });
      // free up timeslots
      await ctx.prisma.timeslot.update({
        where: { id: booking.timeslotId },
        data: { remainingSlots: { increment: partySize } },
      });

      return await ctx.prisma.booking.delete({
        where: { email_eventId: { email, eventId } },
      });
    }),

  deleteManyByEmail: publicProcedure
    .input(z.string().email())
    .mutation(async ({ ctx, input }) => {
      const bookings = await ctx.prisma.booking.findMany({
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
        await ctx.prisma.bundle.update({
          where: { id: booking.bundleId },
          data: { remainingAmount: { increment: booking.quantity } },
        });
        // free up timeslots
        await ctx.prisma.timeslot.update({
          where: { id: booking.timeslotId },
          data: { remainingSlots: { increment: partySize } },
        });
      }

      return await ctx.prisma.booking.deleteMany({ where: { email: input } });
    }),
});

const bookingEventConsistencySchema = bookingSchema.pick({
  eventId: true,
  bundleId: true,
  timeslotId: true,
});

export async function checkEventConsistency(
  prisma: PrismaClient,
  booking: z.infer<typeof bookingEventConsistencySchema>,
) {
  const id = booking.eventId; // source of truth
  const bundle = await prisma.bundle.findUnique({
    where: { id: booking.bundleId },
    select: { eventId: true },
  });
  const timeslot = await prisma.timeslot.findUnique({
    where: { id: booking.timeslotId },
    select: { eventId: true },
  });
  return id === bundle?.eventId && id === timeslot?.eventId;
}
