import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";

import { prisma } from "@/server/db";

import { transformer } from "./utils";

export const createTRPCContext = async function (opts: { headers: Headers }) {
  return { prisma, ...opts };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer,
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