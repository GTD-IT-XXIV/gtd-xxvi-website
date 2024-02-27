import { env } from "@/env";
import { type Stripe, loadStripe } from "@stripe/stripe-js";
import { type inferRouterOutputs } from "@trpc/server";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { type AppRouter } from "@/server/root";

export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let stripePromise: Promise<Stripe | null>;
export function getStripe() {
  if (stripePromise === undefined) {
    stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
}

type RouterOutputs = inferRouterOutputs<AppRouter>;
type Bundle = ArrElement<RouterOutputs["bundle"]["getManyByEvent"]>;
type Timeslot = ArrElement<RouterOutputs["timeslot"]["getManyByEvent"]>;
export function getBundlesAvailability(
  bundles: Bundle[],
  timeslots: Timeslot[],
): (Bundle & { isAvailable: boolean })[] {
  const totalSlots = timeslots.reduce(
    (sum, timeslot) => (sum += timeslot.remainingSlots),
    0,
  );
  return bundles.map((bundle) => ({
    ...bundle,
    isAvailable:
      bundle.remainingAmount === null ||
      (bundle.remainingAmount > 0 && bundle.quantity <= totalSlots),
  }));
}
