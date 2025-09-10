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
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extralight tracking-tight sm:text-5xl lg:text-6xl">
            Backed by those
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-800 inline-block text-transparent bg-clip-text leading-tight">
              defining what's next
            </span>
          </h2>
        </div>
        <div className="mx-auto mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTestimonials.map((testimonial, index) => (
            <div key={index}>
              <TweetCard author={testimonial.author} />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link to="/testimonials">
              View All Testimonials
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}