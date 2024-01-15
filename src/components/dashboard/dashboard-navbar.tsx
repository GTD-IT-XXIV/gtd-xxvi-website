import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import logoGTD from "../../../public/static/images/logo-gtd-black-transparent.png";
import DashboardLogoutButton from "./dashboard-logout-button";

export type DashboardNavbarProps = {
  authenticated?: boolean;
  className?: string;
};

export default function DashboardNavbar({
  className,
  authenticated,
}: DashboardNavbarProps) {
  return (
    <nav
      className={cn(
        "flex relative items-center border-b border-slate-300",
        authenticated ? "justify-between" : "justify-start",
        className,
      )}
    >
      <Link href="/dashboard" className="h-12 w-16 mx-2">
        <Image
          src={logoGTD}
          alt="Logo PINTU Get Together Day"
          className="h-full w-full object-cover"
        />
      </Link>
      {authenticated ? (
        <DashboardLogoutButton className="my-2 mx-3" />
      ) : (
        <h1 className="tracking-tight text-2xl font-semibold">Dashboard</h1>
      )}
    </nav>
  );
}
