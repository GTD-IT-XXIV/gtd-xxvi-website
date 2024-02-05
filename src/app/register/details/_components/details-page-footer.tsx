"use client";

import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { allowCheckoutAtom } from "@/lib/atoms/events-registration";
import { cn } from "@/lib/utils";

export type DetailsPageFooterProps = {
  className?: string;
  formEl: HTMLFormElement;
};

export default function DetailsPageFooter({
  className = "",
  formEl,
}: DetailsPageFooterProps) {
  const router = useRouter();
  const { trigger, formState } = useFormContext();
  const allowCheckout = useAtomValue(allowCheckoutAtom);
  const [open, setOpen] = useState(false);
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

        <AlertDialog open={open}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Place Your Order(s)?</AlertDialogTitle>
              <AlertDialogDescription>
                Please make sure your booking is correct. After placing order,
                you will not be able to make changes or cancel your bookings for
                <strong className="font-bold"> 30 minutes</strong>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  type="submit"
                  disabled={!allowCheckout || formState.isSubmitting}
                  className="bg-gtd-primary-30 hover:bg-gtd-primary-30/85"
                  onClick={() => {
                    formEl?.requestSubmit();
                    setOpen(false);
                  }}
                >
                  {formState.isSubmitting && (
                    <LoadingSpinner className="size-4 text-white/25 fill-white mr-2" />
                  )}
                  Place Order
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          type="button"
          disabled={!allowCheckout || formState.isSubmitting}
          className="bg-gtd-primary-30 hover:bg-gtd-primary-30/85"
          onClick={async () => {
            if (await trigger()) {
              setOpen(true);
            }
          }}
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
