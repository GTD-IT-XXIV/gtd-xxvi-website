import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { type RouterOutputs } from "@/lib/trpc/utils";

import TicketQr from "./ticket-qr";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

dayjs.extend(utc);

export type TicketContentPopupProps = {
  ticket: RouterOutputs["ticket"]["getDetailsById"];
};

export default function TicketContentPopup({
  ticket,
}: TicketContentPopupProps) {
  const createdLabel = dayjs.utc(ticket.created).format("D MMM, YYYY");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          className="bg-gtd-primary-30 hover:bg-gtd-primary-30/85"
        >
          Info
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-min">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gtd-primary-30 text-2xl">
            {ticket.bundle.event.name}{" "}
            <span className="whitespace-nowrap">({ticket.bundle.name})</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gtd-secondary-20">
            <TicketQr id={ticket.id} width={256} margin={0} />
            <hr className="my-3" />
            <h3 className="text-gtd-primary-20 text-xl font-medium mb-2">
              Ticket Info
            </h3>
            <div className="grid grid-cols-[0fr_1fr] gap-x-4 gap-y-2 text-left">
              <p>Name</p>
              <p className="text-gtd-primary-30">{ticket.name}</p>
              <p>Email</p>
              <p className="text-gtd-primary-30">{ticket.email}</p>
              <p>Purchased</p>
              <p className="text-gtd-primary-30">{createdLabel}</p>
              <p className="col-span-2 text-right text-gtd-secondary-10 italic text-xs">
                ID: {ticket.id}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
