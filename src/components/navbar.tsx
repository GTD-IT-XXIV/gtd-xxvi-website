import { cn } from "@/lib/utils";

export type NavbarProps = {
  className?: string;
};

export default function Navbar({ className }: NavbarProps) {
  return <nav className={cn("", className)}>Navbar goes here</nav>;
}
