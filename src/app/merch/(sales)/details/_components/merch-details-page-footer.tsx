"use client";

import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

import MerchFooterLayout from "@/app/merch/(sales)/_components/merch-footer-layout";

import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";

import { allowMerchCheckoutAtom } from "@/lib/atoms/merch";

export default function MerchDetailsPageFooter({
  className = "",
}: {
  className?: string;
}) {
  const router = useRouter();
  const { formState } = useFormContext();
  const allowCheckout = useAtomValue(allowMerchCheckoutAtom);

  return (
    <MerchFooterLayout
      className={className}
      backButton={
        <Button
          type="button"
          onClick={() => router.back()}
          variant="outline"
          className="px-7 border-gtd-primary-30 hover:bg-gtd-primary-30/10"
        >
          Back
        </Button>
      }
      nextButton={
        <Button
          type="submit"
          disabled={!allowCheckout || formState.isSubmitting}
          className="bg-gtd-primary-30 hover:bg-gtd-primary-30/85"
        >
          {formState.isSubmitting && (
            <LoadingSpinner className="size-4 text-white/25 fill-white mr-2" />
          )}
          Place Order
        </Button>
      }
    />
  );
}
