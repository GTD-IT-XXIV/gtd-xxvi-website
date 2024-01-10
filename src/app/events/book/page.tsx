"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import SuperJSON from "superjson";
import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";

import Timeslots from "@/components/timeslots";

import { formDataAtom } from "@/lib/atoms/events-registration";
import { errorAtom } from "@/lib/atoms/message";
import { useHasPendingPayments } from "@/lib/hooks";
import { api } from "@/lib/trpc/provider";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasPendingPayments = useHasPendingPayments();
  const formData = useAtomValue(formDataAtom);
  const setError = useSetAtom(errorAtom);

  const eventParams = searchParams.getAll("event");
  const eventsSchema = z
    .object({
      id: z.number().positive(),
      bundleId: z.number().positive(),
      amount: z.number().positive(),
    })
    .array();
  let events: z.infer<typeof eventsSchema>;
  try {
    events = eventsSchema.parse(eventParams.map((str) => SuperJSON.parse(str)));
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      throw validationError;
    }
    throw new Error("Invalid query parameters");
  }

  const timeslotsQueries = api.useQueries((api) =>
    events.map((event) => api.timeslots.getManyByEvent(event.id)),
  );
  const createBooking = api.bookings.create.useMutation({
    onError: (error) => {
      setError(
        `No timeslot. Please select another timeslot. (Error message: ${error.message})`,
      );
    },
  });

  const isTimeslotsQueriesLoading = timeslotsQueries.some(
    (query) => query.isLoading,
  );
  const isEveryEventSingleTimeslot = timeslotsQueries.every(
    (query) => query.data && query.data.length === 1,
  );

  if (!isTimeslotsQueriesLoading && isEveryEventSingleTimeslot) {
    events.forEach((event, idx) => {
      const timeslotsQuery = timeslotsQueries[idx];
      // Unreachable code but necessary for type safety
      if (!timeslotsQuery?.data?.[0]) {
        throw new Error("Timeslots query not found");
      }
      createBooking.mutate({
        ...formData,
        quantity: event.amount,
        eventId: event.id,
        bundleId: event.bundleId,
        timeslotId: timeslotsQuery.data[0].id,
      });
    });
    router.replace("/checkout");
  }

  if (hasPendingPayments) {
    router.replace("/checkout");
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Booking Page</h1>
      {events.map((event) => (
        <Timeslots
          key={event.id}
          eventId={event.id}
          bundleId={event.bundleId}
          amount={event.amount}
        />
      ))}
    </main>
  );
}
