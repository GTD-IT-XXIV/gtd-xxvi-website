"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useAtom } from "jotai";
import { useEffect } from "react";

import LoadingSpinner from "@/components/loading-spinner";

import { checkoutSessionAtom } from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";
import { getStripe } from "@/lib/utils";

const stripePromise = getStripe();

export default function CheckoutPage() {
  const [sessionId, setSessionId] = useAtom(checkoutSessionAtom);
  const {
    data: session,
    isLoading,
    isFetching,
    isError,
  } = api.payment.retrieveCheckoutSession.useQuery(
    { sessionId },
    { enabled: !!sessionId },
  );

  useEffect(() => {
    function runEffect() {
      if (session?.status === "expired" || session?.status === "complete") {
        setSessionId("");
      }
    }
    let ignored = false;
    if (!ignored) {
      runEffect();
    }
    return () => {
      ignored = true;
    };
  }, [session]);

  return (
    <section className="px-5 pt-10">
      <hgroup className="flex items-center justify-between md:px-10 lg:px-[5.75rem] mb-4">
        <h1 className="text-gtd-primary-30 font-semibold text-3xl">Checkout</h1>
      </hgroup>
      {!isLoading && !isError && session.clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret: session.clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
      {isFetching && (
        <div className="absolute inset-0 flex justify-center items-center">
          <LoadingSpinner className="fill-gtd-primary-30 size-48" />
        </div>
      )}
      {!sessionId && (
        <p className="text-center text-sm text-gtd-secondary-10">
          No items to checkout
        </p>
      )}
    </section>
  );
}
