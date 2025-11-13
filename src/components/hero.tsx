import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AsciiBinaryFlow from '@/components/AsciiBinaryFlow';

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Set initial states
    gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, ctaRef.current, imageRef.current], {
      opacity: 0,
      y: 30
    });

    // Animate in sequence
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8 })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 1, scale: 1 }, '-=0.4')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to(imageRef.current, { opacity: 1, y: 0, duration: 1 }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);


  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
      {/* Base Gradient */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

      <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
        {/* Hero Card with Side-by-Side Layout */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex flex-col-reverse lg:flex-row min-h-[200px] lg:min-h-[600px]">
            {/* ASCII Binary Flow - Left Side on Desktop, Bottom on Mobile (50%) */}
            <div className="w-full lg:w-1/2 relative min-h-[200px] lg:min-h-[600px] hidden lg:block">
              <AsciiBinaryFlow />
            </div>

            {/* Content - Right Side on Desktop, Top on Mobile (50%) */}
            <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:pl-2 lg:pr-32 py-8 sm:py-12 lg:py-16 flex flex-col justify-center" style={{ background: '#F0EEE6' }}>
              <div className="w-full max-w-2xl">
                <div ref={badgeRef} className="mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                <a
                  href="https://x.com/BTCPerception/status/1877387322724909419"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold leading-6 transition-all duration-300 hover:scale-[1.02] overflow-hidden backdrop-blur-sm"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Subtle shimmer effect on hover */}
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)'
                    }}
                  />

                  <span className="relative flex items-center gap-2">
                    {/* Subtle pulsing dot */}
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-40"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400"></span>
                    </span>
                    <span className="relative font-bold text-black">NEW</span>
                  </span>
                  <span className="ml-2.5 text-black/80 group-hover:text-black transition-colors duration-300 relative">Announcing Beta</span>
                  <svg className="ml-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-black/60 group-hover:text-black/80 transition-all duration-300 group-hover:translate-x-0.5 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>

              <h1 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-black mb-5 sm:mb-6 lg:mb-8 text-center lg:text-left">
                High-Signal Intelligence for Emerging{'\u00A0'}Finance
              </h1>

              <div ref={subtitleRef} className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 font-semibold mb-3">
                  Reclaim 15+ hours per week. Skip the algorithmic feeds. Skip the garbage data. Skip manually piecing together every{'\u00A0'}update.
                </p>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                  Monitor 250+ high-signal sources. Organize in <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>. Generate board updates, PR pitches, interview prep, and sector deep dives with <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>—all backed by real mentions and full{'\u00A0'}citations.
                </p>
              </div>

              <div ref={ctaRef} className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                  asChild
                >
                  <a href="https://app.perception.to/auth/sign-up">
                    Start Building Your Intelligence →
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-black hover:bg-white transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-black/20 hover:border-black/30 rounded-2xl"
                  onClick={() => {
                    const isMobile = window.innerWidth < 768;
                    const width = isMobile ? Math.min(window.innerWidth - 40, 360) : 640;
                    const height = isMobile ? Math.min(window.innerHeight - 100, 240) : 400;

                    const popup = window.open('', 'demo', `width=${width},height=${height},scrollbars=no,resizable=yes`);
                    popup?.document.write(`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <title>Demo Video</title>
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <style>
                            body { margin: 0; padding: 0; background: black; }
                            iframe { width: 100%; height: 100vh; border: none; }
                          </style>
                        </head>
                        <body>
                          <iframe
                            src="https://www.youtube.com/embed/Au3vd597SHw?autoplay=1&mute=1"
                            allow="autoplay; encrypted-media"
                            allowfullscreen>
                          </iframe>
                        </body>
                      </html>
                    `);
                    popup?.document.close();
                  }}
                >
                  → Watch demo
                </Button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}