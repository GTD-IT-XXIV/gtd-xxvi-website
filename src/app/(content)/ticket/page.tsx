"use client";

import { z } from "zod";

import Tickets from "@/components/tickets";

import { api } from "@/lib/trpc/client";

export default function TicketPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const sessionId = z.string().safeParse(searchParams.session_id);
  const { data: session, isLoading } =
    api.payment.retrieveCheckoutSession.useQuery(
      { sessionId: sessionId.success ? sessionId.data : "" },
      { enabled: sessionId.success },
    );

  const {
    data: tickets,
    isLoading: isTicketsLoading,
    isError: isTicketsError,
  } = api.ticket.getManyByPaymentIntent.useQuery(
    { paymentIntentId: String(session?.paymentIntentId) },
    {
      enabled: !!session?.paymentIntentId,
      refetchInterval: (data) => !data && 2000,
    },
  );

  return (
    <main>
      <h1 className="text-2xl font-semibold">Ticket Page</h1>
      {!isLoading && !!session ? (
        <>
          <p>Payment Status: {session.status}</p>
          <p>Customer Email {session.customerEmail}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {isTicketsLoading && <p>Tickets Loading...</p>}
      {!isTicketsLoading && !isTicketsError && (
        <Tickets ticketIds={tickets.map((ticket) => ticket.id)} />
      )}
    </main>
  );
}
