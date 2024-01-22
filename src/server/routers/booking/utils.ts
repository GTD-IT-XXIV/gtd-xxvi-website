import { type PrismaClient } from "@prisma/client";
import { type z } from "zod";

import { type bookingEventConsistencySchema } from "./schemas";

export async function checkEventConsistency(
  db: PrismaClient,
  booking: z.infer<typeof bookingEventConsistencySchema>,
) {
  const id = booking.eventId; // source of truth
  const bundle = await db.bundle.findUnique({
    where: { id: booking.bundleId },
    select: { eventId: true },
  });
  const timeslot = await db.timeslot.findUnique({
    where: { id: booking.timeslotId },
    select: { eventId: true },
  });
  return id === bundle?.eventId && id === timeslot?.eventId;
}
