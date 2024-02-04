"use client";

import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

import LoadingSpinner from "@/components/loading-spinner";
import TotalPrice from "@/components/registration/total-price";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  const { formState } = useFormContext();
  const allowCheckout = useAtomValue(allowCheckoutAtom);
  return (
    <footer
      className={cn(
        "bg-white flex justify-between items-center py-2 md:py-4 px-5 md:px-[3.75rem] lg:px-28 drop-shadow md:drop-shadow-none md:flex-col md:items-end md:mb-32 md:space-y-4",
        className,
      )}
    >
      <TotalPrice />
      <div className="flex gap-2 md:gap-4">
        <Button
          type="button"
          onClick={() => router.back()}
          variant="outline"
          className="px-7 border-gtd-primary-30 hover:bg-gtd-primary-30/10"
        >
          Back
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              disabled={!allowCheckout || formState.isSubmitting}
              className="bg-gtd-primary-30 hover:bg-gtd-primary-30/85"
            >
              {formState.isSubmitting && (
                <LoadingSpinner className="size-4 text-white/25 fill-white mr-2" />
              )}
              Place Order
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Place Your Order(s)?</AlertDialogTitle>
              <AlertDialogDescription>
                Please make sure your booking is correct. After placing order,
                you will not be able to make changes or cancel your bookings.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Place Order</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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
      </div>
    </footer>
  );
}
