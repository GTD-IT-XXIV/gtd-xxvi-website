import type { Bundle } from "@prisma/client";
import { Elements } from "@stripe/react-stripe-js";

import { useBoundStore } from "@/app/store";

import { api } from "@/trpc/provider";
import getStripe from "@/utils/get-stripejs";

import { CheckoutForm } from "./checkout-form";

const stripePromise = getStripe();

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const { clientSecret, setClientSecret, amount, setAmount } = useBoundStore();
  const options = { clientSecret };
  const { mutateAsync: createPaymentIntent } =
    api.payments.createPaymentIntent.useMutation();

  const handleCheckout = async (quantity: number, bundleID: number) => {
    try {
      const { clientSecret, amount } = await createPaymentIntent({
        quantity,
        bundle_id: bundleID,
        timeslot_id: 1,
      });

      if (typeof clientSecret === "string") {
        setClientSecret(clientSecret);
        setAmount(amount / 100); // convert from cents to sgd
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="border">
      <div>event: {bundle.eventId}</div>
      <div>price: {String(bundle.price)}</div>
      <div>bundle name: {bundle.name}</div>
      <div>for: {bundle.quantity}</div>
      <button className="border" onClick={() => handleCheckout(1, bundle.id)}>
        buy this bundle
      </button>
      {clientSecret && (
        <>
          <Elements options={options} stripe={stripePromise}>
            <>Pay: {amount}</>
            <CheckoutForm />
          </Elements>
        </>
      )}
    </div>
  );
}
