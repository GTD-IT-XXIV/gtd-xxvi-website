import logoGTD from "@/assets/images/logo-gtd-white-transparent.png";
import logoPINTU from "@/assets/images/logo-pintu-white.png";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("p-12 bg-slate-900 text-white space-y-3", className)}>
      <div className="flex items-start">
        <p className="w-1/3 max-w-32 md:text-2xl font-medium">Events</p>
        <div className="flex flex-col py-0.5">
          <Link href="/" className="text-sm md:text-lg">
            GTD Fest x Escape Room
          </Link>
        </div>
      </div>
      <div className="flex items-start">
        <p className="w-1/3 max-w-32 md:text-2xl font-medium">General</p>
        <div className="flex flex-col py-0.5">
          <Link href="/" className="text-sm md:text-lg">
            Committee
          </Link>
          <Link href="/" className="text-sm md:text-lg">
            About Us
          </Link>
        </div>
      </div>
      <hr className="border-slate-500 rounded-full" />
      <div className="flex items-center gap-2 pt-2">
        <Image
          src={logoGTD}
          alt="Logo PINTU Get Together Day"
          className="h-14 w-28 object-cover"
        />
        <div className="space-y-2">
          <div className="text-[1.65rem] md:text-[2.05rem] font-semibold flex gap-2 items-center">
            <Image
              src={logoPINTU}
              alt="Logo PINTU"
              className="h-[1.3rem] md:h-6 w-[5.1rem] md:w-[6rem] object-cover"
            />
            <p>GTD</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="https://www.facebook.com/PINTUGTD/"
              rel="noreferrer noopener"
              target="_blank"
            >
              <Facebook className="size-4 md:size-6" />
            </Link>
            <Link
              href="https://www.facebook.com/PINTUGTD/"
              rel="noreferrer noopener"
              target="_blank"
            >
              <Instagram className="size-4 md:size-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/pintu-gtd/"
              rel="noreferrer noopener"
              target="_blank"
            >
              <Linkedin className="size-4 md:size-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
