import { FaqList } from "./faq-list";
import { FAQSchema } from "@/components/seo/faq-schema";
import { faqData } from "./faq-data";

export function Faq() {
  return (
    <>
      <FAQSchema items={faqData} />
      <section className="border-t py-32 sm:py-40 lg:py-48">
        <div className="mx-auto max-w-7xl px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center mb-20 sm:mb-24">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Frequently asked questions
            </h2>
            <p className="mt-8 sm:mt-10 text-xl sm:text-2xl leading-relaxed text-muted-foreground font-light">
              Have questions? We're here to help.
            </p>
          </div>
          <div className="mx-auto mt-20 max-w-4xl">
            <FaqList />
          </div>
        </div>
      </section>
    </>
  );
}