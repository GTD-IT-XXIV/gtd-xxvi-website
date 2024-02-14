import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

export const merchBundleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.merchBundle.findMany({
      include: {
        bundleItems: {
          include: { merch: true },
        },
      },
    });
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.number().positive(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const merchBundle = await ctx.db.merchBundle.findUnique({
        where: { id },
        include: {
          bundleItems: {
            include: { merch: true },
          },
        },
      });
      return merchBundle;
    }),
});
