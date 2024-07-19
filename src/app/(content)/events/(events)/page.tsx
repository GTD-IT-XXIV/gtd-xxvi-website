import { type Metadata } from "next";
import { Suspense } from "react";
import type { BreadcrumbList, ListItem, WithContext } from "schema-dts";

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
