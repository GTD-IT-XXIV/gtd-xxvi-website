"use client";

import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import TotalPrice from "@/components/registration/total-price";
import { Button } from "@/components/ui/button";

import { allowCheckoutAtom } from "@/lib/atoms/events-registration";
import { cn } from "@/lib/utils";

export type DetailsPageFooterProps = {
  className?: string;
};

export default function DetailsPageFooter({
  className = "",
}: DetailsPageFooterProps) {
  const router = useRouter();
  const allowCheckout = useAtomValue(allowCheckoutAtom);
  return (
    <footer
      className={cn(
        "bg-white flex justify-between items-center py-2 px-5 drop-shadow",
        className,
      )}
    >
      <TotalPrice />
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={() => router.back()}
          variant="outline"
          className="px-7 border-gtd-primary-30 hover:bg-gtd-primary-30/10"
        >
          Back
        </Button>

        <Button
          type="submit"
          disabled={!allowCheckout}
          className="bg-gtd-primary-30 hover:bg-gtd-primary-30/85"
        >
          Checkout
        </Button>
      </div>
    </footer>
  );
}
