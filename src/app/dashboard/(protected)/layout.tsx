import { redirect } from "next/navigation";
import { type ReactNode } from "react";

import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import DashboardTabs from "@/components/dashboard/dashboard-tabs";

import { auth } from "@/server/auth";

export default async function DashboardContentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const hasDashboardAccess = session?.user && session.user.role !== "USER";
  if (!hasDashboardAccess) {
    redirect("/dashboard/login");
  }
  return (
    <main className="flex flex-col min-h-screen">
      <DashboardNavbar
        className="sticky top-0"
        authenticated={hasDashboardAccess}
      />
      <section className="flex-1">
        {children} {JSON.stringify(session)}
      </section>
      <DashboardTabs />
    </main>
  );
}
