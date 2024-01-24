"use client";

import dayjs from "dayjs";

import { api } from "@/lib/trpc/client";

import TimeSlotButton from "./timeslot-button";

export type TimeSlotSectionProps = {
  eventId: number;
  totalTicket: number;
};

export default function TimeSlotSection({
  eventId,
  totalTicket,
}: TimeSlotSectionProps) {
  const {
    data: event,
    isLoading: isEventsLoading,
    isError: isEventsError,
  } = api.event.getById.useQuery({ id: eventId });

  const {
    data: timeslots,
    isLoading: isTimeslotLoading,
    isError: isTimeslotError,
  } = api.timeslot.getManyByEvent.useQuery({ eventId });

  if (isEventsLoading) {
    return <div>Loading...</div>;
  }
  if (isEventsError) {
    return <div>Error</div>;
  }

  if (isTimeslotLoading) {
    return <div>Loading...</div>;
  }
  if (isTimeslotError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div className="px-[.75rem] font-bold my-3 text-[1.25rem] text-gtd-secondary-30">
        {dayjs(event.startDate).format("dddd, D MMMM YYYY")}
      </div>
      <div>
        {timeslots.map((timeslot) => {
          const remainingSlots = timeslot.remainingSlots;
          const disabled = remainingSlots < totalTicket;
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
