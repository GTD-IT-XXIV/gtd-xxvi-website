import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";
import { z } from "zod";

export const orderRouter = createTRPCRouter({
  checkId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const order = await ctx.db.order.findUnique({ where: { id } });
      return !!order;
    }),
});
