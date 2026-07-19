'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';

import Button from './ui/Button';
import DownloadCVButton from './ui/DownloadCVButton';
import { siteConfig } from '@/config/site';
import { useLocale } from '@/i18n';

interface HeroProps {
  /** Landing uses in-page anchors; other routes link back to the landing. */
  workHref?: string;
  contactHref?: string;
  scrollHref?: string;
}

const Hero = ({
  workHref = '/work',
  contactHref = '/contact',
  scrollHref = '#status',
}: HeroProps) => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const [activeRole, setActiveRole] = useState(0);

  const displayName = siteConfig.personal.fullName || siteConfig.author;

  useEffect(() => {
    if (shouldReduceMotion || t.hero.titles.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveRole((current) => (current + 1) % t.hero.titles.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion, t.hero.titles]);

  return (
    <section id="home" className="relative isolate overflow-hidden bg-canvas">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="bg-section-grid absolute inset-0" />
        <div className="absolute inset-y-0 left-0 w-px bg-hairline" />
        <div className="absolute inset-y-0 right-0 w-px bg-hairline" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[86svh] w-full max-w-6xl flex-col justify-center px-5 py-24 sm:px-8">
        <p className="label-mono flex items-center gap-3 text-ink-2">
          <span className="h-1.5 w-1.5 shrink-0 bg-signal" />
          {t.hero.greeting}
        </p>

        <h1 className="mt-6 text-[clamp(2.75rem,10vw,6.5rem)] leading-[0.92] tracking-[-0.04em] text-ink">
          {displayName}
        </h1>

        {/* Crawlers read the full role here even while the rotator is mid-swap. */}
        <h2 className="sr-only">
          {displayName} — {t.hero.roleStatic}
        </h2>

        <div className="mt-8 flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-10 shrink-0 bg-hairline-strong sm:w-14" />
          <div className="relative h-6 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={t.hero.titles[activeRole]}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
                transition={{ duration: 0.26, ease: [0.2, 0, 0, 1] }}
                className="label-mono block whitespace-nowrap text-signal-ink"
              >
                {t.hero.titles[activeRole]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* LCP candidate — stays a plain paragraph with no entrance animation. */}
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">
          {t.hero.tagline}
        </p>

        <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button href={workHref} variant="primary" size="lg" className="gap-2.5">
            <span>{t.hero.buttons.projects}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href={contactHref} variant="secondary" size="lg" className="gap-2.5">
            <span>{t.hero.buttons.contact}</span>
            <Mail className="h-4 w-4" aria-hidden="true" />
          </Button>
          <DownloadCVButton variant="secondary" size="lg" />
        </div>

        <a
          href={scrollHref}
          data-cursor-hover
          className="label-mono mt-20 inline-flex w-fit items-center gap-3 text-ink-3 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-signal-ink"
        >
          <span className="flex h-9 w-9 items-center justify-center border border-hairline-strong">
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          {t.hero.scrollDown}
        </a>
      </div>
    </section>
  );
};

export default Hero;
