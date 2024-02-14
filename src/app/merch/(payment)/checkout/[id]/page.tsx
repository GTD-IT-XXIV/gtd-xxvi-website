"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

import MerchGenericLayout from "@/app/merch/_components/merch-generic-layout";

import LoadingSpinner from "@/components/loading-spinner";

import { api } from "@/lib/trpc/client";
import { getStripe } from "@/lib/utils";

const stripePromise = getStripe();

export default function MerchCheckoutPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    data: session,
    isLoading,
    isFetching,
    isError,
  } = api.payment.retrieveCheckoutSession.useQuery({ sessionId: params.id });

  return (
    <MerchGenericLayout
      title="Checkout"
      body={
        <>
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
        </>
      }
    />
  );
}
