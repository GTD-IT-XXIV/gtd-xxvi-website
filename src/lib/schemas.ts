import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(5, { message: "Must be 5 or more characters long" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

export const signupSchema = loginSchema.extend({
  name: z.string().min(3, { message: "Must be 3 or more characters long" }),
  email: z.string().email(),
});

/**
 * Schema for cart used to synchornize registration process. If ID is 0, then
 * user has not selected that item, e.g., bundleId equals 0 means that user has
 * not selected a bundle for the event in eventId. Price refers to single bundle
 * price, not total price.
 */
export const cartSchema = z
  .object({
    eventId: z.number().nonnegative(),
    bundleId: z.number().nonnegative(),
    timeslotId: z.number().nonnegative(),
    quantity: z.number().nonnegative(),
    price: z.number().nonnegative(),
  })
  .array();
