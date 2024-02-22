import { type ReactNode } from "react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function GTDFestLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar variant="gtdfest" className="z-10 sticky top-0" />
      <section className="flex-1 bg-slate-900">{children}</section>
    </>
  );
}
