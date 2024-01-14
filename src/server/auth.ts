import { env } from "@/env";
import { prisma } from "@lucia-auth/adapter-prisma";
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";

import { db } from "./db";

export const auth = lucia({
  env: env.NODE_ENV === "production" ? "PROD" : "DEV",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (dbUser) => {
    return {
      name: dbUser.name,
      email: dbUser.email,
    };
  },
  adapter: prisma(db, {
    user: "user",
    key: "key",
    session: "session",
  }),
});

export type Auth = typeof auth;
