'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/i18n';

export const LocaleTransition = ({ children }: { children: React.ReactNode }) => {
  const { isSwitching } = useLocale();

  return (
    <motion.div
      animate={{
        opacity: isSwitching ? 0 : 1,
        y: isSwitching ? -3 : 0,
      }}
      transition={{
        duration: isSwitching ? 0.08 : 0.15,
        ease: 'easeInOut',
      }}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
};
