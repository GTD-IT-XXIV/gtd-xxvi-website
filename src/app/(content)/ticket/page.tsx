"use client";

import { useSearchParams } from "next/navigation";

import { api } from "@/lib/trpc/client";

export default function TicketPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { data: session, isLoading } =
    api.payment.retrieveCheckoutSession.useQuery(
      { sessionId: sessionId! },
      { enabled: !!sessionId },
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
    </main>
  );
}
