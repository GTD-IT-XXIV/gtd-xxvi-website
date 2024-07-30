import { type Metadata } from "next";
import { Suspense } from "react";
import type { BreadcrumbList, ListItem, WithContext } from "schema-dts";

import { BASE_URL } from "@/lib/constants";

import TopSection from "../../(home)/_components/top-section";
import GTDSection from "./_components/gtd-section";
import PastEvents from "./_components/past-events";

const breadcrumb: WithContext<BreadcrumbList> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Events",
    },
  ] satisfies ListItem[],
};

export const metadata: Metadata = {
  title: "Events",
  alternates: {
    canonical: `${BASE_URL}/events`,
  },
  openGraph: {
    siteName: "PINTU GTD",
    url: `${BASE_URL}/events`,
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

export default async function EventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section>
        <TopSection />
        <GTDSection className="mx-auto w-full sm:w-1/2" />
        <Suspense>
          <PastEvents />
        </Suspense>
      </section>
    </>
  );
}
