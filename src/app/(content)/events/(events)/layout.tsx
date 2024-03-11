import { type ReactNode } from "react";

import Navbar from "@/components/navbar";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar className="z-10 sticky top-0" />
      <section className="flex-1">{children}</section>
    </>
  );
}
