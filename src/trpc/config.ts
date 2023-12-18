import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";

import { db } from "@/server/db";

export const createTRPCContext = async function (opts: { headers: Headers }) {
  return { db, ...opts };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
