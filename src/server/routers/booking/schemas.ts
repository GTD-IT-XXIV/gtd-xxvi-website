import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  telegramHandle: z.string(),
  phoneNumber: z.string(),
  quantity: z.number().nonnegative(),
  eventId: z.number().positive(),
  bundleId: z.number().positive(),
  timeslotId: z.number().positive(),
  sessionId: z.string().optional(),
});

export const updateHandlerInputSchema = bookingSchema
  .partial()
  .merge(z.object({ id: z.number().positive() }));

export const bookingEventConsistencySchema = bookingSchema.pick({
  eventId: true,
  bundleId: true,
  timeslotId: true,
});
