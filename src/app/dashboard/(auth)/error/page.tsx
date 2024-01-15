import { redirect } from "next/navigation";

import DashboardLogoutButton from "@/components/dashboard/dashboard-logout-button";

import { auth } from "@/server/auth";

export default async function DashboardAuthErrorPage() {
  const session = await auth();
  if (!session) {
    redirect("/dashboard/login");
  }
  const hasAccess =
    session.user.role === "ADMIN" ||
    session.user.role === "DASHBOARD_USER" ||
    session.user.role === "SCANNER";
  if (hasAccess) {
    redirect("/dashboard");
  }

  return (
    <article className="p-6 space-y-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Access Denied.
      </h1>
      <DashboardLogoutButton />
    </article>
  );
}
