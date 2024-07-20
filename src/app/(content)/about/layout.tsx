import { type Metadata } from "next";
import { type ReactNode } from "react";
import type {
  BreadcrumbList,
  FAQPage,
  ListItem,
  WithContext,
} from "schema-dts";

import { BASE_URL } from "@/lib/constants";

import { faqdatas } from "./_components/faq-accordion";

const breadcrumb: WithContext<BreadcrumbList> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "About Us",
    },
  ] satisfies ListItem[],
};

const faq: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqdatas.map((faqdata) => ({
    "@type": "Question",
    name: faqdata.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: `<p>${faqdata.answer}</p>`,
    },
  })),
};

export const metadata: Metadata = {
  title: "About Us",
  openGraph: {
    siteName: "PINTU GTD",
    url: `${BASE_URL}/about`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <section className="flex-1">{children}</section>
    </>
  );
}
