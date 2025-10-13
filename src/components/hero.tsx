import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const valueLineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Set initial states
    gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, valueLineRef.current, ctaRef.current, imageRef.current], {
      opacity: 0,
      y: 30
    });

    // Animate in sequence
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8 })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 1, scale: 1 }, '-=0.4')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to(valueLineRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to(imageRef.current, { opacity: 1, y: 0, duration: 1 }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const imageRect = imageRef.current.getBoundingClientRect();

      // Calculate how much of the image is in viewport (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - imageRect.top) / (windowHeight + imageRect.height)));

      // Enhanced tilt effect with slight rotation
      const tilt = Math.max(0, (1 - scrollProgress) * 8);
      const rotate = Math.sin(scrollProgress * Math.PI) * 2;

      // More pronounced scale effect
      const scale = 0.85 + (scrollProgress * 0.15);

      // Parallax movement with slight horizontal drift
      const translateY = scrollPosition * 0.15;
      const translateX = Math.sin(scrollProgress * Math.PI) * 10;

      imageRef.current.style.transform = `
        perspective(1200px)
        rotateX(${tilt}deg)
        rotateZ(${rotate}deg)
        scale(${scale})
        translateY(-${translateY}px)
        translateX(${translateX}px)
      `;
      imageRef.current.style.opacity = imageRef.current.style.opacity || '1';

      // Remove any filters
      imageRef.current.style.filter = 'none';
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
      {/* Base Gradient */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

      <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
        {/* Hero Card with Background Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/hero_image.avif?v=2"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16">
            <div className="mx-auto max-w-6xl text-center">
              <div ref={badgeRef} className="mb-4 sm:mb-6 lg:mb-8">
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

              <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.95] text-black max-w-4xl mx-auto px-2 mb-5 sm:mb-6 lg:mb-8">
                Bitcoin intelligence that{'\u00A0'}drives{'\u00A0'}decisions
              </h1>

              <p ref={subtitleRef} className="text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed text-black/70 font-light max-w-3xl mx-auto px-2 mb-5 sm:mb-6 lg:mb-8">
                8 hours of manual research, delivered in 5{'\u00A0'}minutes. 100+ sources filtered into actionable opportunities across Bitcoin, stablecoins, and{'\u00A0'}tokenized{'\u00A0'}finance.
              </p>

              {/* Value Line */}
              <div ref={valueLineRef} className="mb-6 sm:mb-8 lg:mb-10">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-black max-w-3xl mx-auto px-2 leading-tight">
                  The unfair advantage over teams still{'\u00A0'}reading{'\u00A0'}newsletters.
                </p>
              </div>

              <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-2">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-8 sm:px-10 lg:px-12 py-6 sm:py-7 text-base sm:text-lg lg:text-xl shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                  asChild
                >
                  <a href="https://app.perception.to/auth/sign-up">
                    Start here
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-black hover:bg-white transition-all duration-300 font-semibold px-8 sm:px-10 lg:px-12 py-6 sm:py-7 text-base sm:text-lg lg:text-xl shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-black/20 hover:border-black/30 rounded-2xl"
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
                  → See it in action
                </Button>
              </div>
            </div>

            {/* Platform Image */}
            <div ref={imageRef} className="mt-16 sm:mt-20 lg:mt-28 relative max-w-7xl mx-auto will-change-transform">
              <img
                src="/images/platform_interface.png"
                alt="Platform interface"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}