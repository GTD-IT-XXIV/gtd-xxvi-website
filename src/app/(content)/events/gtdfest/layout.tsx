import { type Metadata } from "next";
import { type ReactNode } from "react";
import type { BreadcrumbList, ListItem, WithContext } from "schema-dts";

import { BASE_URL } from "@/lib/constants";

const breadcrumb: WithContext<BreadcrumbList> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Events",
      item: `${BASE_URL}/events`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "GTD Fest x Escape Room",
    },
  ] satisfies ListItem[],
};

export const metadata: Metadata = {
  title: "GTD Fest x Escape Room",
};

export default function GTDFestLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="flex-1 bg-slate-900">{children}</section>
    </>
  );
}
