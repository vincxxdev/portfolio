'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/i18n';
import { useSound } from './hooks/useSound';

export const LanguageSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const { playSound } = useSound();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  const handleToggle = () => {
    playSound('pop');
    setLocale(locale === 'it' ? 'en' : 'it');
  };

  return (
    <motion.button
      aria-label={locale === 'it' ? t.accessibility.switchToEnglish : t.accessibility.switchToItalian}
      type="button"
      className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:ring-2 ring-cyan-500 transition-all relative overflow-hidden"
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="text-xs font-bold text-cyan-800 dark:text-cyan-300 select-none"
        >
          {locale.toUpperCase()}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};
