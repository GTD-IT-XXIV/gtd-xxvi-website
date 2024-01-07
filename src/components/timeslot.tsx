import "client-only";

import { type Timeslot } from "@prisma/client";
import dayjs from "dayjs";

export const DEFAULT_TIMESLOT_FORMAT = "ddd, HH.mm";

export default function Timeslot({ timeslot }: { timeslot: Timeslot }) {
  const startTimeLabel = dayjs(timeslot.startTime).format(
    DEFAULT_TIMESLOT_FORMAT,
  );
  const endTimeLabel = dayjs(timeslot.endTime).format(DEFAULT_TIMESLOT_FORMAT);

  function handleClick() {
    console.log(`clicked timeslot ${timeslot.id}`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="p-2 bg-slate-200 hover:bg-slate-100 border-2 border-slate-300"
    >
      {startTimeLabel} - {endTimeLabel}
    </button>
  );
}
