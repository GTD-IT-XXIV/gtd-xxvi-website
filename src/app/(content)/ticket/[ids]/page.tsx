import SuperJSON from "superjson";
import { z } from "zod";

import Tickets from "@/components/tickets";

export default function TicketIdsPage({ params }: { params: { ids: string } }) {
  const ticketIds = z
    .string()
    .array()
    .parse(SuperJSON.parse(atob(params.ids)));

  return <Tickets ticketIds={ticketIds} />;
}
