import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  telegramHandle: z.string(),
  phoneNumber: z.string(),
  eventName: z.string(),
  bundleName: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  names: z.string().array(),
  sessionId: z.string().optional(),
});
