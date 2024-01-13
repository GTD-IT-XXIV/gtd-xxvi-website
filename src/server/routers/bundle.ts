import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

export const bundleRouter = createTRPCRouter({
  getManyByEvent: publicProcedure
    .input(
      z.object({
        eventId: z.number().positive(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { eventId } = input;
      const bundles = await ctx.db.bundle.findMany({ where: { eventId } });
      return bundles;
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.number().positive(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const bundle = await ctx.db.bundle.findUnique({ where: { id } });
      if (!bundle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No bundle with id '${id}'`,
        });
      }
      return bundle;
    }),

  getByEventAndName: publicProcedure
    .input(
      z.object({
        eventId: z.number().positive(),
        name: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { eventId, name } = input;
      const bundle = await ctx.db.bundle.findUnique({
        where: { name_eventId: { name, eventId } },
      });
      if (!bundle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No bundle with name '${name} from event with id '${eventId}'`,
        });
      }
      return bundle;
    }),

  getMinQuantityByEvent: publicProcedure
    .input(
      z.object({
        eventId: z.number().positive(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { eventId } = input;
      const bundles = await ctx.db.bundle.findMany({
        where: { eventId },
        select: { quantity: true },
      });
      return Math.min(...bundles.map((bundle) => bundle.quantity));
    }),
});
