import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Perception and how does it work?",
    answer: "Perception is a comprehensive platform that helps businesses streamline their operations. It combines powerful automation tools, analytics, and collaboration features in one intuitive interface, allowing teams to work more efficiently and scale their operations effectively."
  },
  {
    question: "How secure is my data with Perception?",
    answer: "We implement bank-grade security measures including end-to-end encryption, regular security audits, and compliance with industry standards. Your data is stored in secure, redundant data centers with 24/7 monitoring."
  },
  {
    question: "Can I try Perception before committing?",
    answer: "Yes! We offer a 14-day free trial on all our plans. You'll get full access to all features during the trial period, allowing you to thoroughly evaluate how Perception can benefit your business."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We provide 24/7 customer support through multiple channels including email, live chat, and phone. Our dedicated support team is always ready to help you with any questions or issues you might encounter."
  },
  {
    question: "How does pricing work?",
    answer: "We offer transparent, tiered pricing plans designed to scale with your business. Each plan includes a core set of features, with additional capabilities available as you move up tiers. All plans come with a 14-day free trial."
  },
  {
    question: "Can I integrate Perception with my existing tools?",
    answer: "Yes! Perception offers extensive integration capabilities with popular business tools and platforms. We provide APIs and webhooks for custom integrations, and our platform works seamlessly with major productivity and development tools."
  }
];

export function FaqList() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}