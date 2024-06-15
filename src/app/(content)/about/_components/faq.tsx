import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Question 1...</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum
          fermentum magna, a malesuada est consectetur eget. Vivamus a
          vestibulum nisi, in tincidunt nunc. Pellentesque cursus aliquet dui,
          id vulputate.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Question 2...</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum
          fermentum magna, a malesuada est consectetur eget. Vivamus a
          vestibulum nisi, in tincidunt nunc. Pellentesque cursus aliquet dui,
          id vulputate.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Question 3...</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum
          fermentum magna, a malesuada est consectetur eget. Vivamus a
          vestibulum nisi, in tincidunt nunc. Pellentesque cursus aliquet dui,
          id vulputate.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
