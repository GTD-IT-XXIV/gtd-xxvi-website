import type { Bundle } from "@prisma/client";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useState } from "react";

import { api } from "@/trpc/provider";
import getStripe from "@/utils/get-stripejs";

const stripePromise = getStripe();

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const { mutateAsync: createCheckoutSession } =
    api.payments.createCheckoutSession.useMutation();
  const [clientSecret, setClientSecret] = useState("");
  const options = { clientSecret };
  const handleCheckout = async (quantity: number, bundleID: number) => {
    try {
      const { clientSecret } = await createCheckoutSession({
        quantity,
        bundle_id: bundleID,
        timeslot_id: 1, // needs to be passed when selecting timeslot
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
      <div id="checkout">
        {clientSecret && (
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </div>
    </div>
  );
}
