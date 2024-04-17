import { type Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Leaderboards",
};

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="flex-1">{children}</section>
    </>
  );
}
