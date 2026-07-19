'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { siteConfig } from '@/config/site';
import { useLocale } from '@/i18n';

const LandingStatus = () => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const status = t.landing.status;

  const rows = [
    { label: status.roleLabel, value: status.roleValue },
    { label: status.studyLabel, value: status.studyValue },
    { label: status.availabilityLabel, value: status.availabilityValue, positive: true },
    { label: status.locationLabel, value: siteConfig.personal.location },
  ];

  return (
    <section id="status" className="relative border-y border-hairline bg-raised">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <h2 className="label-mono text-ink-3">{status.label}</h2>

        <dl className="mt-8 grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((row, index) => (
            <motion.div
              key={row.label}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.26, ease: [0.2, 0, 0, 1], delay: index * 0.05 }}
              className="flex flex-col gap-2.5 bg-raised p-5"
            >
              <dt className="label-mono text-ink-3">{row.label}</dt>
              <dd className="flex items-start gap-2 text-sm leading-snug text-ink">
                {row.positive && (
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-moss" />
                )}
                {row.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default LandingStatus;
