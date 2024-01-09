"use client";

import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import { registrationCompletionAtom } from "@/lib/atoms/events-registration";

export default function CheckoutPage() {
  const router = useRouter();
  const completion = useAtomValue(registrationCompletionAtom);

  // Cmn bisa ke page ini kalau udh book timeslot
  if (!(completion.register && completion.book)) {
    router.back();
  }

  return <main>Checkout Page</main>;
}
