import "client-only";

import { cva } from "class-variance-authority";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { cn } from "@/lib/utils";

dayjs.extend(utc);

const timeslotButtonVariants = cva("", {
  variants: {
    availability: {
      low: "text-red-800",
      medium: "text-yellow-500",
      high: "text-emerald-800",
    },
  },
});

export type TimeSlotButtonProps = {
  timeslot: {
    eventName: string;
    startTime: Date;
    endTime: Date;
  };
  state?: "disabled" | "unchecked" | "checked";
  availability?: "low" | "medium" | "high";
  remainingSlots: number;
  onClick: (start: Date, end: Date) => void;
};

export default function TimeSlotButton({
  timeslot: timeslot,
  state = "unchecked",
  remainingSlots,
  availability = "high",
  onClick,
}: TimeSlotButtonProps) {
  if (remainingSlots === 0) {
    availability = "low";
  } else {
    availability = "high";
  }

  return (
    <button
      className={cn(
        "w-full flex justify-between my-2 p-3 border border-slate-300 rounded-lg md:flex-grow",
        state === "disabled" ? "bg-slate-100" : "bg-white",
        state === "checked"
          ? "bg-gtd-primary-30 text-white"
          : "text-gtd-secondary-20",
      )}
      disabled={state === "disabled"}
      onClick={() => onClick(timeslot.startTime, timeslot.endTime)}
    >
      <span>
        {dayjs.utc(timeslot.startTime).format("h.mm")} -{" "}
        {dayjs.utc(timeslot.endTime).format("h.mm A")}
      </span>
      {state === "checked" ? (
        <span>Selected</span>
      ) : (
        <span className={timeslotButtonVariants({ availability })}>
          {availability === "low" ? "Booked" : "Available"}
        </span>
      )}
    </button>
  );
}
