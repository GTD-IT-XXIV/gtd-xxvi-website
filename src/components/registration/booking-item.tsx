"use client";

import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

import { api } from "@/lib/trpc/client";

export type BookingItemProps = {
  quantity: number;
  eventId: number;
  bundleId: number;
  timeslotId: number;
};

const REFETCH_INTERVAL = 60000;

export default function BookingItem({
  quantity,
  eventId,
  bundleId,
  timeslotId,
}: BookingItemProps) {
  const {
    data: event,
    error: eventError,
    isLoading: isEventLoading,
    isError: isEventError,
  } = api.event.getById.useQuery(
    { id: eventId },
    { refetchInterval: REFETCH_INTERVAL },
  );
  const {
    data: bundle,
    error: bundleError,
    isLoading: isBundleLoading,
    isError: isBundleError,
  } = api.bundle.getById.useQuery(
    { id: bundleId },
    { refetchInterval: REFETCH_INTERVAL },
  );
  const {
    data: timeslot,
    error: timeslotError,
    isLoading: isTimeslotLoading,
    isError: isTimeslotError,
  } = api.timeslot.getById.useQuery(
    { id: timeslotId },
    { refetchInterval: REFETCH_INTERVAL },
  );

  return (
    <article>
      <h2 className="text-xl font-medium">Booking</h2>
      <p>Quantity: {quantity}</p>
      {isEventLoading ? (
        <p>Event loading...</p>
      ) : isEventError ? (
        <p>An error occurred: {eventError.message}</p>
      ) : (
        <p>Event: {event.name}</p>
      )}
      {isBundleLoading ? (
        <p>Bundle loading...</p>
      ) : isBundleError ? (
        <p>An error occurred: {bundleError.message}</p>
      ) : (
        <div>
          <p>Bundle: {bundle.name}</p>
          <p>Price: {new Prisma.Decimal(bundle.price).toDP(2).toString()}</p>
          <p>
            Total price:{" "}
            {new Prisma.Decimal(bundle.price)
              .times(quantity)
              .toDP(2)
              .toString()}
          </p>
        </div>
      )}
      {isTimeslotLoading ? (
        <p>Timeslot loading...</p>
      ) : isTimeslotError ? (
        <p>An error occurred: {timeslotError.message}</p>
      ) : (
        <p>
          Timeslot: {dayjs(timeslot.startTime).format("ddd, HH.mm")} -{" "}
          {dayjs(timeslot.endTime).format("ddd, HH.mm")}
        </p>
      )}
    </article>
  );
}
