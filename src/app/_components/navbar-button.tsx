import { type VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { type IconType } from "react-icons/lib";
import { type Url } from "url";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const navbarButtonVariants = cva(
  "justify-start w-48 hover:bg-white/25 hover:text-inherit",
  {
    variants: {
      variant: {
        default: "hover:bg-accent",
        gtdfest: "hover:bg-white/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type NavbarButtonProps = {
  href: string | Url;
  label: string;
  icon: IconType;
  className?: string;
  size?: "icon" | "default" | "sm" | "lg";
} & VariantProps<typeof navbarButtonVariants>;

export default function NavbarButton({
  href,
  label,
  icon,
  className = "",
  size = "default",
  variant,
}: NavbarButtonProps) {
  const Icon = icon;
  return (
    <Link href={href}>
      <Button
        size={size}
        variant="ghost"
        className={cn(navbarButtonVariants({ variant }), className)}
      >
        <Icon className="mr-2 size-4" />
        {label}
      </Button>
    </Link>
  );
}
