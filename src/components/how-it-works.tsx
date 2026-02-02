import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Connect your focus areas',
    description: 'Tell Perception what you care about: companies, topics, competitors, regions. Set up watchlists and alerts in minutes.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'We monitor everything',
    description: '450+ sources. Updated in real-time. AI extracts topics, sentiment, and entities automatically. You don\'t have to read anything you don\'t want to.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'Generate intelligence on demand',
    description: 'Need a board update? Competitive report? Earnings summary? Tell Perception what you need and get a cited deliverable in seconds.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    )
  }
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const stepElements = stepsRef.current.filter(Boolean);

    stepElements.forEach((step, index) => {
      gsap.set(step, { opacity: 0, x: -30 });

      gsap.to(step, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 lg:py-32" style={{ background: '#F0EEE6' }}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-black/90 mb-4">
            From noise to clarity in three steps
          </h2>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-8 lg:space-y-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => { if (el) stepsRef.current[index] = el; }}
              className="flex items-start gap-6 sm:gap-8"
            >
              {/* Number + Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-lg border border-black/5 flex items-center justify-center text-black/70">
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="pt-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-orange-500">{step.number}</span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-black/90">
                    {step.title}
                  </h3>
                </div>
                <p className="text-black/60 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 sm:mt-20">
          <Button
            size="lg"
            className="bg-black text-white hover:bg-black/90 font-semibold px-8 py-6 rounded-2xl"
            asChild
          >
            <a href="/book-a-call">
              Book a Demo
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
