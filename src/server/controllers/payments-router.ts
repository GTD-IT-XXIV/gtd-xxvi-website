import { env } from "@/env";
import Stripe from "stripe";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/config";

import { calculateOrderAmount } from "../utils";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);
export const paymentsRouter = createTRPCRouter({
  createPaymentIntent: publicProcedure
    .input(
      z.array(
        z.object({
          quantity: z.number(),
          bundle_id: z.number(),
        }),
      ),
    )
    .mutation(async (opts) => {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: await calculateOrderAmount(opts.input),
        currency: "sgd",
        payment_method_types: ["paynow"],
      });

      return {
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
      };
    }),
});
