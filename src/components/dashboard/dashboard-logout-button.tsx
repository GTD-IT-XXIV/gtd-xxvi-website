import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import { signOut } from "@/server/auth";

export type DashboardLogoutButtonProps = {
  className?: string;
};

export default async function DashboardLogoutButton({
  className,
}: DashboardLogoutButtonProps) {
  async function logoutDashboard() {
    "use server";
    await signOut();
    redirect("/dashboard");
  }
  return (
    <form action={logoutDashboard}>
      <Button type="submit" size="sm" className={className}>
        Logout
      </Button>
    </form>
  );
}
