import { type Metadata } from "next";
import { type ReactNode } from "react";
import type {
  BreadcrumbList,
  FAQPage,
  ListItem,
  Question,
  WithContext,
} from "schema-dts";

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
