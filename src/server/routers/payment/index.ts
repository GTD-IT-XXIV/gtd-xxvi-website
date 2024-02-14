import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { stripe } from "@/lib/stripe";
import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

import { handleEventPayment, handleMerchPayment } from "./handlers";

export const paymentRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        type: z.enum(["event", "merch"]).default("event"),
        bookingIds: z.number().positive().array(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { bookingIds, type } = input;

      if (bookingIds.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No bookings to checkout for",
        });
      }

      switch (type) {
        case "event": {
          return await handleEventPayment({ ctx, bookingIds });
        }
        case "merch": {
          return await handleMerchPayment({ ctx, bookingIds });
        }
      }
    }),

  retrieveCheckoutSession: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const session = await stripe.checkout.sessions.retrieve(input.sessionId);

      return {
        status: session.status,
        customerEmail: session.customer_details?.email,
        paymentIntentId: session.payment_intent,
        clientSecret: session.client_secret,
      };
    }),

  // cancelCheckoutSession: publicProcedure
  //   .input(z.object({ sessionId: z.string() }))
  //   .mutation(async ({ ctx, input }) => {
  //     const { sessionId } = input;
  //     const bookings = await ctx.db.booking.findMany({
  //       where: { sessionId },
  //       include: { bundle: true },
  //     });
  //
  //     await ctx.db.$transaction(async (tx) => {
  //       for (const booking of bookings) {
  //         const partySize = booking.names.length * booking.bundle.quantity;
  //
  //         await tx.bundle.update({
  //           where: {
  //             name_eventName: {
  //               name: booking.bundleName,
  //               eventName: booking.eventName,
  //             },
  //           },
  //           data: {
  //             remainingAmount: { increment: booking.names.length },
  //           },
  //         });
  //
  //         await tx.timeslot.update({
  //           where: {
  //             startTime_endTime_eventName: {
  //               startTime: booking.startTime,
  //               endTime: booking.endTime,
  //               eventName: booking.eventName,
  //             },
  //           },
  //           data: { remainingSlots: { increment: Number(partySize) } },
  //         });
  //       }
  //       await tx.booking.deleteMany({ where: { sessionId } });
  //     });
  //   }),
});
