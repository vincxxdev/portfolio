'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useSound } from './hooks/useSound';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { playSound } = useSound();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch
    return <div className="h-9 w-9" />;
  }

  const isDark = theme === 'dark';

  const handleThemeToggle = () => {
    playSound('pop');
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <motion.button
      aria-label="Toggle Dark Mode"
      type="button"
      className="h-9 w-9 flex items-center justify-center rounded-sm border border-hairline bg-sunken text-ink hover:border-signal hover:text-signal-ink transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] relative overflow-hidden"
      onClick={handleThemeToggle}
      whileHover={shouldReduceMotion ? undefined : { y: -1 }}
      whileTap={shouldReduceMotion ? undefined : { y: 1 }}
      transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
          >
            <Moon className="h-[18px] w-[18px]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
          >
            <Sun className="h-[18px] w-[18px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};