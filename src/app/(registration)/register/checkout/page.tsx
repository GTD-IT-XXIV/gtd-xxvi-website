"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useAtomValue } from "jotai";

import LoadingSpinner from "@/components/loading-spinner";

import { checkoutSessionAtom } from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";
import { getStripe } from "@/lib/utils";

const stripePromise = getStripe();

export default function CheckoutPage() {
  const sessionId = useAtomValue(checkoutSessionAtom);
  const {
    data: session,
    isLoading,
    isError,
  } = api.payment.retrieveCheckoutSession.useQuery(
    { sessionId },
    { enabled: !!sessionId },
  );

  return (
    <section className="px-4 pt-6">
      <h1 className="text-gtd-primary-30 font-semibold text-3xl mb-4">
        Checkout
      </h1>
      {!isLoading && !isError && session.clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret: session.clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center">
          <LoadingSpinner className="fill-gtd-primary-30 size-48" />
        </div>
      ) : (
        <p>Error</p>
      )}
    </section>
  );
}
