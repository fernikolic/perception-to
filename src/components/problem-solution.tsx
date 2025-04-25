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
  
  const problemText = "Institutional investors, analysts, and fintech operators spend 15+ hours a week scanning for market sentiment and narrative shifts.";
  // Break solution text into pieces to handle separately
  const solutionText1 = "Perception distills that work into a real-time, trusted";
  const solutionText2 = "intelligence layer."; // Keep these words together with the period

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
      if (word === 'spend' || word === '15+' || word === 'hours' || word === 'a' || word === 'week') {
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
    
    // Initially style all words
    gsap.set(allInnerWords, { 
      opacity: 0.15,
      filter: "blur(2px)",
      scale: 0.95,
      color: (_, target) => {
        // Preserve orange color for highlighted words
        if (target.style.color === 'rgb(251, 146, 60)') {
          return '#fb923c';
        }
        return "rgba(255,255,255,0.5)";
      }
    });
    
    // Create a basic timeline
    const tl = gsap.timeline();
    
    // First, reveal first few words immediately but with a soft animation
    for (let i = 0; i < Math.min(3, allInnerWords.length); i++) {
      tl.to(allInnerWords[i], { 
        opacity: 1, 
        filter: "blur(0px)",
        scale: 1,
        color: (_, target) => {
          // Keep highlighted words orange
          if (target.style.color === 'rgb(251, 146, 60)') {
            return '#fb923c';
          }
          return "rgba(255,255,255,1)";
        },
        duration: 0.2,
        ease: "power2.out" 
      }, i * 0.03);
    }
    
    // Then reveal the rest of the words
    for (let i = 3; i < allInnerWords.length; i++) {
      const startPosition = 0.05 + ((i - 3) / (allInnerWords.length - 3)) * 0.25;
      
      tl.to(allInnerWords[i], { 
        opacity: 1, 
        filter: "blur(0px)",
        scale: 1,
        color: (_, target) => {
          // Keep highlighted words orange
          if (target.style.color === 'rgb(251, 146, 60)') {
            return '#fb923c';
          }
          return "rgba(255,255,255,1)";
        },
        duration: 0.15,
        ease: "power1.inOut"
      }, startPosition);
    }
    
    // Make sure all words are fully revealed by 35% of the timeline
    tl.set(allInnerWords, { 
      opacity: 1, 
      filter: "blur(0px)",
      scale: 1,
    }, 0.35);
    
    // Create a simpler ScrollTrigger setup
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=400%", // Scroll distance - adjust as needed
      pin: true,
      pinSpacing: true,
      scrub: 1,
      animation: tl,
    });
    
    // Cleanup
    return () => {
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