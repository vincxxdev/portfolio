'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import Card from './ui/Card';
import { useLocale } from '@/i18n';
import { registerIn } from './motion';

interface LandingPathsProps {
  workHref?: string;
  aboutHref?: string;
  contactHref?: string;
}

const LandingPaths = ({
  workHref = '/work',
  aboutHref = '/about',
  contactHref = '/contact',
}: LandingPathsProps) => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const paths = t.landing.paths;

  const entries = [
    { href: workHref, ...paths.work },
    { href: aboutHref, ...paths.about },
    { href: contactHref, ...paths.contact },
  ];

  return (
    <section className="relative overflow-clip bg-canvas">
      <div aria-hidden="true" className="bg-section-grid absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="label-mono text-ink-3">{paths.label}</h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.href}
              {...registerIn(!!shouldReduceMotion, 14, index * 0.07)}
              className="h-full"
            >
              <Link href={entry.href} className="block h-full">
                <Card interactive padding="lg" className="h-full">
                  <span className="label-mono text-ink-3">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="mt-6 flex items-start justify-between gap-4 text-xl text-ink">
                    {entry.title}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-ink-3 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:text-signal-ink"
                    />
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{entry.description}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPaths;
