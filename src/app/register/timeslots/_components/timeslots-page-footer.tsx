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
  pageSearchParams: Record<string, string | string[] | undefined>;
};

export default function TimeslotsPageFooter({
  className = "",
  pageSearchParams = {},
}: TimeslotsPageFooterProps) {
  const cart = useAtomValue(cartAtom);
  const selected = cart.reduce((accum, item) => accum + item.quantity, 0);
  const router = useRouter();

  return (
    <>
      {/* Mobile footer */}
      <footer
        className={cn(
          "bg-white flex justify-between items-center py-2 px-5 drop-shadow md:hidden",
          className,
        )}
      >
        <TotalPrice />
        <div className="flex gap-3">
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
              onClick={() => router.back()}
              variant="outline"
              className="px-7 border-gtd-primary-30 hover:bg-gtd-primary-30/10"
            >
              Back
            </Button>
          </Link>
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
        </div>
      </footer>

      {/* Desktop footer */}
      <footer
        className={cn(
          "bg-white hidden md:flex flex-col justify-end items-end py-4 px-[60px] lg:px-28 space-y-4 mb-32",
          className,
        )}
      >
        <TotalPrice />
        <div className="md:flex gap-4">
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
        </div>
      </footer>
    </>
  );
}
