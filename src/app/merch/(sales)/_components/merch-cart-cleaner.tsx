"use client";

import { useSetAtom } from "jotai";
import { type ReactNode, useEffect } from "react";

import { merchCartAtom } from "@/lib/atoms/merch";

export default function MerchCartCleaner({
  children,
}: {
  children: ReactNode;
}) {
  const setMerchCart = useSetAtom(merchCartAtom);

  useEffect(() => {
    let ignored = false;
    if (!ignored) {
      setMerchCart((prev) => prev.filter((item) => item.quantity > 0));
    }
    return () => {
      ignored = true;
    };
  }, []);

  return children;
}
