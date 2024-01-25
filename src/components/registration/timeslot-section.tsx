"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { api } from "@/lib/trpc/client";

import TimeSlotButton from "./timeslot-button";

dayjs.extend(utc);

export type TimeSlotSectionProps = {
  eventId: number;
  bundleId: number;
  quantity: number;
};

export default function TimeSlotSection({
  eventId,
  bundleId,
  quantity,
}: TimeSlotSectionProps) {
  const {
    data: event,
    isLoading: isEventLoading,
    isError: isEventError,
  } = api.event.getById.useQuery({ id: eventId });

  const {
    data: bundle,
    isLoading: isBundleLoading,
    isError: isBundleError,
  } = api.bundle.getById.useQuery({ id: bundleId });

  const {
    data: timeslots,
    isLoading: isTimeslotsLoading,
    isError: isTimeslotsError,
  } = api.timeslot.getManyByEvent.useQuery(
    { eventId },
    { refetchInterval: false },
  );

  if (isEventLoading || isBundleLoading) {
    return <div>Loading...</div>;
  }
  if (isEventError || isBundleError) {
    return <div>Error</div>;
  }

  if (isTimeslotsLoading) {
    return <div>Loading...</div>;
  }
  if (isTimeslotsError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h2 className="font-medium text-gtd-primary-20 text-2xl">
        {event.name} ({bundle.name}) Timeslots
      </h2>
      <div className="font-medium my-3 text-lg text-gtd-secondary-30">
        {dayjs.utc(event.startDate).format("dddd, D MMMM YYYY")}
      </div>
      <div>
        {timeslots.map((timeslot) => {
          const remainingSlots = timeslot.remainingSlots;
          const disabled = remainingSlots < bundle.quantity * quantity;
          return (
            <TimeSlotButton
              id={timeslot.id}
              remainingSlots={timeslot.remainingSlots}
              disabled={disabled}
              startTime={timeslot.startTime}
              endTime={timeslot.endTime}
            />
          );
        })}
      </div>
    </div>
  );
}
