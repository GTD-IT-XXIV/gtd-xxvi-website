"use client";

import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SuperJSON from "superjson";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import Timeslots from "@/components/timeslots";

import { bookingsAtom } from "@/lib/atoms/events-registration";
import { errorAtom } from "@/lib/atoms/message";
import { useHasMounted } from "@/lib/hooks";
import {
  type BundlesPageQueryParams,
  type EventId,
  eventIdSchema,
} from "@/lib/schemas";
import { api } from "@/lib/trpc/client";
import { cleanBookings } from "@/lib/utils";

export default function TimeslotsPage() {
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

  const [eventTimeslot, setEventTimeslot] = useState<Record<number, number>>(
    () => eventIds.reduce((accum, id) => ({ ...accum, [id]: 0 }), {}),
  );
  const isEveryEventTimeslotSelected = eventIds.every(
    (id) => !!eventTimeslot[id],
  );
  const timeslotsQueries = api.useQueries((t) =>
    eventIds.map((id) => t.timeslot.getManyByEvent({ eventId: id })),
  );
  const isTimeslotsQueriesLoading = timeslotsQueries.some(
    (query) => query.isLoading,
  );
  const isTimeslotsQueriesError = timeslotsQueries.some(
    (query) => query.isError,
  );

  useEffect(() => {
    function runEffect() {
      if (hasMounted && bookings.length > 0) {
        const cleanedBookings = cleanBookings(bookings, eventIds);
        setEventTimeslot((prev) => {
          const fromBookings = cleanedBookings.reduce(
            (accum, booking) => ({
              ...accum,
              [booking.eventId]: booking.timeslotId,
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

  useEffect(() => {
    function runEffect() {
      if (!isTimeslotsQueriesLoading && !isTimeslotsQueriesError) {
        const isEveryEventSingleTimeslot = timeslotsQueries.every(
          ({ data: timeslots }) => timeslots?.length === 1 && timeslots[0]?.id,
        );
        if (!isEveryEventSingleTimeslot) {
          return;
        }
        const searchParams = new URLSearchParams();
        const bundlesPageParams: BundlesPageQueryParams = timeslotsQueries.map(
          (query, idx) => ({
            id: eventIds[idx]!,
            timeslotId: query.data![0]!.id,
          }),
        );
        searchParams.set("event", btoa(SuperJSON.stringify(bundlesPageParams)));
        router.replace(`/register/bundles?${searchParams.toString()}`);
      }
    }

    let ignored = false;
    if (!ignored) {
      runEffect();
    }
    return () => {
      ignored = true;
    };
  }, [isTimeslotsQueriesLoading, isTimeslotsQueriesError, timeslotsQueries]);

  function handleClickNext() {
    const searchParams = new URLSearchParams();
    const bundlesPageParams: BundlesPageQueryParams = eventIds.map((id) => {
      if (!eventTimeslot[id]) {
        throw new Error(
          `Event with id '${id}' does not have any timeslot selected`,
        );
      }
      return {
        id,
        timeslotId: eventTimeslot[id]!,
      };
    });
    searchParams.set("event", btoa(SuperJSON.stringify(bundlesPageParams)));
    console.log(searchParams.get("event"));
    router.push(`/register/bundles?${searchParams.toString()}`);
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Event Timeslots Page</h1>
      <article>
        {eventIds.map((id) => (
          <Timeslots
            key={id}
            eventId={id}
            selectedId={eventTimeslot[id] ?? 0}
            onChange={(selectedId) =>
              setEventTimeslot((prev) => ({ ...prev, [id]: selectedId }))
            }
          />
        ))}
      </article>
      <div className="space-x-2">
        <Link
          href={{
            pathname: "/register",
            query: { event: eventIds },
          }}
        >
          <button type="button" className="p-2 bg-slate-200 hover:bg-slate-100">
            Back
          </button>
        </Link>
        <button
          type="button"
          className="p-2 bg-slate-200 hover:bg-slate-100"
          disabled={!isEveryEventTimeslotSelected}
          onClick={handleClickNext}
        >
          Next
        </button>
      </div>
    </main>
  );
}
