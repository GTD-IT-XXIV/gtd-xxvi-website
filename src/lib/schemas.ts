import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(5, { message: "Must be 5 or more characters long" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

export const signupSchema = loginSchema.extend({
  name: z.string().min(3, { message: "Must be 3 or more characters long" }),
  email: z.string().email(),
});
