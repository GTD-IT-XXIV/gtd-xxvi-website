import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";

import { auth } from "@/server/auth";
import { db } from "@/server/db";

import { transformer } from "./utils";

export const createTRPCContext = async function (opts: { headers: Headers }) {
  const session = await auth();
  return { db, session, ...opts };
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
