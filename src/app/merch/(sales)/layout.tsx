import { type ReactNode } from "react";

import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";

import MerchCartCleaner from "./_components/merch-cart-cleaner";

export default function MerchLayout({ children }: { children: ReactNode }) {
  return (
    <MerchCartCleaner>
      <main className="relative flex flex-col min-h-screen">
        <Navbar className="sticky top-0 z-10" />
        <section className="flex-1 flex flex-col">{children}</section>
        <Toaster />
      </main>
    </MerchCartCleaner>
  );
}
