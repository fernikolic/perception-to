import { TweetCard } from './tweet-card';
import { testimonials } from './testimonials-data';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Filter and sort testimonials
  const featuredTestimonials = testimonials
    .filter(testimonial =>
      ['Cointelegraph', 'TFTC', 'BitcoinNewsCom', 'Jameson Lopp', 'Tuur Demeester', 'Sina'].includes(testimonial.author.name)
    )
    .sort((a, b) => {
      const order = ['Cointelegraph', 'TFTC', 'BitcoinNewsCom', 'Jameson Lopp', 'Tuur Demeester', 'Sina'];
      return order.indexOf(a.author.name) - order.indexOf(b.author.name);
    });

  // Scroll-triggered animations
  useEffect(() => {
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!title || !cards) return;

    // Title animation
    gsap.set(title, {
      opacity: 0,
      y: 50
    });

    gsap.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Card animations - staggered
    const cardElements = Array.from(cards.children) as HTMLElement[];

    cardElements.forEach((card, index) => {
      gsap.set(card, {
        opacity: 0,
        y: 60,
        scale: 0.95
      });

      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.1
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section id="testimonials" className="py-32 sm:py-40 lg:py-48 relative" style={{ background: '#F0EEE6' }}>
      {/* Subtle background pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #000000 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="mx-auto max-w-7xl px-8 lg:px-12 relative">
        <div className="mx-auto max-w-4xl text-center mb-20 sm:mb-24">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight leading-[1.2] pb-4 overflow-visible"
          >
            Backed by those
            <br />
            defining what's next
          </h2>
        </div>
        <div
          ref={cardsRef}
          className="mx-auto mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredTestimonials.map((testimonial, index) => {
            // Create staggered vertical offsets
            const verticalOffset = index % 3 === 0 ? 'mt-0' : index % 3 === 1 ? 'mt-8' : 'mt-16';
            return (
              <div
                key={index}
                className={`${verticalOffset} transition-all duration-300 hover:-translate-y-2`}
              >
                <TweetCard author={testimonial.author} />
              </div>
            );
          })}
        </div>
        <div className="mt-16 sm:mt-20 text-center">
          <Button
            variant="outline"
            className="text-base sm:text-lg px-8 py-6 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 bg-white border-black/20 hover:border-black/40"
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