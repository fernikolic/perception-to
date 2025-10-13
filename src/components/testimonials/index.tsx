import { TweetCard } from './tweet-card';
import { testimonials } from './testimonials-data';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function Testimonials() {
  // Filter and sort testimonials
  const featuredTestimonials = testimonials
    .filter(testimonial => 
      ['Cointelegraph', 'TFTC', 'BitcoinNewsCom', 'Jameson Lopp', 'Tuur Demeester', 'Sina'].includes(testimonial.author.name)
    )
    .sort((a, b) => {
      const order = ['Cointelegraph', 'TFTC', 'BitcoinNewsCom', 'Jameson Lopp', 'Tuur Demeester', 'Sina'];
      return order.indexOf(a.author.name) - order.indexOf(b.author.name);
    });

  return (
    <section id="testimonials" className="py-32 sm:py-40 lg:py-48">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center mb-20 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.2] pb-4 overflow-visible">
            Backed by those
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-800 inline-block text-transparent bg-clip-text font-bold pb-2">
              defining what's next
            </span>
          </h2>
        </div>
        <div className="mx-auto mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTestimonials.map((testimonial, index) => (
            <div key={index}>
              <TweetCard author={testimonial.author} />
            </div>
          ))}
        </div>
        <div className="mt-16 sm:mt-20 text-center">
          <Button
            variant="outline"
            className="text-base sm:text-lg px-8 py-6 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link to="/testimonials">
              View All Testimonials
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}