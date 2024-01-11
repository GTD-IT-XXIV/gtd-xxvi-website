import { type Timeslot } from "@prisma/client";
import dayjs from "dayjs";
import { type MouseEventHandler } from "react";

import { cn } from "@/lib/utils";

export const DEFAULT_TIMESLOT_FORMAT = "ddd, HH.mm";

export type TimeslotProps = {
  startTime: Date;
  endTime: Date;
  disabled?: boolean;
  selected?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function Timeslot({
  startTime,
  endTime,
  disabled = false,
  selected = false,
  onClick,
}: TimeslotProps) {
  const startTimeLabel = dayjs(startTime).format(DEFAULT_TIMESLOT_FORMAT);
  const endTimeLabel = dayjs(endTime).format(DEFAULT_TIMESLOT_FORMAT);
  // console.log(timeslot.id, selected);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "p-2 bg-slate-200 hover:bg-slate-100 border-2",
        selected ? "border-green-500" : "border-slate-300",
        disabled ? "bg-slate-100 cursor-loading" : "", // causes flickering
      )}
    >
      {startTimeLabel} - {endTimeLabel}
    </button>
  );
}
