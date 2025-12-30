import { useEffect, useState, useCallback } from 'react';
import { List } from 'lucide-react';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

// Headings to exclude from ToC (signup forms, CTAs, etc.)
const EXCLUDED_HEADING_PATTERNS = [
  /sign\s*up/i,
  /subscribe/i,
  /newsletter/i,
  /join\s*(our|the)/i,
  /get\s*(the|our)/i,
];

// Extract headings from HTML for ToC
export function extractHeadings(html: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const elements = doc.querySelectorAll('h2, h3');

  let tocIndex = 0;
  elements.forEach((el) => {
    const text = el.textContent?.trim() || '';

    // Skip empty headings or excluded patterns
    if (!text) return;
    if (EXCLUDED_HEADING_PATTERNS.some(pattern => pattern.test(text))) return;

    const id = `toc-${tocIndex}`;
    headings.push({
      id,
      text,
      level: parseInt(el.tagName[1])
    });
    tocIndex++;
  });

  return headings;
}

// Hook to add IDs to headings in the DOM after render
export function useHeadingIds(headings: TocHeading[], containerSelector: string = '.prose') {
  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const elements = container.querySelectorAll('h2, h3');
    let tocIndex = 0;

    elements.forEach((el) => {
      const text = el.textContent?.trim() || '';

      // Skip excluded headings (same logic as extractHeadings)
      if (!text) return;
      if (EXCLUDED_HEADING_PATTERNS.some(pattern => pattern.test(text))) return;

      if (headings[tocIndex]) {
        el.id = headings[tocIndex].id;
      }
      tocIndex++;
    });
  }, [headings, containerSelector]);
}

// Legacy function - kept for compatibility but not recommended
export function addHeadingIds(html: string, headings: TocHeading[]): string {
  // Just return the original HTML - IDs will be added via useHeadingIds hook
  return html;
}

interface ArticleTableOfContentsProps {
  headings: TocHeading[];
}

export function ArticleTableOfContents({ headings }: ArticleTableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState<string>(headings[0]?.id || '');

  useEffect(() => {
    if (headings.length === 0) return;

    // Use scroll-based detection for more accurate tracking
    const handleScroll = () => {
      const headerOffset = 150; // Account for sticky header

      // Find the heading that's currently in view
      let currentHeading = headings[0]?.id || '';

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the heading is above the threshold, it's the current section
          if (rect.top <= headerOffset) {
            currentHeading = heading.id;
          }
        }
      }

      setActiveHeading(currentHeading);
    };

    // Initial check
    handleScroll();

    // Listen to scroll events with throttling
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, [headings]);

  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120; // Match the scroll-mt value
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update active heading immediately for better UX
      setActiveHeading(id);
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block w-56 flex-shrink-0">
      <div className="sticky top-32">
        <div className="flex items-center gap-2 text-xs font-semibold text-black/40 uppercase tracking-wider mb-4">
          <List className="w-3.5 h-3.5" />
          In this edition
        </div>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`block w-full text-left text-[13px] leading-snug py-1.5 transition-all duration-200 border-l-2 ${
                heading.level === 3 ? 'pl-5' : 'pl-3'
              } ${
                activeHeading === heading.id
                  ? 'border-orange-500 text-black font-medium'
                  : 'border-transparent text-black/50 hover:text-black hover:border-black/20'
              }`}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
