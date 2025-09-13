import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);

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
      imageRef.current.style.opacity = '1';
      
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:px-8">
        {/* Hero Card with Background Image */}
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/images/hero_image.avif?v=2"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <a 
                  href="https://x.com/BTCPerception/status/1877387322724909419" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group inline-flex items-center rounded-full bg-transparent px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium leading-6 text-black ring-1 ring-inset ring-black/30 hover:ring-black/50 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative">
                    <span className="relative">NEW</span>
                  </span>
                  <span className="ml-2 text-black/80 group-hover:text-black transition-colors duration-300">Announcing Beta</span>
                  <svg className="ml-2 h-3 w-3 sm:h-4 sm:w-4 text-black/60 group-hover:text-black/80 transition-colors duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
              
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight text-black max-w-4xl mx-auto px-2">
                Bitcoin intelligence that drives decisions
              </h1>
              
              <p className="mt-3 sm:mt-4 lg:mt-6 text-sm sm:text-base lg:text-lg xl:text-xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light max-w-3xl mx-auto px-2">
                8 hours of manual research, delivered in 5 minutes. 100+ sources filtered into actionable opportunities across Bitcoin, stablecoins, and tokenized finance.
              </p>

              {/* Value Line */}
              <div className="mt-4 sm:mt-6 lg:mt-8">
                <p className="text-sm sm:text-base lg:text-lg font-bold text-black max-w-3xl mx-auto px-2">
                  The unfair advantage over teams still reading newsletters.
                </p>
              </div>
              
              <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all font-normal px-4 sm:px-6 lg:px-8 text-sm sm:text-base shadow-lg hover:shadow-xl"
                  asChild
                >
                  <a href="https://app.perception.to/auth/sign-up">
                    Start here
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-white text-black hover:bg-white/90 transition-all font-normal px-4 sm:px-6 lg:px-8 text-sm sm:text-base shadow-lg hover:shadow-xl border border-black/20"
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
            <div ref={imageRef} className="mt-8 sm:mt-10 lg:mt-12 relative max-w-6xl mx-auto will-change-transform">
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