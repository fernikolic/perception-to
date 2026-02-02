import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const personas = [
  {
    title: 'Fund Analysts',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    tagline: 'Research digital asset companies in minutes, not hours.',
    features: [
      'Track media sentiment on MSTR, MARA, COIN, and 30+ digital asset-exposed equities',
      'Get earnings call summaries with management tone analysis',
      'Monitor narrative shifts before they hit mainstream coverage',
      'Generate investment memos with full citations'
    ],
    quote: "I used to spend half my Monday catching up on weekend coverage. Now it takes 15 minutes."
  },
  {
    title: 'IR & Communications',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
    tagline: 'Track your coverage. Prepare your executives. Monitor competitors.',
    features: [
      'Real-time alerts when your company is mentioned',
      'Sentiment tracking across 450+ sources',
      'Competitive positioning reports on demand',
      'Board-ready media briefings in minutes'
    ],
    quote: "When the board asks 'how are we doing?' I have real data, not guesses."
  },
  {
    title: 'Family Offices',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    tagline: 'Navigate the narrative landscape around your digital asset allocation.',
    features: [
      'Track institutional adoption narratives',
      'Monitor regulatory developments by region',
      'Get plain-English summaries of technical developments',
      'Quarterly intelligence briefings on market positioning'
    ],
    quote: "Perception cuts through the noise and delivers the intelligence we need. We can brief our investment committee with confidence."
  },
  {
    title: 'Financial Journalists',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
    tagline: 'Get up to speed on any story, instantly.',
    features: [
      'Research any company\'s media history in seconds',
      'Track narrative evolution over time',
      'Find original sources and citations',
      'Monitor breaking developments across your beat'
    ],
    quote: "I can prep for an interview in 10 minutes instead of an hour."
  }
];

export function PersonaCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    cards.forEach((card, index) => {
      gsap.set(card, { opacity: 0, y: 60 });

      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
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
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-black/90 mb-4">
            Built for professionals who move markets
          </h2>
          <p className="text-lg sm:text-xl text-black/60 max-w-3xl mx-auto">
            Whether you're analyzing investments, managing communications, or covering the space, Perception gives you the intelligence edge.
          </p>
        </div>

        {/* Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {personas.map((persona, index) => (
            <div
              key={persona.title}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-black/5 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-black/5 flex items-center justify-center text-black/70">
                  {persona.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-black/90">
                  {persona.title}
                </h3>
              </div>

              {/* Tagline */}
              <p className="text-lg text-black/70 mb-6 font-medium">
                {persona.tagline}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {persona.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-black/60">
                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Quote */}
              <div className="pt-6 border-t border-black/10">
                <p className="text-black/50 italic text-sm">
                  "{persona.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <a
            href="/book-a-call"
            className="inline-flex items-center gap-2 text-black/70 hover:text-black transition-colors font-medium"
          >
            Book a Demo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
