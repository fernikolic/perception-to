import { TestimonialList } from './testimonial-list';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by industry leaders
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            See how companies of all sizes have transformed their operations with our platform.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
          <TestimonialList />
        </div>
      </div>
    </section>
  );
}