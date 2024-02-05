"use client";

import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useSetAtom } from "jotai";

import { allowCheckoutAtom } from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";

import BookingReviewBundleLoading from "./loading";

dayjs.extend(utc);

export type BookingReviewBundleProps = {
  eventName: string;
  bundleName: string;
  timeslot?: {
    start: Date;
    end: Date;
  };
  quantity: number;
};

export default function BookingReviewBundle({
  eventName,
  bundleName,
  timeslot,
  quantity,
}: BookingReviewBundleProps) {
  const {
    data: event,
    error: eventError,
    isLoading: isEventLoading,
    isError: isEventError,
  } = api.event.getByName.useQuery({ name: eventName });
  const {
    data: bundle,
    error: bundleError,
    isLoading: isBundleLoading,
    isError: isBundleError,
  } = api.bundle.getByNameAndEvent.useQuery({
    name: bundleName,
    event: eventName,
  });
  const {
    data: timeslotData,
    error: timeslotError,
    isFetching: isTimeslotFetching,
    isLoading: isTimeslotLoading,
    isError: isTimeslotError,
  } = api.timeslot.getByTimeAndEvent.useQuery(
    {
      event: eventName,
      startTime: timeslot?.start ?? new Date(),
      endTime: timeslot?.end ?? new Date(),
    },
    { enabled: !!timeslot && !!timeslot.start && !!timeslot.end },
  );

  const setAllowCheckout = useSetAtom(allowCheckoutAtom);

  if (isEventLoading || isBundleLoading || isTimeslotFetching) {
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

  return (
    <div className="flex">
      <div className="bundle-details my-1.5 w-5/6">
        <div className="bundle-name my-1 font-medium">
          {quantity} x {event.name} ({bundle.name}){" "}
        </div>
        <div className="bundle-description text-sm my-1 text-gtd-secondary-10 font-light">
          {dayjs.utc(event.startDate).format("dddd, D MMMM YYYY")},{" "}
          {!timeslot ? (
            <span className="text-red-600">no timeslot chosen</span>
          ) : (
            !isTimeslotLoading &&
            !isTimeslotError &&
            `${dayjs.utc(timeslotData.startTime).format("h.mm")} -
              ${dayjs.utc(timeslotData.endTime).format("h.mm A")}`
          )}
        </div>
      </div>
      <div className="flex items-center justify-end my-2 w-1/6">
        ${price.toString()}
      </div>
    </div>
  );
}
