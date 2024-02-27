"use client";

import { Prisma } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export type BundleCardPopupProps = {
  event: {
    name: string;
  };
  bundle: {
    name: string;
    price: Prisma.Decimal;
    details: string[];
  };
};

export default function BundleCardPopup({
  event,
  bundle,
}: BundleCardPopupProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-gtd-primary-30 text-xs hover:underline underline-offset-2 md:text-sm">
        Learn more
      </AlertDialogTrigger>
      <AlertDialogContent className="text-gtd-secondary-30">
        <AlertDialogHeader>
          <AlertDialogTitle asChild>
            <hgroup className="flex justify-between">
              <h2 className="text-gtd-primary-30">
                {event.name} ({bundle.name})
              </h2>
              {bundle.name.toLowerCase() === "individual" ? (
                <div className="flex justify-end">
                  <p className="text-sm self-baseline">$</p>
                  <p className="text-gtd-secondary-20 text-xl font-medium self-baseline">
                    {new Prisma.Decimal(bundle.price).toDP(0).toString()}/
                  </p>
                  <p className="text-gtd-secondary-10 text-sm self-baseline">
                    pax
                  </p>
                </div>
              ) : (
                <div className="flex justify-end">
                  <p className="text-sm self-baseline">$</p>
                  <p className="text-gtd-secondary-20 text-xl font-medium self-baseline">
                    {new Prisma.Decimal(bundle.price).toDP(0).toString()}
                  </p>
                </div>
              )}
            </hgroup>
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="text-gtd-secondary-30 text-left">
              <p className="font-medium">Terms and Conditions:</p>
              <ul className="list-disc pl-5 space-y-0.5 mt-1 mb-2.5">
                {bundle.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <Link
                // href={`/events/${event.id}`}
                href="/"
                rel="noreferrer noopener"
                target="_blank"
                className="text-xs text-gtd-primary-30 hover:underline underline-offset-2 flex items-center gap-1"
              >
                <span>Visit Event Page </span>
                <ExternalLink className="size-3 inline" />
              </Link>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              type="button"
              variant="outline"
              className="text-gtd-secondary-20"
            >
              Close
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
