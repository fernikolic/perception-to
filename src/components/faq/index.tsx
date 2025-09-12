import { FaqList } from "./faq-list";
import { FAQSchema } from "@/components/seo/faq-schema";
import { faqData } from "./faq-data";

export function Faq() {
  return (
    <>
      <FAQSchema items={faqData} />
      <section className="border-t py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extralight tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Have questions? We're here to help.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          <FaqList />
        </div>
      </div>
    </section>
    </>
  );
}