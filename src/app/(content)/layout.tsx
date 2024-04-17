import { type ReactNode } from "react";

import Navbar from "@/app/_components/navbar";

import Footer from "@/components/footer";

import NavbarTabs from "../_components/navbar-tabs";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar className="z-10 sticky top-0" />
      {children}
      <Footer />
      <NavbarTabs className="z-10 sticky bottom-0 md:hidden" />
    </main>
  );
}
