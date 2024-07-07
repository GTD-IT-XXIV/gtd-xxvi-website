import { type HTMLAttributes } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";

export const faqdatas = [
  {
    index: "1",
    question:
      "What are the differences between GTD and school/hall orientation?",
    answer:
      "Our orientation is solely for Indonesian students who are studying in NTU, all programmes are welcome to join. Our aim is to foster freshies with Indonesian community in NTU.",
  },
  {
    index: "2",
    question: "How can I register?",
    answer:
      "You can register yourself by filling up the registration form attached in this page. If you have further questions feel free to DM us on instagram @pintugtd. To reach us via telegram, please refer to the Contact Us section on this page.",
  },
  {
    index: "3",
    question: "Where, when, and how long will the programs be conducted?",
    answer: "Please refer to the Events page on our website.",
  },
  {
    index: "4",
    question: "How much does the orientation cost?",
    answer:
      "$25. This price includes our annual GTD T-Shirt, dinner & bus accommodation on August 3, and many more!",
  },
];

export default function FAQAccordion({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const faqarray = faqdatas?.map((faqdata) => (
    <AccordionItem
      key={faqdata.index}
      value={faqdata.index}
      className="border-0"
    >
      <AccordionTrigger className="text-left font-serif text-xl">
        {faqdata.question}
      </AccordionTrigger>
      <AccordionContent className="font-sans font-light">
        {faqdata.answer}
      </AccordionContent>
    </AccordionItem>
  ));

  return (
    <section className={cn("w-full", className, "px-[7.5%]")} {...props}>
      <h2 className="text-3xl font-serif text-center mb-3">FAQ</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqarray}
      </Accordion>
    </section>
  );
}
