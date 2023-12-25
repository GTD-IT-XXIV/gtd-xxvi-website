import { stripe } from "@/lib/stripe";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/config";

import { calculateOrderAmount } from "../utils";

export const paymentsRouter = createTRPCRouter({
  createPaymentIntent: publicProcedure
    .input(
      z.object({
        quantity: z.number(),
        bundle_id: z.number(),
      }),
    )
    .mutation(async (opts) => {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: await calculateOrderAmount(opts.input),
          currency: "sgd",
          payment_method_types: ["paynow"],
        });

        return {
          clientSecret: paymentIntent.client_secret,
          amount: paymentIntent.amount,
        };
      } catch (error) {
        return {
          error,
        };
      }
    }),
});
