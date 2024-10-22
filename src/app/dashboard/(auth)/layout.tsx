import { type ReactNode } from "react";

import DashboardNavbar from "@/app/dashboard/_components/dashboard-navbar";

export default async function DashboardAuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <DashboardNavbar className="sticky top-0" />
      <section className="flex-1">{children}</section>
    </main>
  );
}
