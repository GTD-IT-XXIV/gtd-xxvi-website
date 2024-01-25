"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { TRPCClientError } from "@trpc/client";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import LoadingSpinner from "@/components/loading-spinner";

import { bookingIdsAtom } from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";
import { getStripe } from "@/lib/utils";

const stripePromise = getStripe();

export default function CheckoutPage() {
  const router = useRouter();
  const bookingIds = useAtomValue(bookingIdsAtom);
  const { mutateAsync } = api.payment.createCheckoutSession.useMutation();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function runEffect() {
      try {
        const { clientSecret } = await mutateAsync({ bookingIds });
        setClientSecret(clientSecret!);
      } catch (error) {
        if (
          error instanceof TRPCClientError &&
          error.message === "No bookings to checkout for"
        ) {
          router.back();
        }
        console.error(error);
      }
    }

    let ignored = false;
    if (!ignored) {
      void runEffect();
    }
    return () => {
      ignored = true;
    };
  }, [bookingIds]);

  return (
    <section className="px-4 pt-6">
      <h1 className="text-gtd-primary-30 font-semibold text-3xl mb-4">
        Checkout
      </h1>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : (
        <div className="absolute inset-0 flex justify-center items-center">
          <LoadingSpinner className="fill-gtd-primary-30 size-48" />
        </div>
      )}
    </section>
  );
}
