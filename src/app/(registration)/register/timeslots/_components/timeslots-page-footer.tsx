"use client";

import { useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";

import TotalPrice from "@/components/registration/total-price";
import { Button } from "@/components/ui/button";

import { cartAtom } from "@/lib/atoms/events-registration";
import { cn } from "@/lib/utils";

export type TimeslotsPageFooterProps = {
  className?: string;
  pageSearchParams?: Record<string, string | string[] | undefined>;
};

export default function TimeslotsPageFooter({
  className = "",
  pageSearchParams = {},
}: TimeslotsPageFooterProps) {
  const router = useRouter();
  const cart = useAtomValue(cartAtom);
  const disabled = cart.some((item) => item.timeslotId === 0);
  return (
    <footer
      className={cn(
        "bg-white flex justify-between items-center py-2 px-5 drop-shadow",
        className,
      )}
    >
      <TotalPrice />
      <div className="flex gap-2">
        <Link
          href={{
            pathname: "/register",
            query: pageSearchParams,
          }}
        >
          <Button
            type="button"
            onClick={() => router.back()}
            variant="outline"
            className="px-7 border-gtd-primary-30 hover:bg-gtd-primary-30/10"
          >
            Back
          </Button>
        </Link>
        <Link
          href={{
            pathname: "/register/details",
            query: pageSearchParams,
          }}
          className={disabled ? "pointer-events-none" : undefined}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
        >
          <Button
            type="button"
            className="bg-gtd-primary-30 hover:bg-gtd-primary-30/85"
            disabled={disabled}
          >
            Next Page
          </Button>
        </Link>
      </div>
    </footer>
  );
}
