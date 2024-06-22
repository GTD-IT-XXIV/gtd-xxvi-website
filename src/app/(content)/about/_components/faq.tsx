import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqdatas } from "./faq_data.js";

export default function FAQ() {
  const faqarray = faqdatas?.map((faqdata) => (
    <AccordionItem key={faqdata.index} value={faqdata.index}>
      <AccordionTrigger>{faqdata.question}</AccordionTrigger>
      <AccordionContent>{faqdata.answer}</AccordionContent>
    </AccordionItem>
  ));

  return (
    <Accordion type="single" collapsible className="w-full font-serif">
      {faqarray}
    </Accordion>
  );
}
