import "server-only";

import { env } from "@/env";
import { ZodError, type z } from "zod";
import { fromZodError } from "zod-validation-error";

import { BREVO_API_URL } from "@/lib/constants";
import { emailSchema } from "@/lib/schemas";

export async function sendEmail(email: z.infer<typeof emailSchema>) {
  try {
    const parsedEmail = emailSchema.parse(email);

    const requestHeaders = new Headers();
    requestHeaders.append("accept", "application/json");
    requestHeaders.append("content-type", "application/json");
    requestHeaders.append("api-key", env.BREVO_API_KEY);

    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(parsedEmail),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      throw validationError;
    }
    throw error;
  }
}
