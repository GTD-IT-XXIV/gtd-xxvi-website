import { type VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { type IconType } from "react-icons/lib";
import { type Url } from "url";

import { cn } from "@/lib/utils";

const navbarTabsButtonVariants = cva(
  "flex-1 text-xs hover:bg-white/25 hover:text-inherit transition",
  {
    variants: {
      variant: {
        default: "hover:bg-accent",
        gtdfest: "hover:bg-white/25",
      },
      selected: {
        true: "text-gtd-primary-30 hover:text-gtd-primary-30 font-semibold",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      selected: false,
    },
  },
);

export type NavbarTabsButtonProps = {
  href: string | Url;
  label: string;
  icon: IconType;
  className?: string;
} & VariantProps<typeof navbarTabsButtonVariants>;

export default function NavbarTabsButton({
  href,
  label,
  icon,
  className = "",
  variant,
  selected,
}: NavbarTabsButtonProps) {
  const Icon = icon;
  return (
    <Link
      href={href}
      className={cn(navbarTabsButtonVariants({ variant, selected }), className)}
    >
      <button className="w-full flex flex-col justify-center items-center py-2 px-2 truncate gap-1">
        <Icon className="size-4" />
        {label}
      </button>
    </Link>
  );
}
