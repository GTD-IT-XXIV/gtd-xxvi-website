import Link from "next/link";

import DashboardSignupForm from "@/components/dashboard-signup-form";

export default function DashboardSignupPage() {
  return (
    <article className="py-6 px-4 space-y-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Sign Up
      </h1>
      <DashboardSignupForm className="px-3" />
      <aside className="border border-slate-300 bg-white rounded-lg drop-shadow py-3 px-4 mx-3">
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            href="/dashboard/login"
            className="hover:underline underline-offset-4 text-blue-600"
          >
            Log in here!
          </Link>
        </p>
      </aside>
    </article>
  );
}
