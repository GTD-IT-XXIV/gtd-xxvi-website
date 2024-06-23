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
    question: "Question 1...",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum fermentum magna, a malesuada est consectetur eget. Vivamus a vestibulum nisi, in tincidunt nunc. Pellentesque cursus aliquet dui, id vulputate.",
  },
  {
    index: "2",
    question: "Question 2...",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum fermentum magna, a malesuada est consectetur eget. Vivamus a vestibulum nisi, in tincidunt nunc. Pellentesque cursus aliquet dui, id vulputate.",
  },
  {
    index: "3",
    question: "Question 3...",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum fermentum magna, a malesuada est consectetur eget. Vivamus a vestibulum nisi, in tincidunt nunc. Pellentesque cursus aliquet dui, id vulputate.",
  },
];

export default function FAQAccordion({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const faqarray = faqdatas?.map((faqdata) => (
    <AccordionItem key={faqdata.index} value={faqdata.index}>
      <AccordionTrigger className="font-serif text-xl">
        {faqdata.question}
      </AccordionTrigger>
      <AccordionContent className="font-sans font-light">
        {faqdata.answer}
      </AccordionContent>
    </AccordionItem>
  ));

  return (
    <section className={cn("w-full", className)} {...props}>
      <h2 className="text-3xl font-serif text-center mb-3">FAQ</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqarray}
      </Accordion>
    </section>
  );
}
