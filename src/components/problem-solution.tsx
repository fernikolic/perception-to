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
  const solutionText1 = "Perception delivers opportunities with clear next steps,";
  const solutionText2 = "turning research into competitive advantage."; // Keep these words together with the period

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
      
      // Highlight specific words in orange
      if (word === 'spend' || word === '15+' || word === 'hours' || word === 'a' || word === 'week' || word === 'scanning') {
        innerSpan.style.color = '#fb923c'; // Orange color
      }
      
      innerSpan.textContent = word;
      wordSpan.appendChild(innerSpan);
      wordSpan.innerHTML += ' '; // Add space after word
      problemContainer.appendChild(wordSpan);
    });
    
    // Handle solution text in two parts for better line break control
    
    // First part (everything before "intelligence layer")
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
    
    // Second part ("intelligence layer." as a single unit with the period)
    const wordSpan = document.createElement('span');
    wordSpan.className = styles.word;
    wordSpan.style.whiteSpace = 'nowrap';
    wordSpan.style.display = 'inline-block';
    wordSpan.setAttribute('data-index', 'p2-0');
    
    const innerSpan = document.createElement('span');
    innerSpan.className = styles.innerWord;
    innerSpan.textContent = solutionText2; // Now includes the period
    innerSpan.style.whiteSpace = 'nowrap';
    
    wordSpan.appendChild(innerSpan);
    // Don't add a space after the last word with period
    solutionContainer.appendChild(wordSpan);
    
    // Get all inner word elements for animation
    const allInnerWords = [
      ...Array.from(problemContainer.querySelectorAll(`.${styles.innerWord}`)),
      ...Array.from(solutionContainer.querySelectorAll(`.${styles.innerWord}`))
    ];
    
    // Initially style all words - simpler initial state
    gsap.set(allInnerWords, {
      opacity: 0.3,
      color: (_, target) => {
        // Preserve orange color for highlighted words
        if (target.style.color === 'rgb(251, 146, 60)') {
          return '#fb923c';
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
          // Keep highlighted words orange
          if (target.style.color === 'rgb(251, 146, 60)') {
            return '#fb923c';
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
          <div className="mx-auto max-w-2xl lg:max-w-3xl">
            <div className="grid gap-8 sm:gap-16 lg:gap-24">
              {/* Problem */}
              <div className="space-y-4 sm:space-y-6">
                <p ref={problemRef} className={styles.textContainer}></p>
              </div>

              {/* Solution */}
              <div className="space-y-4 sm:space-y-6">
                <div className="h-px w-8 sm:w-12 bg-white/20" aria-hidden="true" />
                <p ref={solutionRef} className={styles.textContainer}></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 