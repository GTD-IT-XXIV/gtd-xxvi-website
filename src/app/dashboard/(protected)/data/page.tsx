import { redirect } from "next/navigation";

import { auth } from "@/server/auth";

import DashboardDataPageBody from "./body";

/**
 * See {@link https://github.com/GTD-IT-XXIV/gtd-xxvi-website/issues/47 GitHub Issue}
 */

export default async function DashboardDataPage() {
  const session = await auth();
  const hasAccess =
    session?.user &&
    (session.user.role === "ADMIN" || session.user.role === "DASHBOARD_USER");

  if (!hasAccess) {
    redirect("/dashboard");
  }

  return (
    <div>
      <DashboardDataPageBody />
    </div>
  );
}
