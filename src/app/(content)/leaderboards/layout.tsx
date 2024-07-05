import { type Metadata } from "next";
import { type ReactNode } from "react";

import { Toaster } from "@/app/_components/ui/toaster";

export const metadata: Metadata = {
  title: "Leaderboards",
};

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="flex-1">{children}</section>
      <Toaster />
    </>
  );
}
