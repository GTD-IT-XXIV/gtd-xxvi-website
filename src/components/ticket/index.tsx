"use client";

import { api } from "@/lib/trpc/client";

import TicketContent from "../ticket-content";
import TicketQr from "../ticket-qr";

export type TicketProps = {
  id: string;
};
export default function Ticket({ id }: TicketProps) {
  const {
    data: ticket,
    isLoading,
    isError,
  } = api.ticket.getDetailsById.useQuery({ id });
  console.log({ ticket });

  return (
    <section className="grow md:grow-0 flex border border-zinc-300 bg-white rounded-lg text-gtd-secondary-20">
      <div className="p-2 blur-sm opacity-65 hover:blur-0 hover:opacity-100 transition my-auto">
        <TicketQr id={id} width={96} margin={2} />
      </div>
      {!isLoading && !isError && <TicketContent ticket={ticket} />}
    </section>
  );
}
