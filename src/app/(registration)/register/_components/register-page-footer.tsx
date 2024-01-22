"use client";

import { useAtomValue } from "jotai";
import Link from "next/link";

import TotalPrice from "@/components/registration/total-price";
import { Button } from "@/components/ui/button";

import { cartAtom } from "@/lib/atoms/events-registration";
import { cn } from "@/lib/utils";

export type RegisterPageFooterProps = {
  className?: string;
  pageSearchParams: Record<string, string | string[] | undefined>;
};

export default function RegisterPageFooter({
  className = "",
  pageSearchParams = {},
}: RegisterPageFooterProps) {
  const cart = useAtomValue(cartAtom);
  const selected = cart.reduce((accum, item) => accum + item.quantity, 0);
  return (
    <footer
      className={cn(
        "bg-white flex justify-between items-center py-2 px-5 drop-shadow",
        className,
      )}
    >
      <TotalPrice />
      <Link
        href={{
          pathname: "/register/timeslots",
          query: pageSearchParams,
        }}
        className={selected === 0 ? "pointer-events-none" : undefined}
        aria-disabled={selected === 0}
        tabIndex={selected === 0 ? -1 : undefined}
      >
        <Button
          type="button"
          className="bg-gtd-primary-30 hover:bg-gtd-primary-30/85"
          disabled={selected === 0}
        >
          Next Page
        </Button>
      </Link>
    </footer>
  );
}
