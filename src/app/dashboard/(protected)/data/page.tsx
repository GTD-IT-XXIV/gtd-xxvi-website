import { redirect } from "next/navigation";

import { getPageSession } from "@/server/auth";

/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/47 GitHub Issue}
 */
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
  return <p>Dashboard Data Page</p>;
}
