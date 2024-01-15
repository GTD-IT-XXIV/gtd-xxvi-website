import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Role } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

import authConfig from "@/lib/nextauth/config";

import { db } from "./db";

declare module "next-auth" {
  interface Session {
    user: {
      role: Role;
    } & DefaultSession["user"];
  }
}

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
      if (!token.sub) {
        return token;
      }
      const user = await db.user.findUnique({ where: { id: token.sub } });
      if (!user) {
        return token;
      }
      token.role = user.role;
      return token;
    },
    session: async ({ token, session }) => {
      if (!token.sub || !session.user) {
        return session;
      }
      session.user.id = token.sub;
      if (!token.role) {
        return session;
      }
      session.user.role = token.role as Role;
      return session;
    },
  },
  ...authConfig,
});
