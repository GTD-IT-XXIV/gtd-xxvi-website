import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine((str) => !(str === ""), "You forgot to add your database URL"),
    DIRECT_URL: z.string().url().optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    STRIPE_SECRET_KEY: z
      .string()
      .refine(
        (str) => !(str === ""),
        "You forgot to add your Stripe API secret key",
      ),
    STRIPE_WEBHOOK_SECRET: z
      .string()
      .refine(
        (str) => !(str === ""),
        "You forgot to add your Stripe webhooks endpoint secret",
      ),
    BREVO_API_KEY: z
      .string()
      .refine((str) => !(str === ""), "You forgot to add your Brevo API key"),
    GOOGLE_CLIENT_EMAIL: z
      .string()
      .refine(
        (str) => !(str === ""),
        "You forgot to add your Google Service Account client email",
      ),
    GOOGLE_PRIVATE_KEY: z
      .string()
      .refine(
        (str) => !(str === ""),
        "You forgot to add your Google Service Account private key",
      ),
    SHEETS_ID: z
      .string()
      .refine(
        (str) => !(str === ""),
        "You forgot to add your Google Sheets ID",
      ),
    LEADERBOARDS_SHEETS_ID: z
      .string()
      .refine(
        (str) => !(str === ""),
        "You forgot to add your leaderboards Google Sheets ID",
      ),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
      .string()
      .refine(
        (str) => !(str === ""),
        "You forgot to add your Stripe API publishable key",
      ),
    NEXT_PUBLIC_BACKEND_URL: z
      .string()
      .url()
      .refine((str) => !(str === ""), "You forgot to add your backend URL"),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    NODE_ENV: process.env.NODE_ENV,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    SHEETS_ID: process.env.SHEETS_ID,
    LEADERBOARDS_SHEETS_ID: process.env.LEADERBOARDS_SHEETS_ID,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
