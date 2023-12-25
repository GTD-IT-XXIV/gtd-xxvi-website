import type { Bundle } from "@prisma/client";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

import { useBoundStore } from "@/app/store";

import { api } from "@/trpc/provider";
import getStripe from "@/utils/get-stripejs";

const stripePromise = getStripe();

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const { clientSecret, setClientSecret, amount, setAmount } = useBoundStore();
  const options = { clientSecret };
  const { mutateAsync: createCheckoutSession } =
    api.payments.createCheckoutSession.useMutation();
  const handleCheckout = async (quantity: number, bundleID: number) => {
    try {
      const { clientSecret, amount } = await createCheckoutSession({
        quantity,
        bundle_id: bundleID,
        timeslot_id: 1,
        email: "dummy@gmail.com", // needs to be fulfilled
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
      amount: {amount}
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
