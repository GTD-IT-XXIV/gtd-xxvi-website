import { TRPCError } from "@trpc/server";
import type Stripe from "stripe";
import { z } from "zod";

import { stripe } from "@/lib/stripe";
import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";
import { type OrderMetadata } from "@/lib/types/order-metadata";

export const paymentsRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure
    .input(z.object({ bookingIds: z.number().positive().array() }))
    .mutation(async ({ input, ctx }) => {
      const { bookingIds } = input;
      const bookings = await ctx.prisma.booking.findMany({
        where: { id: { in: bookingIds } },
        include: { event: true, bundle: true, timeslot: true },
      });

      if (bookings.length !== bookingIds.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Not all bookings were not found",
        });
      }

      const expiresAt = Date.now() + 30 * 60 * 1000; // timeout the payment after 30 minutes since it is the minimum time to timeout the transaction if there is no payment
      const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: bookings.map((booking) => ({
          price_data: {
            product_data: {
              name: `${booking.event.name} ${booking.bundle.name}`,
            },
            currency: "sgd",
            unit_amount: booking.quantity * Number(booking.bundle.price) * 100, // Stripe charges in cents
          },
          quantity: Number(booking.quantity),
        })),
        mode: "payment",
        payment_method_types: ["paynow"],
        metadata: {
          bookingIds: JSON.stringify(bookingIds),
        } as OrderMetadata,
        return_url: `${ctx.headers.get(
          "origin",
        )}/ticket?session_id={CHECKOUT_SESSION_ID}`,
        expires_at: Math.floor(expiresAt / 1000), // since stripe time in seconds
      });

      await ctx.prisma.booking.updateMany({
        where: { id: { in: bookingIds } },
        data: { paymentIntentId: String(session.payment_intent) },
      });

      return { clientSecret: session.client_secret };
    }),

  retrieveCheckoutSession: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.retrieve(input.sessionId);

      return {
        status: session.status,
        customerEmail: session?.customer_details?.email,
      };
    }),
});
