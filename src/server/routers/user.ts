import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { SALT_ROUNDS } from "@/lib/constants";
import { createTRPCRouter, publicProcedure } from "@/lib/trpc/config";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8).max(255),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      try {
        const user = await ctx.db.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
        if (!user.name || !user.email) {
          throw new Error("NullNameOrEmail");
        }
        return { id: user.id, name: user.name, email: user.email };
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
