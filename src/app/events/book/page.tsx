"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SuperJSON from "superjson";
import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";

import { useHasPendingPayments } from "@/lib/hooks";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasPendingPayments = useHasPendingPayments();

  const eventParams = searchParams.getAll("event");
  const eventSchema = z
    .object({
      id: z.number().positive(),
      bundleId: z.number().positive(),
      amount: z.number().positive(),
    })
    .array();
  let events: z.infer<typeof eventSchema>;
  try {
    events = eventSchema.parse(eventParams.map((str) => SuperJSON.parse(str)));
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      throw validationError;
    }
    throw new Error("Invalid query parameters");
  }

  if (hasPendingPayments) {
    router.replace("/checkout");
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Booking Page</h1>
      {events.map((event) => (
        <div>Timeslots placeholder</div>
      ))}
    </main>
  );
}
