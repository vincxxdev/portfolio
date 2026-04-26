'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeTransition = () => {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (theme) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [theme]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9998] pointer-events-none"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(ellipse at center, rgba(10, 25, 47, 0.55) 0%, rgba(10, 25, 47, 0.25) 50%, transparent 80%)'
              : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.25) 50%, transparent 80%)',
          }}
        />
      )}
    </AnimatePresence>
  );
};
