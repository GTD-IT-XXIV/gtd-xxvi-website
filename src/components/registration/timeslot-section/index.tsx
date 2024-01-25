import "client-only";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { api } from "@/lib/trpc/client";

import TimeSlotButton from "../timeslot-button";
import TimeslotSectionLoading from "./loading";

dayjs.extend(utc);

export type TimeSlotSectionProps = {
  eventId: number;
  bundleId: number;
  quantity: number;
  selectedId?: number;
  onChange: (id: number) => void;
  handleSkip: (value: boolean) => void;
};

export default function TimeSlotSection({
  eventId,
  bundleId,
  quantity,
  selectedId = 0,
  onChange,
  handleSkip,
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

  useEffect(() => {
    function runEffect() {
      if (!timeslots) {
        return;
      }
      if (timeslots.length > 1) {
        return handleSkip(false);
      }
      if (timeslots.length === 1 && timeslots[0]) {
        onChange(timeslots[0].id);
        return handleSkip(true);
      }
    }

    let ignored = false;
    if (!ignored) {
      runEffect();
    }
    return () => {
      ignored = true;
    };
  }, [timeslots]);

  if (isEventLoading || isBundleLoading) {
    return <TimeslotSectionLoading />;
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

  if (timeslots.length === 1 && timeslots[0]) {
    return null;
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
              key={timeslot.id}
              id={timeslot.id}
              remainingSlots={timeslot.remainingSlots}
              startTime={timeslot.startTime}
              endTime={timeslot.endTime}
              onClick={onChange}
              state={
                disabled
                  ? "disabled"
                  : timeslot.id === selectedId
                    ? "checked"
                    : "unchecked"
              }
              availability={disabled ? "low" : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
