import { redirect } from "next/navigation";

import { getPageSession } from "@/server/auth";

import DashboardDataPageBody from "./_components/dashboard-data-page-body";

export default async function DashboardDataPage() {
  const session = await getPageSession();
  if (!session) {
    redirect("/dashboard/login");
  }
  const hasAccess =
    session.user.role === "ADMIN" || session.user.role === "DASHBOARD_USER";

  if (!hasAccess) {
    redirect("/dashboard");
  }

  return (
    <div>
      <DashboardDataPageBody />
    </div>
  );
}
