"use client";

import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import EventOption from "@/components/registration/event-option";

import { bookingsAtom } from "@/lib/atoms/events-registration";
import { errorAtom } from "@/lib/atoms/message";
import { useHasMounted } from "@/lib/hooks";
import { type EventId, eventIdSchema } from "@/lib/schemas";
import { cleanBookings } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasMounted = useHasMounted();

  const setError = useSetAtom(errorAtom);
  const bookings = useAtomValue(bookingsAtom);

  const eventParams = searchParams.getAll("event");
  let eventIds: EventId[] = [];
  try {
    eventIds = eventIdSchema.array().parse(eventParams);
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      setError(validationError.message);
      router.replace("/events");
    }
  }

  const [selectedEvents, setSelectedEvents] = useState<Record<number, boolean>>(
    () => eventIds.reduce((accum, id) => ({ ...accum, [id]: false }), {}),
  );
  const selectedIds = Object.keys(selectedEvents).filter(
    (id) => selectedEvents[Number(id)],
  );

  useEffect(() => {
    function runEffect() {
      if (hasMounted && bookings.length > 0) {
        const cleanedBookings = cleanBookings(bookings, eventIds);
        setSelectedEvents((prev) => {
          const fromBookings = cleanedBookings.reduce(
            (accum, booking) => ({ ...accum, [booking.eventId]: true }),
            {},
          );
          return { ...prev, ...fromBookings };
        });
      }
    }

    let ignored = false;
    if (!ignored) {
      runEffect();
    }
    return () => {
      ignored = true;
    };
  }, [bookings, hasMounted]);

  return (
    <main>
      <h1 className="text-2xl font-semibold">Registration Page</h1>
      <article>
        {eventIds.map((id) => (
          <EventOption
            key={id}
            id={id}
            checked={selectedEvents[id]}
            onChange={(checked) =>
              setSelectedEvents((prev) => ({ ...prev, [id]: checked }))
            }
          />
        ))}
      </article>
      <div className="flex gap-2">
        <button
          type="button"
          className="p-2 bg-slate-200 hover:bg-slate-100"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <Link
          href={{
            pathname: "/register/timeslots",
            query: { event: selectedIds },
          }}
        >
          <button
            type="button"
            className="p-2 bg-slate-200 hover:bg-slate-100"
            disabled={selectedIds.length === 0}
          >
            Next
          </button>
        </Link>
      </div>
    </main>
  );
}
