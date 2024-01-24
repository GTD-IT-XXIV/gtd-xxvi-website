import { TRPCError } from "@trpc/server";
import SuperJSON from "superjson";
import { z } from "zod";

import { stripe } from "@/lib/stripe";
import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";
import { type OrderMetadata } from "@/lib/types";

export const paymentRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure
    .input(z.object({ bookingIds: z.number().positive().array() }))
    .mutation(async ({ input, ctx }) => {
      const { bookingIds } = input;

      if (bookingIds.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No bookings to checkout for",
        });
      }

      const bookings = await ctx.db.booking.findMany({
        where: { id: { in: bookingIds } },
        include: { event: true, bundle: true, timeslot: true },
      });

      if (bookings.length !== bookingIds.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Not all bookings were not found",
        });
      }

      if (bookings.some((booking) => booking?.sessionId)) {
        const sessionId = bookings.find((booking) => booking?.sessionId)
          ?.sessionId;

        if (!bookings.every((booking) => booking?.sessionId === sessionId)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Not all bookings were not found",
          });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId!);
        return {
          clientSecret: session.client_secret,
        };
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
          bookingIds: SuperJSON.stringify(bookingIds),
        } as OrderMetadata,
        return_url: `${ctx.headers.get(
          "origin",
        )}/ticket?session_id={CHECKOUT_SESSION_ID}`, // TODO: update
        expires_at: Math.floor(expiresAt / 1000), // since stripe time in seconds
      });

      await ctx.db.booking.updateMany({
        where: { id: { in: bookingIds } },
        data: { sessionId: String(session.id) },
      });

      return {
        clientSecret: session.client_secret,
      };
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
        clientSecret: session.client_secret,
      };
    }),
});
