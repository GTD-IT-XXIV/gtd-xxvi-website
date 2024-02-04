import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(5, { message: "Must be 5 or more characters long" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

export const signupSchema = loginSchema.extend({
  name: z
    .string()
    .trim()
    .min(3, { message: "Must be 3 or more characters long" }),
  email: z.string().trim().email(),
});

/**
 * Schema for cart used to synchornize registration process. Null means not
 * selected yet.
 **/
export const cartSchema = z
  .object({
    event: z.object({
      name: z.string(),
      bundle: z.string(),
    }),
    timeslot: z
      .object({
        start: z.date(),
        end: z.date(),
      })
      .optional(),
    quantity: z.number().nonnegative(),
    participants: z.string().trim().min(1).array(),
  })
  .array();

export const emailActorSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export const emailSchema = z.object({
  sender: emailActorSchema,
  replyTo: emailActorSchema,
  to: emailActorSchema.array(),
  bcc: emailActorSchema.array().optional(),
  cc: emailActorSchema.array().optional(),
  htmlContent: z.string(),
  textContent: z.string().optional(),
  subject: z.string(),
});

export const eventParamSchema = z.string().or(z.string().array());
