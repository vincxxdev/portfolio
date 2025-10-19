'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeTransition = () => {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (theme) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 600);
      return () => clearTimeout(timer);
    }
  }, [theme]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9998] pointer-events-none"
          style={{
            background: theme === 'dark' 
              ? 'radial-gradient(circle at center, rgba(34, 211, 238, 0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle at center, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
          }}
        />
      )}
    </AnimatePresence>
  );
};
