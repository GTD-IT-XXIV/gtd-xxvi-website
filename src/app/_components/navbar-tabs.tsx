"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import NavbarTabsButton from "./navbar-tabs-button";

const navbarTabsVariants = cva("w-full flex overflow-x-auto", {
  variants: {
    variant: {
      default: "bg-white",
      gtdfest: "bg-slate-900 text-white",
      dark: "bg-slate-900 text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type NavbarTabsProps = {
  className?: string;
} & VariantProps<typeof navbarTabsVariants>;

export default function NavbarTabs({ className, variant }: NavbarTabsProps) {
  const pathname = usePathname();

  if (pathname.includes("gtdfest")) {
    variant = "gtdfest";
  }

  return (
    <nav className={cn(navbarTabsVariants({ variant }), className)}>
      {ROUTES.map((route) => (
        <NavbarTabsButton
          key={route.name}
          variant={variant}
          label={route.name}
          href={route.path}
          icon={route.icon}
          selected={pathname === route.path}
        />
      ))}
    </nav>
  );
}
