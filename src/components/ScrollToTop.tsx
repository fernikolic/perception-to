import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component scrolls the window to the top
 * whenever the user navigates to a new route
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top with a small delay to ensure content has rendered
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant' // Use 'smooth' for animated scrolling
      });
    }, 0);
  }, [pathname]);

  return null; // This component doesn't render anything
} 