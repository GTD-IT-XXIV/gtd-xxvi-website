import Link from "next/link";
import { redirect } from "next/navigation";

import DashboardLoginForm from "@/app/dashboard/_components/dashboard-login-form";

import { Separator } from "@/components/ui/separator";

import { getPageSession } from "@/server/auth";

export default async function DashboardLoginPage() {
  const session = await getPageSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <article className="py-6 px-4 space-y-3">
      <header className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Login
        </h1>
        <p className="font-medium">
          Don&apos;t have an account?{" "}
          <Link
            href="/dashboard/signup"
            className="hover:underline underline-offset-4 text-blue-600"
          >
            Sign Up
          </Link>
        </p>
      </header>
      <Separator />
      <DashboardLoginForm className="px-3" />
    </article>
  );
}
