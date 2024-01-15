"use server";

import { AuthError } from "next-auth";
import { ZodError, type z } from "zod";
import { fromZodError } from "zod-validation-error";

import { signIn } from "@/server/auth";

import { loginSchema } from "@/lib/schemas";

export default async function login(values: z.infer<typeof loginSchema>) {
  try {
    const { username, password } = loginSchema.parse(values);
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return { error: validationError.message };
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Wrong username or password" };
        }
        default: {
          return { error: "An authentication error occurred" };
        }
      }
    }
    throw error;
  }
}
