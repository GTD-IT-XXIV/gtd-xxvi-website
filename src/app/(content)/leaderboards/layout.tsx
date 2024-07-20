import { type Metadata } from "next";
import { type ReactNode } from "react";
import type { BreadcrumbList, ListItem, WithContext } from "schema-dts";

import { Toaster } from "@/app/_components/ui/toaster";

import { BASE_URL } from "@/lib/constants";

const breadcrumb: WithContext<BreadcrumbList> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Leaderboards",
    },
  ] satisfies ListItem[],
};

export const metadata: Metadata = {
  title: "Leaderboards",
  openGraph: {
    siteName: "PINTU GTD",
    url: `${BASE_URL}/leaderboards`,
    type: "website",
  },
};

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="flex-1">{children}</section>
      <Toaster />
    </>
  );
}
