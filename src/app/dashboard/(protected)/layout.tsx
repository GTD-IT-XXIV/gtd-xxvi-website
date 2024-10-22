import { redirect } from "next/navigation";
import { type ReactNode } from "react";

import DashboardNavbar from "@/app/dashboard/_components/dashboard-navbar";
import DashboardTabs from "@/app/dashboard/_components/dashboard-tabs";

import { getPageSession } from "@/server/auth";

export default async function DashboardContentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getPageSession();
  if (!session) {
    redirect("/dashboard/login");
  }
  const hasAccess =
    session.user.role === "ADMIN" ||
    session.user.role === "DASHBOARD_USER" ||
    session.user.role === "SCANNER";

  if (!hasAccess) {
    redirect("/dashboard/error");
  }
  return (
    <main className="flex flex-col min-h-screen">
      <DashboardNavbar className="sticky top-0" authenticated={hasAccess} />
      <section className="flex-1 flex flex-col">{children}</section>
      <DashboardTabs />
    </main>
  );
}
