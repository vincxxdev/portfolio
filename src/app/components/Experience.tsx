'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { useLocale } from '@/i18n';
import { registerIn } from './motion';

const Experience = () => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div>
      <h2 className="text-2xl text-ink sm:text-3xl">{t.about.experience.title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-ink-2 sm:text-base">
        {t.about.experience.description}
      </p>

      {/* The rail sits at left-[5px] so it passes through the centre of the
          10px dots anchored at left-0. Both derive from the same origin. */}
      <ol className="relative mt-10 pl-9">
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[5px] top-2 w-px bg-hairline"
        />

        {t.experience.items.map((item, index) => (
          <motion.li
            key={`${item.company}-${item.date}`}
            {...registerIn(!!shouldReduceMotion, -12, index * 0.08, 'x')}
            className="relative pb-12 last:pb-0"
          >
            <span
              aria-hidden="true"
              className={`absolute -left-9 top-1.5 h-2.5 w-2.5 ${
                index === 0 ? 'bg-signal' : 'border border-hairline-strong bg-canvas'
              }`}
            />

            <div className="flex flex-wrap items-center gap-3">
              <span className="label-mono text-ink-3">{item.date}</span>
              {index === 0 && (
                <span className="label-mono border border-moss px-2 py-0.5 text-moss">
                  {t.about.experience.current}
                </span>
              )}
            </div>

            <h3 className="mt-3 text-lg text-ink sm:text-xl">{item.title}</h3>
            <p className="mt-1 text-sm font-medium text-ink-2">{item.company}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-2">{item.description}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
};

export default Experience;
