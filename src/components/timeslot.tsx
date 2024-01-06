import "client-only";

import { type Timeslot } from "@prisma/client";
import dayjs from "dayjs";

export const DEFAULT_TIMESLOT_FORMAT = "HH.mm";

export default function Timeslot({ timeslot }: { timeslot: Timeslot }) {
  let startTimeLabel = dayjs(timeslot.startTime).format(
    DEFAULT_TIMESLOT_FORMAT,
  );
  let endTimeLabel = dayjs(timeslot.endTime).format(DEFAULT_TIMESLOT_FORMAT);

  if (timeslot.startTime.getDate() !== timeslot.endTime.getDate()) {
    const timeslotFormat = `ddd, D MMM ${DEFAULT_TIMESLOT_FORMAT}`;
    startTimeLabel = dayjs(timeslot.startTime).format(timeslotFormat);
    endTimeLabel = dayjs(timeslot.endTime).format(timeslotFormat);
  }

  return (
    <div className="p-2 border-2 border-slate-300">
      {startTimeLabel}-{endTimeLabel}
    </div>
  );
}
