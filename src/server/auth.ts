import { type JWT } from "@auth/core/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { type Session } from "next-auth/types";

import { db } from "@/server/db";

import authConfig from "@/lib/nextauth/config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token }) => {
      const user = await db.user.findUnique({ where: { id: token.sub } });
      if (!user) {
        return token;
      }
      return {
        ...token,
        role: user.role,
      } satisfies JWT;
    },
    session: async ({ token, session }) => {
      const user = await db.user.findUnique({ where: { id: token.sub } });
      if (!user) {
        return session;
      }
      return {
        ...session,
        user: {
          ...session.user,
          ...(token.sub && { id: token.sub }),
          role: user.role,
        },
      } satisfies Session;
    },
  },
  ...authConfig,
});
