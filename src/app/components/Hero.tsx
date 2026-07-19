'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';

import Button from './ui/Button';
import DownloadCVButton from './ui/DownloadCVButton';
import { siteConfig } from '@/config/site';
import { useLocale } from '@/i18n';
import { DUR, EASE_MECH, EASE_SNAP } from './motion';

interface HeroProps {
  workHref?: string;
  contactHref?: string;
}

/** Per-character lay-down interval. Tuned so the sweep and the type agree. */
const CHAR_STEP = 0.022;

/**
 * Kinetic type as a print head, not a fade. Every character is painted at full
 * opacity from the first frame — the h1 is a plausible LCP element, so nothing
 * here gates its paint. The only animated property is translateY, which the
 * compositor handles and which cannot shift layout, so CLS stays at zero.
 *
 * The signal bar sweeping across is the *cause* the motion implies: the head
 * passes, the type settles behind it.
 */
const Hero = ({ workHref = '/work', contactHref = '/contact' }: HeroProps) => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeRole, setActiveRole] = useState(0);

  const displayName = siteConfig.personal.fullName || siteConfig.author;
  const words = displayName.split(' ');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  // The cue retires as soon as the carriage starts moving.
  const cueOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  useEffect(() => {
    if (shouldReduceMotion || t.hero.titles.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveRole((current) => (current + 1) % t.hero.titles.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion, t.hero.titles]);

  let charIndex = -1;
  const totalChars = displayName.replace(/\s/g, '').length;

  return (
    // overflow-clip, never overflow-hidden: `hidden` makes this a scroll
    // container and silently kills any `position: sticky` descendant.
    <section id="home" ref={sectionRef} className="relative isolate overflow-clip bg-canvas">
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

        <div className="relative mt-6">
          <h1 className="text-[clamp(2.75rem,10vw,6.5rem)] leading-[0.92] tracking-[-0.04em] text-ink">
            <span className="sr-only">{displayName}</span>
            <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em]">
              {words.map((word) => (
                <span key={word} className="whitespace-nowrap">
                  {word.split('').map((char, i) => {
                    charIndex += 1;
                    const delay = charIndex * CHAR_STEP;
                    return (
                      <motion.span
                        key={`${word}-${i}`}
                        className="inline-block will-change-transform"
                        initial={shouldReduceMotion ? false : { y: '0.3em' }}
                        animate={{ y: '0em' }}
                        transition={{ duration: DUR.d4, ease: EASE_SNAP, delay }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </span>
          </h1>

          {/* The head that lays the type down. A full-width layer translated by
              a percentage of its own box travels exactly the heading's width,
              with no measurement. Transform + opacity only. */}
          {!shouldReduceMotion && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 will-change-transform"
              initial={{ x: '0%', opacity: 0 }}
              animate={{ x: '100%', opacity: [0, 1, 1, 0] }}
              transition={{
                duration: totalChars * CHAR_STEP + DUR.d4,
                ease: EASE_MECH,
                times: [0, 0.08, 0.88, 1],
              }}
            >
              <span className="absolute inset-y-0 left-0 w-[2px] bg-signal" />
            </motion.span>
          )}
        </div>

        {/* Crawlers read the full role here even while the rotator is mid-swap. */}
        <h2 className="sr-only">
          {displayName} — {t.hero.roleStatic}
        </h2>

        <div className="mt-8 flex items-center gap-4">
          <motion.span
            aria-hidden="true"
            className="h-px w-10 shrink-0 origin-left bg-hairline-strong sm:w-14"
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: DUR.d4, ease: EASE_SNAP, delay: totalChars * CHAR_STEP }}
          />
          <RoleReadout role={t.hero.titles[activeRole]} reduced={!!shouldReduceMotion} />
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

        {/* A cue, not a control. This was an `<a href="#status">` — the last
            surviving fragment of the removed single-page anchor architecture.
            Scrolling is the user's own gesture, so it needs no link. */}
        <motion.p
          className="label-mono mt-20 inline-flex w-fit items-center gap-3 text-ink-3"
          style={shouldReduceMotion ? undefined : { opacity: cueOpacity }}
        >
          <span className="flex h-9 w-9 items-center justify-center border border-hairline-strong">
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          {t.hero.scrollDown}
        </motion.p>
      </div>
    </section>
  );
};

/**
 * The rotator reads as a mechanical index, not a crossfade: a signal bar wipes
 * across the slot and the new value is behind it when it clears.
 */
const RoleReadout = ({ role, reduced }: { role: string; reduced: boolean }) => (
  <div className="relative h-6 overflow-hidden">
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={role}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -14 }}
        transition={{ duration: DUR.d3, ease: EASE_SNAP }}
        className="label-mono block whitespace-nowrap text-signal-ink"
      >
        {role}
      </motion.span>
    </AnimatePresence>

    {!reduced && (
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`bar-${role}`}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 will-change-transform"
          initial={{ x: '0%', opacity: 0 }}
          animate={{ x: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: DUR.d4, ease: EASE_MECH, times: [0, 0.12, 0.8, 1] }}
        >
          <span className="absolute inset-y-0 left-0 w-[2px] bg-signal" />
        </motion.span>
      </AnimatePresence>
    )}
  </div>
);

export default Hero;
