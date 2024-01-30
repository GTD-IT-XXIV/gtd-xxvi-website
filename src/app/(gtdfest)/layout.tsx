import { type ReactNode } from "react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar variant="gtdfest" className="z-10 sticky top-0" />
      <section className="flex-1">{children}</section>
      <Footer />
    </main>
  );
}
