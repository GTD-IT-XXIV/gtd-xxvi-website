"use client";

import { Elements } from "@stripe/react-stripe-js";

import getStripe from "@/utils/get-stripejs";

const stripePromise = getStripe();

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
