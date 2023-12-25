"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { BundleCard } from "@/components/bundle-card";

import { api } from "@/trpc/provider";

import { useBoundStore } from "../store";

export default function TicketApp() {
  const { isLoading, message } = useBoundStore();
  const { data: bundles } = api.bundles.getBundlesByEvent.useQuery(1);

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<string | null>("");
  const [email, setEmail] = useState<string>("");
  sessionId &&
    api.payments.retrieveCheckoutSession.useQuery(
      {
        session_id: sessionId,
      },
      {
        onSuccess: ({ status, customer_email }) => {
          setStatus(status);
          setEmail(customer_email!);
        },
      },
    );

  return (
    <div className="App">
      <h1>Bundles</h1>
      Status: {isLoading ? "Loading..." : "Idle"}
      {message && `Message: ${message}`}
      {email && `Email: ${email}`}
      {status && `Payment status: ${status}`}
      {bundles?.map((bundle) => <BundleCard key={bundle.id} bundle={bundle} />)}
    </div>
  );
}
