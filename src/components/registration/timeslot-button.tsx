"use client";

import dayjs from "dayjs";

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
      className={
        (disabled ? "bg-slate-100" : "bg-white") +
        " flex min-w-[90%] border-box justify-between my-1.5 mx-3 py-3 px-3 border border-slate-300 rounded-[.5rem]"
      }
      id={String(id)}
      disabled={disabled ? true : false}
    >
      <div className="text-gtd-secondary-20">
        {dayjs(startTime).format("h.mm")} - {dayjs(endTime).format("h.mm A")}
      </div>
      <div
        className={
          (disabled
            ? "text-red-800"
            : remainingSlots >= highAvailability
              ? "text-emerald-800"
              : "text-yellow-500") + " font-medium"
        }
      >
        {remainingSlots} slots left
      </div>
    </button>
  );
}
