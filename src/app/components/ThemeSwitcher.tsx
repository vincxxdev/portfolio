'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Non reindirizziamo nulla sul server per evitare hydration mismatch
    return <div className="h-9 w-9" />;
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      aria-label="Toggle Dark Mode"
      type="button"
      className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:ring-2 ring-cyan-500 transition-all relative overflow-hidden"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Moon className="h-5 w-5 text-slate-200" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Sun className="h-5 w-5 text-slate-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};