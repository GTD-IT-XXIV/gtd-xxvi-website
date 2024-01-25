import "client-only";

import { cva } from "class-variance-authority";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { api } from "@/lib/trpc/client";
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
  id: number;
  startTime: Date;
  endTime: Date;
  state?: "disabled" | "unchecked" | "checked";
  availability?: "low" | "medium" | "high";
  remainingSlots: number;
  onClick: (id: number) => void;
};

export default function TimeSlotButton({
  id,
  startTime,
  endTime,
  state = "unchecked",
  remainingSlots,
  availability = "high",
  onClick,
}: TimeSlotButtonProps) {
  const {
    data: totalSlots,
    isLoading,
    isError,
  } = api.timeslot.getTotalSlotsById.useQuery({ id });

  if (!isLoading && !isError) {
    const empty = remainingSlots / totalSlots;
    if (empty >= 0.75) {
      availability = "high";
    } else if (empty >= 0.5) {
      availability = "medium";
    } else {
      availability = "low";
    }
  }

  return (
    <button
      className={cn(
        "w-full flex justify-between my-2 p-3 border border-slate-300 rounded-lg",
        state === "disabled" ? "bg-slate-100" : "bg-white",
        state === "checked"
          ? "bg-gtd-primary-30 text-white"
          : "text-gtd-secondary-20",
      )}
      id={String(id)}
      disabled={state === "disabled"}
      onClick={() => onClick(id)}
    >
      <span>
        {dayjs.utc(startTime).format("h.mm")} -{" "}
        {dayjs.utc(endTime).format("h.mm A")}
      </span>
      {state === "checked" ? (
        <span>Selected</span>
      ) : (
        <span className={timeslotButtonVariants({ availability })}>
          {remainingSlots} slots left
        </span>
      )}
    </button>
  );
}
