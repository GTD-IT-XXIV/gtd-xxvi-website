"use client";

import { useAtomValue } from "jotai";
import Link from "next/link";

import MerchFooterLayout from "@/app/merch/(sales)/_components/merch-footer-layout";

import { Button } from "@/components/ui/button";

import { merchCartAtom } from "@/lib/atoms/merch";

export default function MerchPageFooter({
  className = "",
}: {
  className?: string;
}) {
  const merchCart = useAtomValue(merchCartAtom);
  const selected = merchCart.reduce((accum, item) => accum + item.quantity, 0);

  return (
    <MerchFooterLayout
      className={className}
      label={`${selected} Selected`}
      nextButton={
        <Link
          href="/merch/details"
          className={selected === 0 ? "pointer-events-none" : undefined}
          aria-disabled={selected === 0}
          tabIndex={selected === 0 ? -1 : undefined}
        >
          <Button
            type="button"
            className="bg-gtd-primary-30 hover:bg-gtd-primary-30/85"
            disabled={selected === 0}
          >
            Checkout
          </Button>
        </Link>
      }
    />
  );
}
