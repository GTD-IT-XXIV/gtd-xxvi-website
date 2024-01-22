import { TRPCError } from "@trpc/server";

import { getPageSession } from "@/server/auth";

import { publicProcedure } from "@/lib/trpc/config";

export const dashboardProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const session = await getPageSession();
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session,
    },
  });
});
