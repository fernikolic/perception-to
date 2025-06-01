import { XCircle } from 'lucide-react';
import { useEffect, useRef, useCallback } from 'react';

// Utility function for throttling
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const painPoints = [
  {
    problem: 'Tracking sentiment across 50+ fragmented sources daily',
    consequence: 'Hours lost to manual research 🕐',
  },
  {
    problem: 'Drowning in crypto media noise—Twitter, Reddit, news, and podcasts',
    consequence: 'Missing critical signals 📡',
  },
  {
    problem: 'Switching between dozens of tabs and apps for market intelligence',
    consequence: 'Burnt out from tool fatigue 🔥',
  },
  {
    problem: 'No centralized view of narrative shifts across media channels',
    consequence: 'Flying blind on trends 🕶️',
  },
  {
    problem: 'Manually correlating price movements with media coverage',
    consequence: 'Missed trading opportunities 💸',
  },
];

export function PainPoints() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number>();
  const cachedMeasurementsRef = useRef<{
    containerTop: number;
    viewportHeight: number;
  }>({ containerTop: 0, viewportHeight: 0 });

  // Cache measurements that don't change frequently
  const updateMeasurements = useCallback(() => {
    if (!containerRef.current) return;
    
    cachedMeasurementsRef.current = {
      containerTop: containerRef.current.offsetTop,
      viewportHeight: window.innerHeight
    };
  }, []);

  const updateCards = useCallback(() => {
    const { containerTop, viewportHeight } = cachedMeasurementsRef.current;
    const scrollPosition = window.scrollY;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      // Calculate the card's ideal position in the scroll sequence
      const cardIdealPosition = containerTop + (index * viewportHeight * 0.6);
      
      // Calculate how far the card is from its ideal position
      const distanceFromIdeal = scrollPosition - cardIdealPosition;
      
      // Calculate the card's progress through the viewport
      const progress = Math.min(Math.max(distanceFromIdeal / (viewportHeight * 0.4), -1), 1);

      // Use CSS transform for better performance
      const scale = Math.max(0.9, 1 - Math.abs(progress) * 0.1);
      const opacity = Math.max(0.6, 1 - Math.abs(progress));
      const yOffset = progress * 20;
      
      // Use translateZ(0) to force GPU acceleration
      card.style.transform = `translateZ(0) scale(${scale}) translateY(${yOffset}px)`;
      card.style.opacity = opacity.toString();
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(updateCards);
  }, [updateCards]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initial measurements
    updateMeasurements();

    // Throttled resize handler to update measurements
    const throttledResize = throttle(() => {
      updateMeasurements();
      handleScroll();
    }, 250);

    // Throttled scroll handler
    const throttledScroll = throttle(handleScroll, 16); // ~60fps

    window.addEventListener('scroll', throttledScroll);
    window.addEventListener('resize', throttledResize);
    
    // Initial update
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll, updateMeasurements]);

  return (
    <section className="relative min-h-screen py-24">
      <div className="fixed inset-0 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.05),transparent)] -z-10" />

      <div ref={containerRef} className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="text-sm font-medium">Current Workflow</span>
            </div>
            
            <h2 className="mt-8 text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Stop wasting hours on fragmented crypto research:
            </h2>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="space-y-8 md:space-y-16">
              {painPoints.map((point, index) => (
                <div 
                  key={index}
                  ref={el => cardsRef.current[index] = el}
                  className="
                    pain-point-card
                    flex items-start gap-6 rounded-2xl border-2 border-white/10 
                    p-10 transition-all duration-300 ease-out
                    shadow-2xl shadow-black/50
                    bg-gradient-to-b from-[#151515] to-[#0A0A0A]
                    hover:border-white/20 hover:from-[#202020] hover:to-[#101010]
                  "
                  style={{
                    willChange: 'transform, opacity',
                  }}
                >
                  <div className="pain-point-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
                    <XCircle className="h-9 w-9 text-red-500" />
                  </div>
                  
                  <div className="pain-point-content">
                    <p className="text-xl font-semibold leading-7 text-white/90">
                      {point.problem}
                    </p>
                    <p className="mt-3 text-lg text-white/70">
                      → {point.consequence}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[20vh]" />
    </section>
  );
} 