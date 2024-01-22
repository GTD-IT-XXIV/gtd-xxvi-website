import { env } from "@/env";
import { prisma } from "@lucia-auth/adapter-prisma";
import { lucia } from "lucia";
import { nextjs_future as nextjs } from "lucia/middleware";
import * as context from "next/headers";
import { cache } from "react";

import { db } from "@/server/db";

export const auth = lucia({
  env: env.NODE_ENV === "production" ? "PROD" : "DEV",
  middleware: nextjs(),
  sessionCookie: { expires: false },
  adapter: prisma(db),
  getUserAttributes: (dbUser) => {
    return {
      username: dbUser.username,
      email: dbUser.email,
      name: dbUser.name,
      role: dbUser.role,
    };
  },
});

export type Auth = typeof auth;

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});
