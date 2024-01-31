import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

import { type RouterOutputs } from "@/lib/trpc/utils";

import TicketContentPopup from "./ticket-content-popup";

dayjs.extend(utc);

export type TicketContentProps = {
  ticket: RouterOutputs["ticket"]["getDetailsById"];
};

export default function TicketContent({ ticket }: TicketContentProps) {
  const startTimeLabel = dayjs.utc(ticket.timeslot.startTime).format("h.mm");
  const endTimeLabel = dayjs.utc(ticket.timeslot.endTime).format("h.mm A");

  return (
    <section className="grow py-2 px-3 border-l border-zinc-300 flex flex-col">
      <h2 className="text-xl font-medium mb-1.5">
        {ticket.bundle.event.name}{" "}
        <span className="whitespace-nowrap">({ticket.bundle.name})</span>
      </h2>
      <div className="grow flex justify-between gap-8 flex-wrap mb-2">
        <p className="text-sm flex items-center">
          <Clock className="size-4 mr-1.5" />
          <span className=" text-gtd-secondary-10">
            {dayjs.utc(ticket.bundle.event.startDate).format("D MMM")}
          </span>
        </p>
        <p className="text-sm flex items-center">
          <MapPin className="size-4 mr-1.5" />
          <span className=" text-gtd-secondary-10">
            {ticket.bundle.event.location}
          </span>
        </p>
      </div>
      <div className="grow flex items-center justify-between gap-8 flex-wrap">
        <p className="text-sm">
          {startTimeLabel} - {endTimeLabel}
        </p>
        <TicketContentPopup ticket={ticket} />
      </div>
    </section>
  );
}
