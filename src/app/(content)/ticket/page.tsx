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
  const { data: session } = api.payment.retrieveCheckoutSession.useQuery(
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
    <main className="py-10 px-5 md:px-[3.75rem] lg:px-28 min-h-screen">
      <h1 className="text-gtd-primary-30 text-3xl font-semibold mb-4 md:mb-6">
        Your Tickets
      </h1>
      {!isTicketsLoading && !isTicketsError && (
        <Tickets ticketIds={tickets.map((ticket) => ticket.id)} />
      )}
    </main>
  );
}
