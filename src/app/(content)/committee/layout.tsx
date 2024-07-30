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
      name: "Committee",
    },
  ] satisfies ListItem[],
};

export const metadata: Metadata = {
  title: "Committee",
  alternates: {
    canonical: `${BASE_URL}/committee`,
  },
  openGraph: {
    siteName: "PINTU GTD",
    url: `${BASE_URL}/committee`,
    type: "website",
    images: [
      {
        url: `${BASE_URL}/opengraph-image.png`,
        width: 1000,
        height: 1000,
        alt: "Logo PINTU Get Together Day",
      },
    ],
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
    </>
  );
}
