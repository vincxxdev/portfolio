'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import Button from './ui/Button';
import LandingStatus from './LandingStatus';
import { siteConfig } from '@/config/site';
import { useLocale } from '@/i18n';
import { DUR, EASE_SNAP } from './motion';

interface HeroProps {
  workHref?: string;
  contactHref?: string;
}

const CHAR_STEP = 0.022;

const Hero = ({ workHref = '/work', contactHref = '/contact' }: HeroProps) => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const displayName = siteConfig.personal.fullName || siteConfig.author;
  let charIndex = -1;

  return (
    <section id="home" className="relative isolate overflow-clip bg-canvas">
      <div aria-hidden="true" className="bg-section-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20 lg:pb-24">
        <div className="min-w-0">
          <p className="label-mono flex items-center gap-3 text-ink-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-signal" />
            {t.hero.greeting}
          </p>

          <h1 className="mt-6 text-5xl text-ink sm:text-6xl lg:text-7xl">
            <span className="sr-only">{displayName}</span>
            <span aria-hidden="true" className="flex flex-col items-start gap-1">
              {displayName.split(' ').map((word, wordIndex) => (
                <span key={`${word}-${wordIndex}`} className="whitespace-nowrap">
                  {word.split('').map((char, index) => {
                    charIndex += 1;
                    return (
                      <motion.span
                        key={index}
                        className="inline-block"
                        initial={shouldReduceMotion ? false : { y: '0.2em' }}
                        animate={{ y: '0em' }}
                        transition={{ duration: DUR.d4, ease: EASE_SNAP, delay: charIndex * CHAR_STEP }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </span>
          </h1>

          <h2 className="sr-only">{displayName} — {t.hero.roleStatic}</h2>
          <p className="mt-7 max-w-md text-lg font-medium leading-snug text-signal-ink sm:text-xl">
            {t.hero.roleStatic}
          </p>

          {/* LCP candidate: immediately readable, including without JavaScript. */}
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
            {t.hero.tagline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href={workHref} variant="primary" size="lg" className="gap-2.5">
              <span>{t.hero.buttons.projects}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href={contactHref} variant="secondary" size="lg">
              {t.hero.buttons.contact}
            </Button>
          </div>
        </div>

        <LandingStatus />
      </div>
    </section>
  );
};

export default Hero;
