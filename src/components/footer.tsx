import { cn } from "@/lib/utils";

export type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  return <footer className={cn("", className)}>Footer goes here</footer>;
}
