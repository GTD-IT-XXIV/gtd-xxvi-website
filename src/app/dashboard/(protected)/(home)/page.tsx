import { redirect } from "next/navigation";

import { getPageSession } from "@/server/auth";

import DashboardHomeBody from "./_components/dashboard-home-body";

export default async function DashboardHomePage() {
  const session = await getPageSession();
  if (!session) {
    redirect("/dashboard/login");
  }
  const hasAccess =
    session.user.role === "ADMIN" || session.user.role === "DASHBOARD_USER";

  if (!hasAccess) {
    redirect("/dashboard/scan");
  }
  return <DashboardHomeBody />;
}
