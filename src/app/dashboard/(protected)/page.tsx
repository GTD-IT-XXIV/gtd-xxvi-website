import { redirect } from "next/navigation";

import { getPageSession } from "@/server/auth";

/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/52 GitHub Issue}
 */
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
  return <div>Dashboard Page</div>;
}
