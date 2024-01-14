import Link from "next/link";

import DashboardLoginForm from "@/components/dashboard/dashboard-login-form";

export default function DashboardLoginPage() {
  return (
    <article className="py-6 px-4 space-y-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Login
      </h1>
      <DashboardLoginForm className="px-3" />
      <aside className="border border-slate-300 bg-white rounded-lg drop-shadow py-3 px-4 mx-3">
        <p className="text-sm">
          No account yet?{" "}
          <Link
            href="/dashboard/signup"
            className="hover:underline underline-offset-4 text-blue-600"
          >
            Sign up here!
          </Link>
        </p>
      </aside>
    </article>
  );
}
