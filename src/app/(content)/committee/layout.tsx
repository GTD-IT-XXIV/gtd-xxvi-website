import { type Metadata } from "next";
import { type ReactNode } from "react";
import type { BreadcrumbList, ListItem, WithContext } from "schema-dts";

const breadcrumb: WithContext<BreadcrumbList> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Committee",
    },
  ] satisfies ListItem[],
};

export const metadata: Metadata = {
  title: "Committee",
};

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="flex-1">{children}</section>
    </>
  );
}
