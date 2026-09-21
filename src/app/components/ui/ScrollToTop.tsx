'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLocale } from '@/i18n';

export const ScrollToTop: React.FC = () => {
  const { t } = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 500);
        ticking = false;
      });
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const hidden = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 };
  const shown = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={hidden}
          animate={shown}
          exit={hidden}
          transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center rounded-sm border border-hairline-strong bg-raised text-ink-2 transition-colors hover:bg-signal hover:text-on-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          aria-label={t.accessibility.scrollToTop}
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
