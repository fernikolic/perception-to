import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProblemCards() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);

  // Force white text color
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .problem-section-title {
        color: #ffffff !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Dots animation - scroll-controlled
  useEffect(() => {
    const dotsContainer = dotsContainerRef.current;
    if (!dotsContainer) return;

    // Detect mobile
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Create canvas for drawing lines
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.width = dotsContainer.offsetWidth;
    canvas.height = dotsContainer.offsetHeight;
    dotsContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Responsive configuration
    const dotCount = isMobile ? 50 : isTablet ? 75 : 100;
    const dots: HTMLDivElement[] = [];
    const colors = ['#ffffff', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252'];

    // Grid positions (organized state) - responsive
    const gridCols = isMobile ? 10 : isTablet ? 15 : 25;
    const gridRows = isMobile ? 5 : isTablet ? 5 : 4;
    const spacing = isMobile ? 35 : isTablet ? 45 : 60;
    const gridWidth = (gridCols - 1) * spacing;
    const gridHeight = (gridRows - 1) * spacing;

    // Store random positions for each dot
    const randomPositions: { x: number; y: number }[] = [];

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';

      // Grid position
      const col = i % gridCols;
      const row = Math.floor(i / gridCols);
      const gridX = col * spacing - gridWidth / 2;
      const gridY = row * spacing - gridHeight / 2;

      // Random starting position (scattered) - responsive spread
      const spreadX = isMobile ? 600 : isTablet ? 1000 : 1400;
      const spreadY = isMobile ? 300 : isTablet ? 350 : 400;
      const randomX = (Math.random() - 0.5) * spreadX;
      const randomY = (Math.random() - 0.5) * spreadY;
      randomPositions.push({ x: randomX, y: randomY });

      // Responsive dot size
      const dotSize = isMobile ? 6 : isTablet ? 7 : 8;

      dot.style.position = 'absolute';
      dot.style.width = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      dot.style.left = '50%';
      dot.style.top = '50%';
      dot.style.boxShadow = isMobile ? '0 0 6px rgba(255, 255, 255, 0.2)' : '0 0 10px rgba(255, 255, 255, 0.3)';

      // Store grid position as data attributes
      dot.setAttribute('data-grid-x', gridX.toString());
      dot.setAttribute('data-grid-y', gridY.toString());
      dot.setAttribute('data-random-x', randomX.toString());
      dot.setAttribute('data-random-y', randomY.toString());

      // Set initial scattered position
      gsap.set(dot, { x: randomX, y: randomY, opacity: 0.7 });

      dotsContainer.appendChild(dot);
      dots.push(dot);
    }

    // Create timeline for scroll-controlled animation
    const tl = gsap.timeline({
      paused: true
    });

    // Animate from scattered to organized
    dots.forEach((dot, i) => {
      const gridX = parseFloat(dot.getAttribute('data-grid-x') || '0');
      const gridY = parseFloat(dot.getAttribute('data-grid-y') || '0');

      tl.to(dot, {
        x: gridX,
        y: gridY,
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut'
      }, i * 0.02);
    });

    // Function to draw lines between nearby dots
    const drawLines = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Responsive max distance for connections
      const maxDistance = isMobile ? 80 : isTablet ? 100 : 120;

      for (let i = 0; i < dots.length; i++) {
        const dot1 = dots[i];
        const rect1 = dot1.getBoundingClientRect();
        const containerRect = dotsContainer.getBoundingClientRect();
        const x1 = rect1.left - containerRect.left + rect1.width / 2;
        const y1 = rect1.top - containerRect.top + rect1.height / 2;

        for (let j = i + 1; j < dots.length; j++) {
          const dot2 = dots[j];
          const rect2 = dot2.getBoundingClientRect();
          const x2 = rect2.left - containerRect.left + rect2.width / 2;
          const y2 = rect2.top - containerRect.top + rect2.height / 2;

          const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

          if (distance < maxDistance) {
            // Calculate opacity based on distance (closer = more opaque)
            const opacity = (1 - distance / maxDistance) * 0.3;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    // Animate line drawing continuously
    let animationFrame: number;
    const animate = () => {
      drawLines();
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    // Link animation to scroll
    ScrollTrigger.create({
      trigger: dotsContainer,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 3,
      animation: tl,
      onUpdate: () => {
        drawLines();
      }
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
      dots.forEach(dot => dot.remove());
      canvas.remove();
    };
  }, []);

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
    <section className="relative py-32 sm:py-40 lg:py-48" style={{
      background: 'linear-gradient(to bottom, #000000 0%, #000000 35%, #0a1929 45%, #1e3a8a 60%, #1d4ed8 75%, #2563eb 85%, #3b82f6 100%)'
    }}>
      {/* Dots Animation - Full Width */}
      <div
        ref={dotsContainerRef}
        className="relative w-full h-48 sm:h-64 md:h-72 lg:h-80 mb-8 sm:mb-12 md:mb-16"
        style={{
          overflow: 'hidden',
          perspective: '1000px'
        }}
      />

      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Header Section */}
        <div className="mx-auto max-w-5xl text-center mb-24 sm:mb-32">

          <h2
            ref={titleRef}
            className="problem-section-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-10 sm:mb-12 leading-[1.05]"
            style={{ color: '#ffffff !important' }}
          >
            Information fragmentation is costing professionals
            <br />
            time and clarity
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl lg:text-3xl text-blue-100/80 leading-relaxed max-w-4xl mx-auto font-light"
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