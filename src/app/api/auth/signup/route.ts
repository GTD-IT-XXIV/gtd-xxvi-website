import { Role } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { LuciaError } from "lucia";
import * as context from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";

import { auth } from "@/server/auth";

import { signupSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const formInput = {
    username: formData.get("username"),
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
  };
  try {
    const input = signupSchema.parse(formInput);
    const { username, email, name, password } = input;
    console.log({ input });
    const user = await auth.createUser({
      key: {
        providerId: "username",
        providerUserId: username.toLowerCase(),
        password,
      },
      attributes: { username, email, name, role: Role.USER },
    });
    const session = await auth.createSession({
      userId: user.userId,
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
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          error: "Username or email already taken",
        },
        { status: 400 },
      );
    }
    if (error instanceof LuciaError) {
      return NextResponse.json(
        {
          error: `"Authentication error`,
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}
