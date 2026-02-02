import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const companies = [
  'MSTR', 'MARA', 'RIOT', 'COIN', 'CLSK', 'HUT', 'BITF', 'WULF',
  'IREN', 'BTBT', 'CIFR', 'CORZ', 'SMLR', 'BTDR'
];

const features = [
  {
    title: 'Automated summaries',
    description: 'Key topics, announcements, and guidance extracted automatically'
  },
  {
    title: 'Management tone classification',
    description: 'Is the team confident, cautious, or defensive this quarter?'
  },
  {
    title: 'Positive/Cautionary signals',
    description: 'Broken out by topic so you can focus on what matters'
  },
  {
    title: 'Quarter-over-quarter comparison',
    description: 'How has the narrative shifted since last quarter?'
  }
];

export function EarningsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    gsap.set(content, { opacity: 0, y: 60 });

    gsap.to(content, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: content,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 lg:py-32 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div ref={contentRef}>
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
              Earnings calls, decoded.
            </h2>
            <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto">
              MicroStrategy just reported. What did Saylor actually say? Get automated summaries, management tone analysis, and quarter-over-quarter comparisons in 2 minutes instead of 45.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: The Problem */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white/90 mb-4">The old way</h3>
                <div className="space-y-4 text-white/60">
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Find the earnings transcript (10 minutes)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Read or skim 60-90 minutes of content</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Try to remember what was said last quarter</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Miss the subtle shifts in management tone</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white/90 mb-4">With Perception</h3>
                <div className="space-y-4 text-white/60">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <span className="text-white/90 font-medium">{feature.title}</span>
                        <span className="text-white/50">: {feature.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Companies Covered */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white/90 mb-6">Currently covering</h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {companies.map((company) => (
                  <span
                    key={company}
                    className="px-4 py-2 bg-white/10 rounded-lg text-sm font-mono text-white/80 border border-white/10"
                  >
                    {company}
                  </span>
                ))}
              </div>
              <p className="text-white/50 text-sm mb-6">
                Plus 20+ additional tech and Bitcoin treasury companies
              </p>

              {/* Use Case Example */}
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wide mb-4">Example Workflow</h4>
                <p className="text-white/60 text-sm mb-4">
                  Preparing for MSTR's earnings next week:
                </p>
                <ol className="text-white/50 text-sm space-y-2">
                  <li>1. Open the MSTR earnings dashboard</li>
                  <li>2. Review last quarter's summary: key topics, tone, guidance</li>
                  <li>3. Compare to previous 4 quarters</li>
                  <li>4. Note the positive/negative signal breakdown</li>
                  <li>5. <span className="text-white/80 font-medium">Prepped in 5 minutes</span></li>
                </ol>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 sm:mt-16">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-6 rounded-2xl"
              asChild
            >
              <a href="/earnings-analysis">
                See an Example Report →
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
