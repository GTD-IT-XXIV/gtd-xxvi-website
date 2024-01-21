import Link from "next/link";
import { redirect } from "next/navigation";

import DashboardSignupForm from "@/components/dashboard/dashboard-signup-form";
import { Separator } from "@/components/ui/separator";

import { getPageSession } from "@/server/auth";

export default async function DashboardSignupPage() {
  const session = await getPageSession();
  // const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <article className="py-6 px-4 space-y-3">
      <header className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Sign Up
        </h1>
        <p className="font-medium">
          Already have an account?{" "}
          <Link
            href="/dashboard/login"
            className="hover:underline underline-offset-4 text-blue-600"
          >
            Log In
          </Link>
        </p>
      </header>
      <Separator />
      <DashboardSignupForm className="px-3" />
    </article>
  );
}
