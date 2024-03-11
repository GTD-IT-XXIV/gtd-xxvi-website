import { type ReactNode } from "react";

import Footer from "@/components/footer";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex flex-col min-h-screen">
      {children}
      <Footer />
    </main>
  );
}
