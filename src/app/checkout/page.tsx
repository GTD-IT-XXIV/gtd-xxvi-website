"use client";

import { useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";

import { BundleCard } from "@/components/bundle-card";

import { api } from "@/trpc/provider";

import { useBoundStore } from "../store";

export default function App() {
  const stripe = useStripe();
  const { isLoading, message, setMessage } = useBoundStore();
  const { data: bundles } = api.bundles.getBundlesByEvent.useQuery(1);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) {
      return;
    }

    const getPaymentStatus = async () => {
      const { paymentIntent } =
        await stripe.retrievePaymentIntent(clientSecret);
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    };
    void getPaymentStatus();
  }, [stripe]);

  return (
    <div className="App">
      {isLoading && "Loading..."}
      {message}
      <h1>Bundles</h1>
      {bundles?.map((bundle) => <BundleCard key={bundle.id} bundle={bundle} />)}
    </div>
  );
}
