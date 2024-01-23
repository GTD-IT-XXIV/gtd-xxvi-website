"use client";

import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { useSetAtom } from "jotai";

import { allowCheckoutAtom } from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";

import BookingReviewBundleLoading from "./loading";

export type BookingReviewBundleProps = {
  eventId: number;
  bundleId: number;
  timeslotId: number;
  quantity: number;
};

export default function BookingReviewBundle({
  eventId,
  bundleId,
  timeslotId,
  quantity,
}: BookingReviewBundleProps) {
  const {
    data: event,
    error: eventError,
    isLoading: isEventLoading,
    isError: isEventError,
  } = api.event.getById.useQuery({ id: eventId });
  const {
    data: bundle,
    error: bundleError,
    isLoading: isBundleLoading,
    isError: isBundleError,
  } = api.bundle.getById.useQuery({ id: bundleId });
  const {
    data: timeslot,
    error: timeslotError,
    isLoading: isTimeslotLoading,
    isError: isTimeslotError,
  } = api.timeslot.getById.useQuery({ id: timeslotId });

  const setAllowCheckout = useSetAtom(allowCheckoutAtom);

  if (isEventLoading || isBundleLoading || isTimeslotLoading) {
    setAllowCheckout(false);
    return <BookingReviewBundleLoading />;
  }

  if (isEventError || isBundleError) {
    setAllowCheckout(false);
    return null;
  }

  if (isTimeslotError) {
    setAllowCheckout(false);
  } else {
    setAllowCheckout(true);
  }

  const price = new Prisma.Decimal(bundle.price).times(quantity).toDP(0);
  console.log({ startTime: timeslot?.startTime, endTime: timeslot?.endTime });

  return (
    <div className="flex">
      <div className="bundle-details my-1.5 w-5/6">
        <div className="bundle-name text-[3vw] my-1 font-medium">
          {quantity} x {event.name} ({bundle.name}){" "}
        </div>
        <div className="bundle-description text-[3vw] my-1 text-gtd-secondary-10 font-light">
          {dayjs(event.startDate).format("dddd, D MMMM YYYY")},{" "}
          {isTimeslotError ? (
            <span className="text-red-600">no timeslot chosen</span>
          ) : (
            `${dayjs(timeslot.startTime).format("h.mm")} -
              ${dayjs(timeslot.endTime).format("h.mm A")}`
          )}
        </div>
      </div>
      <div className="flex items-center justify-end my-2 text-[3vw] w-1/6">
        ${price.toString()}
      </div>
    </div>
  );
}
