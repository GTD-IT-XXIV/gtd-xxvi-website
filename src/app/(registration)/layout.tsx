import { type ReactNode } from "react";

import Navbar from "@/components/navbar";

export default function RegistrationLaout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar className="sticky top-0" />
      <section className="flex-1">{children}</section>
    </main>
  );
}
