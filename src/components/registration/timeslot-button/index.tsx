"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { cn } from "@/lib/utils";

dayjs.extend(utc);

export type TimeSlotButtonProps = {
  id: number;
  startTime: Date;
  endTime: Date;
  disabled: boolean;
  remainingSlots: number;
};

export default function TimeSlotButton({
  id,
  startTime,
  endTime,
  disabled,
  remainingSlots,
}: TimeSlotButtonProps) {
  const highAvailability = 100;

  return (
    <button
      className={cn(
        "w-full flex justify-between my-2 p-3 border border-slate-300 rounded-lg",
        disabled ? "bg-slate-100" : "bg-white",
      )}
      id={String(id)}
      disabled={disabled ? true : false}
    >
      <div className="text-gtd-secondary-20">
        {dayjs.utc(startTime).format("h.mm")} -{" "}
        {dayjs.utc(endTime).format("h.mm A")}
      </div>
      <div
        className={
          disabled
            ? "text-red-800"
            : remainingSlots >= highAvailability
              ? "text-emerald-800"
              : "text-yellow-500"
        }
      >
        {remainingSlots} slots left
      </div>
    </button>
  );
}
