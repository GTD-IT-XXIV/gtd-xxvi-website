import { z } from "zod";

export const merchBookingSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  telegramHandle: z.string(),
  phoneNumber: z.string(),
  merchBundleId: z.number().positive(),
  quantity: z.number().positive(),
  sessionId: z.string().optional(),
});
