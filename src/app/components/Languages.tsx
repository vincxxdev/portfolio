'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { useLocale } from '@/i18n';

const Languages = () => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div>
      <h3 className="text-2xl text-ink sm:text-3xl">{t.about.languages.title}</h3>
      <p className="mt-3 max-w-2xl text-sm text-ink-2 sm:text-base">
        {t.about.languages.description}
      </p>

      <dl className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
        {t.languages.items.map((language, index) => (
          <motion.div
            key={language.name}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.26, ease: [0.2, 0, 0, 1], delay: index * 0.06 }}
            className="flex items-baseline justify-between gap-4 bg-raised p-5"
          >
            <dt className="text-base text-ink">{language.name}</dt>
            <dd className="text-right">
              <span className="label-mono block text-signal-ink">{language.level}</span>
              {language.levelDescription && (
                <span className="mt-1 block text-xs text-ink-3">{language.levelDescription}</span>
              )}
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  );
};

export default Languages;
