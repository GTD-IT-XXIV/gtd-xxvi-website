import "client-only";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { cartAtom } from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";

import TimeSlotButton from "../timeslot-button";
import TimeslotSectionLoading from "./loading";

dayjs.extend(utc);

export type TimeSlotSectionProps = {
  eventName: string;
  bundleName: string;
  quantity: number;
  media?: string;
  selected?: {
    start: Date;
    end: Date;
  };
  onChange: (start: Date, end: Date) => void;
  handleSkip: (value: boolean) => void;
};

export default function TimeSlotSection({
  eventName,
  bundleName,
  quantity,
  media,
  selected,
  onChange,
  handleSkip,
}: TimeSlotSectionProps) {
  const cart = useAtomValue(cartAtom);

  const {
    data: event,
    isLoading: isEventLoading,
    isError: isEventError,
  } = api.event.getByName.useQuery({ name: eventName });

  const {
    data: bundle,
    isLoading: isBundleLoading,
    isError: isBundleError,
  } = api.bundle.getByNameAndEvent.useQuery({
    name: bundleName,
    event: eventName,
  });

  const {
    data: timeslots,
    isLoading: isTimeslotsLoading,
    isError: isTimeslotsError,
  } = api.timeslot.getManyByEvent.useQuery(
    { event: eventName },
    { refetchInterval: 3000 },
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
        if (timeslots[0].remainingSlots > 0) {
          onChange(timeslots[0].startTime, timeslots[0].endTime);
        }
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

  if (isEventLoading || isBundleLoading || isTimeslotsLoading) {
    return <TimeslotSectionLoading />;
  }
  if (isEventError || isBundleError || isTimeslotsError) {
    return null;
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
      <div className="flex flex-wrap w-full gap-x-3 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {timeslots.map((timeslot, idx) => {
          const remainingSlots = timeslot.remainingSlots;
          // timeslot already selected by some other item
          const alreadySelected = cart.some(
            (item) =>
              item.timeslot?.start.getTime() === timeslot.startTime.getTime() &&
              item.timeslot?.end.getTime() === timeslot.endTime.getTime(),
          );
          const disabled =
            remainingSlots < bundle.quantity * quantity || alreadySelected;
          const isSelected =
            selected?.start.getTime() === timeslot.startTime.getTime() &&
            selected?.end.getTime() === timeslot.endTime.getTime();
          console.log({ alreadySelected, disabled });

          return (
            <TimeSlotButton
              key={idx}
              timeslot={timeslot}
              remainingSlots={timeslot.remainingSlots}
              onClick={onChange}
              state={
                isSelected ? "checked" : disabled ? "disabled" : "unchecked"
              }
              availability={disabled ? "low" : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
