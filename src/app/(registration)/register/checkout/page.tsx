"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";

import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";

import { checkoutSessionAtom } from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";
import { getStripe } from "@/lib/utils";

const stripePromise = getStripe();

export default function CheckoutPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useAtom(checkoutSessionAtom);
  const [cancelling, setCancelling] = useState(false);
  const {
    data: session,
    isLoading,
    isError,
  } = api.payment.retrieveCheckoutSession.useQuery(
    { sessionId },
    { enabled: !!sessionId },
  );

  const cancelCheckoutSession = api.payment.cancelCheckoutSession.useMutation();

  async function cancelCheckout() {
    setCancelling(true);
    await cancelCheckoutSession.mutateAsync({ sessionId });
    setSessionId("");
    setCancelling(false);
    router.back();
  }

  return (
    <section className="px-5 pt-10">
      <hgroup className="flex items-center justify-between mb-4">
        <h1 className="text-gtd-primary-30 font-semibold text-3xl">Checkout</h1>
        {!isLoading && !isError && (
          <Button
            type="button"
            disabled={cancelling}
            variant="destructive"
            size="sm"
            onClick={cancelCheckout}
          >
            {cancelling && (
              <LoadingSpinner className="size-4 text-white/25 fill-white mr-2" />
            )}
            Cancel
          </Button>
        )}
      </hgroup>
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
