import { type ReactNode } from "react";

import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";

export default function RegistrationLaout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar className="sticky top-0" />
      <section className="flex-1 flex flex-col">{children}</section>
      <Toaster />
    </main>
  );
}