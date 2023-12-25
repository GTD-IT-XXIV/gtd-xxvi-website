import { stripe } from "@/lib/stripe";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/trpc/config";

export const paymentsRouter = createTRPCRouter({
  createPaymentIntent: publicProcedure
    .input(
      z.object({
        quantity: z.number(),
        bundle_id: z.number(),
        timeslot_id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
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

        // if reservation successful
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
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
