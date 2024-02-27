import Ticket from "./ticket";

export type TicketsProps = {
  ticketIds: string[];
};

export default function Tickets({ ticketIds }: TicketsProps) {
  return (
    <section>
      {ticketIds.map((id) => (
        <Ticket key={id} id={id} />
      ))}
    </section>
  );
}
