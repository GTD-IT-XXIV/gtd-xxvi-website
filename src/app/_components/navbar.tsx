"use client";

import { type VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import logoGTD from "@/assets/images/logo-gtd-black-transparent.png";
import logoGTDTopi from "@/assets/images/logo-gtd-white-transparent-topi.png";

import NavbarButton from "./navbar-button";

const navbarVariants = cva(
  "w-full flex flex-wrap justify-center md:justify-start items-center drop-shadow",
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

export type NavbarProps = {
  className?: string;
} & VariantProps<typeof navbarVariants>;

export default function Navbar({ className, variant }: NavbarProps) {
  const pathname = usePathname();

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
            className="w-auto justify-center"
          />
        ))}
      </div>
    </nav>
  );
}
