import { LuciaError } from "lucia";
import * as context from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import { auth } from "@/server/auth";

import { loginSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const formInput = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  try {
    const input = loginSchema.parse(formInput);
    const { username, password } = input;
    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, context);
    authRequest.setSession(session);
    return new Response(null, { status: 302 });
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return NextResponse.json(
        {
          error: `Invalid inputs: ${validationError.message}`,
        },
        { status: 400 },
      );
    }
    if (
      error instanceof LuciaError &&
      (error.message === "AUTH_INVALID_KEY_ID" ||
        error.message === "AUTH_INVALID_PASSWORD")
    ) {
      return NextResponse.json(
        { error: "Incorrect username or password" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 },
    );
  }
}
