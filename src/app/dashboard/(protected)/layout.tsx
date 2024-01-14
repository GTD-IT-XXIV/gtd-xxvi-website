import { type ReactNode } from "react";

import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import DashboardTabs from "@/components/dashboard/dashboard-tabs";

export default function DashboardContentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <DashboardNavbar className="sticky top-0" />
      <section className="flex-1">{children}</section>
      <DashboardTabs />
    </main>
  );
}
