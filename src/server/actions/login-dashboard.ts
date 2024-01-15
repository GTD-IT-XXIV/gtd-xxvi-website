"use server";

import { AuthError } from "next-auth";
import { type z } from "zod";

import { signIn } from "@/server/auth";

import { loginSchema } from "@/lib/schemas";

export default async function loginDashboard(
  values: z.infer<typeof loginSchema>,
) {
  const { email, password } = loginSchema.parse(values);
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid credentials" };
        }
        default: {
          return { error: "An error occurred" };
        }
      }
    }
    throw error;
  }
}
