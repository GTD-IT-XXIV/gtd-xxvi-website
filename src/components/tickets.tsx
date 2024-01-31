import Ticket from "./ticket";

export type TicketsProps = {
  ticketIds: string[];
};

export default function Tickets({ ticketIds }: TicketsProps) {
  return (
    <section className="flex flex-wrap gap-4">
      {ticketIds.map((id) => (
        <Ticket key={id} id={id} />
      ))}
    </section>
  );
}
