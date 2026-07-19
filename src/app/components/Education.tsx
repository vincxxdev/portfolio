'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { useLocale } from '@/i18n';

const Education = () => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div>
      <h3 className="text-2xl text-ink sm:text-3xl">{t.about.education.title}</h3>
      <p className="mt-3 max-w-2xl text-sm text-ink-2 sm:text-base">
        {t.about.education.description}
      </p>

      <ol className="relative mt-10 pl-9">
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[5px] top-2 w-px bg-hairline"
        />

        {t.cvData.education.map((item, index) => (
          <motion.li
            key={`${item.institution}-${item.period}`}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.32, ease: [0.2, 0, 0, 1], delay: index * 0.08 }}
            className="relative pb-12 last:pb-0"
          >
            <span
              aria-hidden="true"
              className={`absolute -left-9 top-1.5 h-2.5 w-2.5 ${
                index === 0 ? 'bg-signal' : 'border border-hairline-strong bg-canvas'
              }`}
            />

            <span className="label-mono text-ink-3">{item.period}</span>
            <h4 className="mt-3 text-lg text-ink sm:text-xl">{item.title}</h4>
            <p className="mt-1 text-sm font-medium text-ink-2">
              {item.institution} · {item.location}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-2">{item.description}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
};

export default Education;
