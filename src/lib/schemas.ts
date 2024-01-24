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
 * Schema for cart used to synchornize registration process. If ID is 0, then
 * user has not selected that item, e.g., bundleId equals 0 means that user has
 * not selected a bundle for the event in eventId.
 */
export const cartSchema = z
  .object({
    eventId: z.number().nonnegative(),
    bundleId: z.number().nonnegative(),
    timeslotId: z.number().nonnegative(),
    quantity: z.number().nonnegative(),
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
