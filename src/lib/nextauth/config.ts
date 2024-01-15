import bcrypt from "bcryptjs";
import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import { db } from "@/server/db";

import { loginSchema } from "@/lib/schemas";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { username, password } = loginSchema.parse(credentials);
          const user = await db.user.findUnique({ where: { username } });
          if (!user?.password) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            } satisfies User;
          }
        } catch (error) {
          if (error instanceof ZodError) {
            const validationError = fromZodError(error);
            throw validationError;
          }
          throw error;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
