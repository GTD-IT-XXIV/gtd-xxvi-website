"use client";

import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

import { checkoutSessionAtom } from "@/lib/atoms/events-registration";
import { useHasMounted } from "@/lib/hooks";

export default function CheckoutWrapper({ children }: { children: ReactNode }) {
  const hasMounted = useHasMounted();
  const router = useRouter();
  const sessionId = useAtomValue(checkoutSessionAtom);

  if (hasMounted && sessionId) {
    router.replace("/register/checkout");
  }

  return children;
}
