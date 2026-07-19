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
          transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
          className="fixed inset-0 z-[9998] pointer-events-none"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(ellipse at center, rgba(19, 20, 22, 0.55) 0%, rgba(19, 20, 22, 0.25) 50%, transparent 80%)'
              : 'radial-gradient(ellipse at center, rgba(231, 232, 228, 0.55) 0%, rgba(231, 232, 228, 0.25) 50%, transparent 80%)',
          }}
        />
      )}
    </AnimatePresence>
  );
};
