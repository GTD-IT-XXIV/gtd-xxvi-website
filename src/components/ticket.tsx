export type TicketProps = {
  id: string;
};
export default function Ticket({ id }: TicketProps) {
  return <p>{id}</p>;
}
