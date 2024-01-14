import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import logoGTD from "../../../public/static/images/logo-gtd-black-transparent.png";

export type DashboardNavbarProps = {
  className?: string;
};

export default function DashboardNavbar({ className }: DashboardNavbarProps) {
  return (
    <nav
      className={cn(
        "flex relative justify-between items-center border-b border-slate-300",
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
      <Button type="button" size="sm" className="my-2 mx-3" asChild>
        <Link href="/dashboard/login">Login</Link>
      </Button>
    </nav>
  );
}
