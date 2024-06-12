import { type ReactNode } from "react";

import Navbar from "@/app/_components/navbar";
import NavbarTabs from "@/app/_components/navbar-tabs";

import Footer from "@/components/footer";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex flex-col min-h-screen bg-slate-900">
      <Navbar className="z-10 sticky top-0 hidden md:flex" />
      {children}
      <Footer />
      <NavbarTabs className="z-10 sticky bottom-0 md:hidden" />
    </main>
  );
}
