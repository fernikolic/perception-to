import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProblemCards() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Scroll-triggered animations
  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const video = videoContainerRef.current;

    if (!title || !subtitle || !video) return;

    // Set initial states
    gsap.set([title, subtitle], {
      opacity: 0,
      y: 50
    });

    gsap.set(video, {
      opacity: 0,
      y: 80,
      scale: 0.9
    });

    // Animate title and subtitle
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

    gsap.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: subtitle,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate video with scale effect
    gsap.to(video, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: video,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="relative py-32 sm:py-40 lg:py-48 bg-gradient-to-b from-background to-background/95">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Header Section */}
        <div className="mx-auto max-w-5xl text-center mb-24 sm:mb-32">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-10 sm:mb-12 leading-[1.05]"
          >
            Information fragmentation is costing
            <br />
            professionals{' '}
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent font-bold">
              time and clarity
            </span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-light"
          >
            Our research shows that decision-makers spend 3+ hours daily trying to identify key market signals and trends.
          </p>
        </div>

        {/* Video Section */}
        <div className="mt-16 sm:mt-20 lg:mt-28 max-w-6xl mx-auto">
          <div
            ref={videoContainerRef}
            className="relative aspect-video rounded-3xl overflow-hidden bg-black/50 border-4 border-white/10 shadow-2xl hover:shadow-3xl transition-shadow duration-500"
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