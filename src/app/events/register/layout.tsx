import { type ReactNode } from "react";

import { Toaster } from "@/components/ui/toaster";

export default function RegistrationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main>
      <h1 className="text-2xl font-semibold">Registration Page</h1>
      {children}
      <Toaster />
    </main>
  );
}
