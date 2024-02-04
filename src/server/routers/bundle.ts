import { type Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

import { nameKeySchema } from "./schemas";

export const bundleRouter = createTRPCRouter({
  getManyByEvent: publicProcedure
    .input(
      z.object({
        event: nameKeySchema,
        open: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { event, open } = input;
      const where: Prisma.BundleFindManyArgs["where"] = {
        eventName: event,
        ...(open === true && {
          open: { lte: new Date() },
          close: { gt: new Date() },
        }),
      };
      const bundles = await ctx.db.bundle.findMany({ where });
      return bundles;
    }),

  getByNameAndEvent: publicProcedure
    .input(
      z.object({
        name: nameKeySchema,
        event: nameKeySchema,
      }),
    )
    .query(async ({ ctx, input }) => {
      const { name, event } = input;
      const bundle = await ctx.db.bundle.findUnique({
        where: {
          name_eventName: {
            name,
            eventName: event,
          },
        },
      });
      if (!bundle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No bundle with name '${name}' from event with name '${event}'`,
        });
      }
      return bundle;
    }),

  getMinQuantityByEvent: publicProcedure
    .input(z.object({ event: nameKeySchema }))
    .query(async ({ ctx, input }) => {
      const { event } = input;
      const bundles = await ctx.db.bundle.findMany({
        where: { eventName: event },
        select: { quantity: true },
      });
      return Math.min(...bundles.map((bundle) => bundle.quantity));
    }),
});
