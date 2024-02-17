import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

import MerchTotalPrice from "./merch-total-price";

export type MerchFooterLayoutProps = {
  label?: string;
  backButton?: ReactNode;
  nextButton: ReactNode;
  className?: string;
};

export default function MerchFooterLayout({
  label = "Total Price",
  backButton,
  nextButton,
  className = "",
}: MerchFooterLayoutProps) {
  return (
    <footer
      className={cn(
        "bg-white flex md:flex-col gap-4 justify-between items-center md:items-end py-2 md:py-4 px-5 md:mb-32 drop-shadow md:drop-shadow-none",
        className,
      )}
    >
      <section className="md:text-right">
        <h3 className="text-sm text-gtd-secondary-10">{label}</h3>
        <MerchTotalPrice />
      </section>
      <div className="flex gap-2 md:gap-4">
        {backButton}
        {nextButton}
      </div>
    </footer>
  );
}
