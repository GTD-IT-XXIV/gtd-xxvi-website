"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { checkoutSessionAtom } from "@/lib/atoms/events-registration";
import { errorAtom } from "@/lib/atoms/message";
import { api } from "@/lib/trpc/client";
import { getStripe } from "@/lib/utils";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const stripePromise = getStripe();

export type StripeFormProps = {
  bookingIds: number[];
};

export default function StripeForm({ bookingIds }: StripeFormProps) {
  const [sessionId, setSessionId] = useAtom(checkoutSessionAtom);
  const [clientSecret, setClientSecret] = useState("");
  const setError = useSetAtom(errorAtom);

  const {
    data: session,
    error: sessionError,
    isLoading,
    isError,
  } = api.payment.retrieveCheckoutSession.useQuery(
    { sessionId },
    { enabled: !!sessionId },
  );
  const createCheckoutSession = api.payment.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (!data.clientSecret) {
        setError("Client secret is null");
        return;
      }
      setClientSecret(data.clientSecret);
      setSessionId(data.sessionId);
    },
  });

  useEffect(() => {
    function runEffect() {
      if (isLoading) {
        return;
      }
      if (isError) {
        setError(sessionError.message);
        return;
      }
      if (!session.clientSecret) {
        setError("Client secret is null");
        return;
      }
      setClientSecret(session.clientSecret);
    }

    let ignored = false;
    if (!ignored) {
      runEffect();
    }
    return () => {
      ignored = true;
    };
  }, [session, sessionError, isLoading, isError]);

  function handleClickCheckout() {
    createCheckoutSession.mutate({
      bookingIds,
    });
  }

  return (
    <div>
      <button
        type="button"
        className="p-2 bg-slate-200 hover:bg-slate-100"
        onClick={handleClickCheckout}
      >
        Checkout
      </button>
      {!!clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}
