import { useEffect, useRef } from 'react';

export function ProblemCards() {
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoContainerRef.current) return;
      
      const rect = videoContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scale based on scroll position
      const centerY = windowHeight / 2;
      const elementCenterY = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(elementCenterY - centerY);
      const maxDistance = windowHeight / 2;
      
      // Scale ranges from 1 to 1.3 based on scroll position
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
      const scale = 1 + (0.3 * (1 - normalizedDistance));
      
      videoContainerRef.current.style.transform = `scale(${scale})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-4xl text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight text-gray-900 dark:text-gray-100 mb-8 leading-tight">
            Information fragmentation is costing
            <br />
            professionals{' '}
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent font-light">
              time and clarity
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Our research shows that decision-makers spend 3+ hours daily trying to identify key market signals and trends.
          </p>
        </div>

        {/* Video Section */}
        <div className="mt-12 sm:mt-16 lg:mt-24 max-w-6xl mx-auto">
          <div 
            ref={videoContainerRef}
            className="relative aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl transition-transform duration-300 ease-out"
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/Au3vd597SHw?autoplay=0&mute=0&playsinline=1&enablejsapi=1"
              title="Bitcoin Perception Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
} 