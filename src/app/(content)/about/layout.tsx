import { type Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Us",
};

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="flex-1">{children}</section>
    </>
  );
}
