"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { BundleCard } from "@/components/bundle-card";

import { api } from "@/trpc/provider";

export default function TicketApp() {
  const { data: bundles } = api.bundles.getManyByEvent.useQuery(1);

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<string | null>("");
  const [email, setEmail] = useState<string>("");
  sessionId &&
    api.payments.retrieveCheckoutSession.useQuery(
      {
        sessionId: sessionId,
      },
      {
        onSuccess: ({ status, customerEmail: customer_email }) => {
          setStatus(status);
          setEmail(customer_email!);
        },
      },
    );

  return (
    <div className="App">
      <h1>Bundles</h1>
      {sessionId && (
        <div>
          {email} with payment status: {status}
        </div>
      )}
      {bundles?.map((bundle) => <BundleCard key={bundle.id} bundle={bundle} />)}
    </div>
  );
}
