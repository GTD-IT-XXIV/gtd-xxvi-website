"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useAtom } from "jotai";
import { type Metadata } from "next";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { bookingIdsAtom } from "@/lib/atoms/events-registration";
import { api } from "@/lib/trpc/client";
import { getStripe } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Checkout",
};

const stripePromise = getStripe();

/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/56 GitHub Issue}
 */
export default function CheckoutPage() {
  const [bookingIds] = useAtom(bookingIdsAtom);
  const { mutateAsync } = api.payment.createCheckoutSession.useMutation();
  const [clientSecret, setClientSecret] = useState("");
  const handleCheckout = async () => {
    try {
      const { clientSecret } = await mutateAsync({ bookingIds });
      setClientSecret(clientSecret!);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section>
      <h1 className="text-gtd-primary-30 font-semibold text-3xl">Checkout</h1>
      <Button onClick={handleCheckout}>Pay now</Button>
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </section>
  );
}
