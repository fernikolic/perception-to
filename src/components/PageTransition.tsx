import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const { pathname } = useLocation();
  
  // On route change, ensure we're at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // Add a key based on the path to force re-render
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition; 