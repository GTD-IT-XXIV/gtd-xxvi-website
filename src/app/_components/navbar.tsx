"use client";

import { type VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LuMenu as Menu, LuX as X } from "react-icons/lu";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import logoGTD from "@/assets/images/logo-gtd-black-transparent.png";
import logoGTDTopi from "@/assets/images/logo-gtd-white-transparent-topi.png";

import NavbarButton from "./navbar-button";

const navbarVariants = cva(
  "w-full flex flex-wrap justify-between md:justify-start items-center drop-shadow",
  {
    variants: {
      variant: {
        default: "bg-white",
        gtdfest: "bg-slate-900 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const sidebarVariants = cva(
  "absolute z-50 right-0 top-0 h-screen p-2 rounded-l-xl",
  {
    variants: {
      variant: {
        default: "bg-white",
        gtdfest: "bg-slate-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type NavbarProps = {
  className?: string;
} & VariantProps<typeof navbarVariants>;

export default function Navbar({ className, variant }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.includes("gtdfest")) {
    variant = "gtdfest";
  }

  return (
    <nav className={cn(navbarVariants({ variant }), className)}>
      {variant === "gtdfest" ? (
        <Link href="/">
          <Image
            src={logoGTDTopi}
            alt="Logo PINTU Get Together Day"
            className="h-8 w-12 mx-[1.9rem] mb-[1.4rem] mt-3 object-cover"
          />
        </Link>
      ) : (
        <Link href="/">
          <Image
            src={logoGTD}
            alt="Logo PINTU Get Together Day"
            className="h-16 w-16 mx-6 object-cover"
          />
        </Link>
      )}
      <div className="hidden md:flex gap-1">
        {ROUTES.map((route) => (
          <NavbarButton
            key={route.name}
            variant={variant}
            size="sm"
            href={route.path}
            label={route.name}
            icon={route.icon}
            selected={pathname === route.path}
            className="w-auto justify-center"
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="mx-6 md:hidden"
      >
        {open ? <X className="size-8" /> : <Menu className="size-8" />}
      </button>
      <hr className="basis-full h-0 m-0 border-0" />
      {open && (
        <div className="relative md:hidden">
          <div className={cn(sidebarVariants({ variant }))}>
            {ROUTES.map((route) => (
              <NavbarButton
                key={route.name}
                variant={variant}
                href={route.path}
                label={route.name}
                icon={route.icon}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
