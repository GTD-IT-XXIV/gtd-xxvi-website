import { redirect } from "next/navigation";
import { type ReactNode } from "react";

import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import { Toaster } from "@/components/ui/toaster";

import { auth } from "@/server/auth";

export default async function DashboardAuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <DashboardNavbar className="sticky top-0" />
      <section className="flex-1">{children}</section>
      <Toaster />
    </main>
  );
}
