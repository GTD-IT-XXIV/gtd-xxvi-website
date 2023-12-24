import type { Bundle } from "@prisma/client";
import { Elements } from "@stripe/react-stripe-js";

import { useBoundStore } from "@/app/store";

import { api } from "@/trpc/provider";
import getStripe from "@/utils/get-stripejs";

import { CheckoutForm } from "./checkout-form";

const stripePromise = getStripe();

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const { clientSecret, setClientSecret } = useBoundStore();
  const options = { clientSecret };
  const { mutateAsync: createPaymentIntent } =
    api.payments.createPaymentIntent.useMutation();

  const handleCheckout = async (quantity: number, bundleID: number) => {
    try {
      const { clientSecret } = await createPaymentIntent({
        quantity,
        bundle_id: bundleID,
      });

      if (typeof clientSecret === "string") {
        setClientSecret(clientSecret);
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
            <CheckoutForm />
          </Elements>
        </>
      )}
    </div>
  );
}
