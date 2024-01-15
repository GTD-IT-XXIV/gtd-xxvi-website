import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

import { SALT_ROUNDS } from "@/lib/constants";
import { signupSchema } from "@/lib/schemas";
import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(signupSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, username, email, password } = input;
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      try {
        const user = await ctx.db.user.create({
          data: {
            name,
            username,
            email,
            password: hashedPassword,
          },
        });
        if (!user?.name || !user.username || !user.email) {
          throw new Error("NullUserReturned");
        }
        return {
          id: user.id,
          name: user.name,
          username: user.name,
          email: user.email,
        };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Email already taken",
            });
          }
          if (error instanceof Error) {
            if (error.message === "NullNameOrEmail") {
              throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
            }
          }
        }
      }
    }),
});
