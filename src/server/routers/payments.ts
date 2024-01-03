import { stripe } from "@/lib/stripe";
import { type OrderMetadata } from "@/types/order-metadata";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import type Stripe from "stripe";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/config";

export const paymentsRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        quantity: z.number(),
        bundle_id: z.number(),
        timeslot_id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { quantity, bundle_id, timeslot_id } = input;
      const bundle = await ctx.prisma.bundle.findUnique({
        where: { id: bundle_id },
      });

      if (!bundle) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid bundle",
        });
      }

      const slots = quantity * bundle.quantity;
      const amount = quantity * Number(bundle.price) * 100; // as stripe charges in cents

      await ctx.prisma.$transaction(
        async (tx) => {
          const timeslot = await tx.timeslot.update({
            where: { id: timeslot_id, remainingSlots: { gte: slots } },
            data: { remainingSlots: { decrement: slots } },
          });

          if (!timeslot) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invalid timeslot",
            });
          }
          // will be rollbacked if timeslot.remainingslots < 0 or timeslots could not be found
          if (timeslot.remainingSlots < 0) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Insufficient number of slots",
            });
          }
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
      const expiresAt = Date.now() + 30 * 60 * 1000; // timeout the payment after 30 minutes since it is the minimum time to timeout the transaction if there is no payment
      // if reservation successful
      const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: [
          {
            // can provide price_id if we predefine price_id on stripe dashboard
            price_data: {
              product_data: {
                name: bundle.name,
              },
              currency: "sgd",
              unit_amount: amount,
            },
            quantity,
          },
        ],
        mode: "payment",
        payment_method_types: ["paynow"],
        metadata: { timeslot_id, quantity, bundle_id } as OrderMetadata,
        return_url: `${ctx.headers.get(
          "origin",
        )}/ticket?session_id={CHECKOUT_SESSION_ID}`,
        expires_at: Math.floor(expiresAt / 1000), // since stripe time in seconds
      });

      return { clientSecret: session.client_secret };
    }),
  retrieveCheckoutSession: publicProcedure
    .input(
      z.object({
        session_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.retrieve(input.session_id);

      return {
        status: session.status,
        customer_email: session?.customer_details?.email,
      };
    }),
});
