import { TweetCard } from '@/components/testimonials/tweet-card';
import { testimonials } from '@/components/testimonials/testimonials-data';
import { useEffect } from 'react';

export default function TestimonialsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-tight">
              The best in Bitcoin
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-orange-800 inline-block text-transparent bg-clip-text">
                trusts the data
              </span>
            </h2>
          </div>
          <div className="mx-auto mt-12 sm:mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <TweetCard author={testimonial.author} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 