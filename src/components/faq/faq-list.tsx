import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "./faq-data";

export function FaqList() {
  return (
    <Accordion type="single" collapsible className="w-full bg-white rounded-lg overflow-hidden">
      {faqData.map((faq, index) => (
        <AccordionItem 
          key={index} 
          value={`item-${index}`}
          className="border-b border-black/10"
        >
          <AccordionTrigger className="text-left hover:no-underline px-6 text-black">{faq.question}</AccordionTrigger>
          <AccordionContent className="whitespace-pre-line px-6 text-black/70">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}