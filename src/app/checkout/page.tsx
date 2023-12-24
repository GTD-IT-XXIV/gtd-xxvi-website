"use client";

import { Elements } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";

import { CheckoutForm } from "@/components/checkout-form";

import { api } from "@/trpc/provider";
import getStripe from "@/utils/get-stripejs";

import { useBoundStore } from "../store";

const stripePromise = getStripe();

export default function App() {
  const stripe = useStripe();
  const { clientSecret, setClientSecret, isLoading, message, setMessage } =
    useBoundStore((state) => state);
  const { mutateAsync: createPaymentIntent } =
    api.payments.createPaymentIntent.useMutation();

  const handleSubmit = async () => {
    try {
      const { clientSecret } = await createPaymentIntent([
        { quantity: 3, bundle_id: 4 },
      ]);

      if (typeof clientSecret === "string") {
        setClientSecret(clientSecret);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
  const options = { clientSecret };

  return (
    <div className="App">
      <button onClick={handleSubmit}>Checkout</button>
      {clientSecret && (
        <>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </>
      )}
      {isLoading && "Loading..."}
      {message}
    </div>
  );
}
