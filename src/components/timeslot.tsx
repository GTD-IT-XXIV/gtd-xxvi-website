import "client-only";

import { type Timeslot } from "@prisma/client";
import dayjs from "dayjs";

import { cn } from "@/lib/utils";

export const DEFAULT_TIMESLOT_FORMAT = "ddd, HH.mm";

export default function Timeslot({
  timeslot,
  disabled = false,
  selected = false,
  onClick,
}: {
  timeslot: Timeslot;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  const startTimeLabel = dayjs(timeslot.startTime).format(
    DEFAULT_TIMESLOT_FORMAT,
  );
  const endTimeLabel = dayjs(timeslot.endTime).format(DEFAULT_TIMESLOT_FORMAT);
  // console.log(timeslot.id, selected);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "p-2 bg-slate-200 hover:bg-slate-100 border-2",
        selected ? "border-green-500" : "border-slate-300",
        disabled ? "text-muted bg-slate-100" : "",
      )}
    >
      {startTimeLabel} - {endTimeLabel}
    </button>
  );
}
