import { env } from "@/env";
import { type Stripe } from "@stripe/stripe-js/";
import { loadStripe } from "@stripe/stripe-js/pure";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (stripePromise === undefined) {
    stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};
