"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SuperJSON from "superjson";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import BundleSelect from "@/components/bundle-select";

import { bookingsAtom } from "@/lib/atoms/events-registration";
import { errorAtom } from "@/lib/atoms/message";
import { useHasMounted } from "@/lib/hooks";
import {
  type BundlesPageQueryParams,
  bundlesPageQueryParamsSchema,
} from "@/lib/schemas";
import { cleanBookings } from "@/lib/utils";

export default function BundlesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasMounted = useHasMounted();

  const [bookings, setBookings] = useAtom(bookingsAtom);
  const setError = useSetAtom(errorAtom);

  const eventParams = searchParams.get("event");
  let events: BundlesPageQueryParams = [];
  try {
    events = bundlesPageQueryParamsSchema.parse(
      eventParams ? SuperJSON.parse(atob(eventParams)) : null,
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      setError(validationError.message);
      router.replace("/events");
    }
  }

  const [eventBundle, setEventBundle] = useState<Record<number, number>>(() =>
    events.reduce((accum, event) => ({ ...accum, [event.id]: 0 }), {}),
  );
  const [eventBundleQuantity, setEventBundleQuantity] = useState<
    Record<number, number>
  >(() => events.reduce((accum, event) => ({ ...accum, [event.id]: 0 }), {}));
  const isEveryEventBundleSelected = events.every(
    (event) => !!eventBundle[event.id] && !!eventBundleQuantity[event.id],
  );

  useEffect(() => {
    function runEffect() {
      if (hasMounted && bookings && bookings.length > 0) {
        const cleanedBookings = cleanBookings(
          bookings,
          events.map((event) => event.id),
        );
        setEventBundle((prev) => {
          const fromBookings = cleanedBookings.reduce(
            (accum, booking) => ({
              ...accum,
              [booking.eventId]: booking.bundleId,
            }),
            {},
          );
          return { ...prev, ...fromBookings };
        });
        setEventBundleQuantity((prev) => {
          const fromBookings = cleanedBookings.reduce(
            (accum, booking) => ({
              ...accum,
              [booking.eventId]: booking.quantity,
            }),
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
  }, [hasMounted, bookings]);

  function handleClickNext() {
    setBookings(
      events.map((event, idx) => {
        if (!eventBundle[idx] || !eventBundleQuantity[idx]) {
          throw new Error(`Event with id '${event.id}' has no bundle selected`);
        }
        return {
          quantity: eventBundleQuantity[idx]!,
          bundleId: eventBundle[idx]!,
          eventId: event.id,
          timeslotId: event.timeslotId,
        };
      }),
    );
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Bundles Selection</h1>
      {events.map((event) => (
        <BundleSelect
          key={event.id}
          eventId={event.id}
          selectedId={eventBundle[event.id]}
          quantity={eventBundleQuantity[event.id]}
          onChange={(selectedId, quantity) => {
            console.log({ id: selectedId, quantity });
            setEventBundle((prev) => ({ ...prev, [event.id]: selectedId }));
            setEventBundleQuantity((prev) => ({
              ...prev,
              [event.id]: quantity,
            }));
          }}
        />
      ))}
      <div className="space-x-2">
        <Link
          href={{
            pathname: "/register/timeslots",
            query: {
              event: events.map((event) => event.id),
            },
          }}
        >
          <button type="button" className="p-2 bg-slate-200 hover:bg-slate-100">
            Back
          </button>
        </Link>
        <Link href="/register/checkout">
          <button
            type="button"
            className="p-2 bg-slate-200 hover:bg-slate-100"
            disabled={!isEveryEventBundleSelected}
            onClick={handleClickNext}
          >
            Next
          </button>
        </Link>
      </div>
    </main>
  );
}
