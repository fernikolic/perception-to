import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData, FaqItem } from "./faq-data";
import { Link } from "react-router-dom";
import { CalendarModal, useCalendarModal } from "@/components/calendar-modal";

export function FaqList() {
  const { isOpen, openCalendar, closeCalendar } = useCalendarModal();

  return (
    <>
      <Accordion type="single" collapsible className="w-full bg-white rounded-lg overflow-hidden">
        {faqData.map((faq: FaqItem, index: number) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-b border-black/10"
          >
            <AccordionTrigger className="text-left hover:no-underline px-4 sm:px-6 text-black text-sm sm:text-base">{faq.question}</AccordionTrigger>
            <AccordionContent className="whitespace-pre-line px-4 sm:px-6 text-black/70 text-sm sm:text-base">
              {faq.answer}
              {faq.linkText && faq.linkAction === "bookDemo" && (
                <>
                  <button
                    onClick={openCalendar}
                    className="text-bitcoin hover:underline"
                  >
                    {faq.linkText}
                  </button>
                  {faq.linkSuffix}
                </>
              )}
              {faq.linkText && faq.linkHref && (
                <Link to={faq.linkHref} className="text-bitcoin hover:underline">
                  {faq.linkText}
                </Link>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <CalendarModal isOpen={isOpen} onClose={closeCalendar} />
    </>
  );
}
