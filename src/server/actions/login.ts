"use server";

import { LuciaError } from "lucia";
import * as context from "next/headers";
import { ZodError, type z } from "zod";
import { fromZodError } from "zod-validation-error";

import { auth } from "@/server/auth";

import { loginSchema } from "@/lib/schemas";

export async function login(
  values: z.infer<typeof loginSchema>,
): Promise<{ error: string } | undefined> {
  try {
    const input = loginSchema.parse(values);
    const { username, password } = input;
    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest("POST", context);
    authRequest.setSession(session);
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return {
        error: `Invalid inputs: ${validationError.message}`,
      };
    }
    if (
      error instanceof LuciaError &&
      (error.message === "AUTH_INVALID_KEY_ID" ||
        error.message === "AUTH_INVALID_PASSWORD")
    ) {
      return {
        error: "Incorrect username or password",
      };
    }
    return {
      error: "An unknown error occurred",
    };
  }
}
