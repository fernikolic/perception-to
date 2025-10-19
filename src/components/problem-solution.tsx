import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './problem-solution.module.css';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function ProblemSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  
  const problemText = "Emerging finance leaders spend 15+ hours a week scanning for opportunities, regulatory changes, and competitive intelligence across fragmented sources.";
  // Break solution text into pieces to handle separately
  const solutionText1 = "Perception delivers opportunities, intelligence,";
  const solutionText2 = "and next steps in 5 minutes."; // Keep these words together with the period

  useEffect(() => {
    const section = sectionRef.current;
    const problemContainer = problemRef.current;
    const solutionContainer = solutionRef.current;
    
    if (!section || !problemContainer || !solutionContainer) return;
    
    // Clear any existing content
    problemContainer.innerHTML = '';
    solutionContainer.innerHTML = '';
    
    // Split problem text and create DOM elements directly
    const problemWords = problemText.split(' ');
    problemWords.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = styles.word;
      wordSpan.setAttribute('data-index', index.toString());
      
      const innerSpan = document.createElement('span');
      innerSpan.className = styles.innerWord;
      
      // Highlight specific words with orange gradient and cursive font
      if (word === 'spend' || word === '15+' || word === 'hours' || word === 'a' || word === 'week') {
        innerSpan.style.background = 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fdba74 100%)';
        innerSpan.style.webkitBackgroundClip = 'text';
        innerSpan.style.backgroundClip = 'text';
        innerSpan.style.webkitTextFillColor = 'transparent';
        innerSpan.style.fontStyle = 'italic';
        innerSpan.style.fontFamily = 'Georgia, serif';
        innerSpan.style.paddingBottom = '0.1em';
        innerSpan.style.display = 'inline-block';
      }
      
      innerSpan.textContent = word;
      wordSpan.appendChild(innerSpan);
      wordSpan.innerHTML += ' '; // Add space after word
      problemContainer.appendChild(wordSpan);
    });
    
    // Handle solution text in two parts for better line break control

    // First part
    const part1Words = solutionText1.split(' ');
    part1Words.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = styles.word;
      wordSpan.setAttribute('data-index', `p1-${index}`);

      const innerSpan = document.createElement('span');
      innerSpan.className = styles.innerWord;
      innerSpan.textContent = word;

      wordSpan.appendChild(innerSpan);
      wordSpan.innerHTML += ' '; // Add space after word
      solutionContainer.appendChild(wordSpan);
    });

    // Second part - split into words to style "5" and "minutes"
    const part2Words = solutionText2.split(' ');
    part2Words.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = styles.word;
      wordSpan.setAttribute('data-index', `p2-${index}`);

      const innerSpan = document.createElement('span');
      innerSpan.className = styles.innerWord;

      // Highlight "5" and "minutes" with orange gradient and cursive font
      if (word === '5' || word.startsWith('minutes')) {
        innerSpan.style.background = 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fdba74 100%)';
        innerSpan.style.webkitBackgroundClip = 'text';
        innerSpan.style.backgroundClip = 'text';
        innerSpan.style.webkitTextFillColor = 'transparent';
        innerSpan.style.fontStyle = 'italic';
        innerSpan.style.fontFamily = 'Georgia, serif';
        innerSpan.style.paddingBottom = '0.1em';
        innerSpan.style.display = 'inline-block';
      }

      innerSpan.textContent = word;

      wordSpan.appendChild(innerSpan);
      if (index < part2Words.length - 1) {
        wordSpan.innerHTML += ' '; // Add space after word except for last
      }
      solutionContainer.appendChild(wordSpan);
    });
    
    // Get all inner word elements for animation
    const allInnerWords = [
      ...Array.from(problemContainer.querySelectorAll(`.${styles.innerWord}`)),
      ...Array.from(solutionContainer.querySelectorAll(`.${styles.innerWord}`))
    ];
    
    // Initially style all words - simpler initial state
    gsap.set(allInnerWords, {
      opacity: 0.3,
      color: (_, target) => {
        // Preserve gradient for highlighted words (check if gradient is applied)
        if (target.style.webkitTextFillColor === 'transparent') {
          return undefined; // Don't override gradient
        }
        return "rgba(255,255,255,0.3)";
      },
      force3D: true // Force GPU acceleration for better cross-browser performance
    });

    // Create a much simpler timeline that doesn't interfere with scroll
    const tl = gsap.timeline({ paused: true });

    // Animate words appearing more naturally
    allInnerWords.forEach((word, index) => {
      tl.to(word, {
        opacity: 1,
        color: (_, target) => {
          // Keep gradient for highlighted words
          if (target.style.webkitTextFillColor === 'transparent') {
            return undefined; // Don't override gradient
          }
          return "rgba(255,255,255,1)";
        },
        duration: 0.3,
        ease: "power2.out",
        force3D: true // Force GPU acceleration for better cross-browser performance
      }, index * 0.05);
    });
    
    // Scroll-scrubbing effect: pins section and ties animation to scroll progress
    ScrollTrigger.create({
      trigger: section,
      start: "top top", // Pin when section reaches top of viewport
      end: "+=200%", // Section stays pinned for 200% of viewport height worth of scrolling
      pin: true, // Pin the section in place
      pinSpacing: true, // Ensure consistent spacing across browsers
      scrub: 1, // Smoothly tie animation progress to scroll position (1 second delay for smoothness)
      animation: tl, // Link the timeline to scroll progress
      anticipatePin: 1, // Helps prevent jump on pin (better mobile Safari support)
      invalidateOnRefresh: true, // Recalculate on window resize/orientation change
      fastScrollEnd: true, // Better handling of fast scrolling on mobile
    });
    
    // Handle window resize and orientation changes
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
    };
  }, [problemText, solutionText1, solutionText2]);

  return (
    <div ref={sectionRef} className={styles.container} key="problem-solution-section-period-fixed">
      <div className={styles.content}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-full">
            <div className="grid gap-8 sm:gap-16 lg:gap-24">
              {/* Problem */}
              <div className="space-y-4 sm:space-y-6">
                <p ref={problemRef} className={`${styles.textContainer} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[0.95] text-center`}></p>
              </div>

              {/* Solution */}
              <div className="space-y-4 sm:space-y-6">
                <div className="h-px w-8 sm:w-12 bg-white/20 mx-auto" aria-hidden="true" />
                <p ref={solutionRef} className={`${styles.textContainer} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[0.95] text-center`}></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 