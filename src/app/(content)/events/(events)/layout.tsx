import { type ReactNode } from "react";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="flex-1">{children}</section>
    </>
  );
}
