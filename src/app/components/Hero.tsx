'use client';

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import Button from './ui/Button';
import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, ArrowRight, Gauge, Mail } from 'lucide-react';
import DownloadCVButton from './ui/DownloadCVButton';
import DecodeText from './ui/DecodeText';
import { siteConfig } from '@/config/site';
import { useLocale } from '@/i18n';
import { skillsData } from '@/data/skills';

const HeroSignalField = dynamic(() => import('./ui/HeroSignalField'), {
  ssr: false,
  loading: () => null,
});

const Hero = () => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 120, damping: 20, mass: 0.35 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 120, damping: 20, mass: 0.35 });
  const contentX = useTransform(smoothPointerX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-18, 18]);
  const contentY = useTransform(smoothPointerY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-12, 12]);
  const visualX = useTransform(smoothPointerX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [24, -24]);
  const visualY = useTransform(smoothPointerY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [16, -16]);
  const [activeRole, setActiveRole] = useState(0);

  const displayName = siteConfig.personal.fullName || siteConfig.author;
  const nameSegments = displayName.trim().split(/\s+/);
  const primaryName = nameSegments.slice(0, -1).join(' ') || nameSegments[0] || displayName;
  const accentName = nameSegments.length > 1 ? nameSegments[nameSegments.length - 1] : '';
  const [lighthouseScore, lighthouseScoreMax = '100'] = t.hero.lighthouse.score.split('/');

  const orbitSkills = useMemo(() => {
    const preferredNames = ['TypeScript', 'React', 'Node.js', 'JavaScript', 'Git', 'Java'];

    return preferredNames.filter((skillName) => skillsData.some((skill) => skill.name === skillName));
  }, []);

  const orbitRings = useMemo(
    () => [
      {
        radius: 'clamp(7rem, 18vw, 9rem)',
        duration: 18,
        reverse: false,
        offset: 16,
        items: orbitSkills.slice(0, 3),
      },
      {
        radius: 'clamp(10rem, 24vw, 13rem)',
        duration: 28,
        reverse: true,
        offset: 44,
        items: orbitSkills.slice(3),
      },
    ],
    [orbitSkills],
  );

  useEffect(() => {
    if (shouldReduceMotion || t.hero.titles.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveRole((currentRole) => (currentRole + 1) % t.hero.titles.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion, t.hero.titles]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="home"
        className="relative isolate overflow-hidden bg-primary-background"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
      >
        <div className="absolute inset-0">
          <HeroSignalField />
          <div
            className="absolute inset-0 opacity-25 [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(100, 116, 139, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.18) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_25%,transparent_72%,rgba(15,23,42,0.12)_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.12)_0%,transparent_22%,transparent_74%,rgba(10,25,47,0.32)_100%)]" />
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent opacity-70" />
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent opacity-50" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-8">
            <motion.div
              style={{ x: contentX, y: contentY }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-text/80 sm:text-sm"
              >
                <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_var(--color-accent)]" />
                <span>{t.hero.greeting}</span>
              </motion.div>

              <div className="relative mt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="pointer-events-none absolute -inset-x-6 -inset-y-3 rounded-2xl bg-accent/[0.03] blur-2xl"
                />
                <h1 className="text-5xl font-black leading-[0.92] text-primary-text sm:text-6xl md:text-7xl lg:text-[6.5rem]">
                  <DecodeText
                    text={primaryName}
                    className="block"
                    delay={500}
                    duration={1400}
                  />
                  {accentName ? (
                    <DecodeText
                      text={accentName}
                      className="block bg-gradient-to-r from-accent via-cyan-300 to-primary-text bg-clip-text text-transparent"
                      delay={800}
                      duration={1400}
                    />
                  ) : null}
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.6 }}
                className="mt-8 flex items-center gap-4"
              >
                <div className="h-px w-12 shrink-0 bg-gradient-to-r from-accent/50 to-transparent sm:w-16" />
                <div className="relative h-8 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={t.hero.titles[activeRole]}
                      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="absolute left-0 top-0 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.34em] text-accent sm:text-base"
                    >
                      {t.hero.titles[activeRole]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.8 }}
                className="mt-6 max-w-2xl text-sm leading-relaxed tracking-wide text-secondary-text/70 sm:text-base"
              >
                {t.hero.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.95 }}
                className="mt-8 max-w-2xl rounded-2xl border border-accent/20 bg-primary-background/45 p-4 shadow-lg shadow-accent/5 backdrop-blur-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                      <Gauge className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                        {t.hero.lighthouse.label}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-secondary-text/75">
                        {t.hero.lighthouse.caption}
                      </span>
                    </span>
                  </div>

                  <div className="flex shrink-0 items-end gap-1">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-4xl font-black leading-none text-transparent">
                      {lighthouseScore}
                    </span>
                    <span className="pb-1 text-sm font-semibold text-secondary-text/70">
                      /{lighthouseScoreMax}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {t.hero.lighthouse.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="inline-flex h-8 items-center gap-2 rounded-full border border-secondary-text/15 bg-secondary-background/50 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-secondary-text/80"
                    >
                      <span className="text-accent">100</span>
                      <span>{metric}</span>
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 2.0 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              >
                <Button href="#projects" variant="primary" size="lg" className="gap-2">
                  <span>{t.hero.buttons.projects}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="#contacts" variant="secondary" size="lg" className="gap-2">
                  <span>{t.hero.buttons.contact}</span>
                  <Mail className="h-4 w-4" />
                </Button>
                <DownloadCVButton variant="secondary" size="lg" />
              </motion.div>

              <motion.a
                href="#about"
                data-cursor-hover
                aria-label={t.hero.scrollDown}
                initial={{ opacity: 0 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, 8, 0] }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.6, delay: 2.2 }
                    : { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }
                }
                className="mt-14 inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.24em] text-secondary-text/75 transition-colors duration-300 hover:text-accent"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary-text/15 bg-primary-background/30 backdrop-blur-sm">
                  <ArrowDown className="h-4 w-4" />
                </span>
                <span>{t.hero.scrollDown}</span>
              </motion.a>
            </motion.div>

            <motion.div
              style={{ x: visualX, y: visualY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
              className="relative mx-auto aspect-square w-full max-w-[34rem]"
            >
              <div className="absolute inset-0 rounded-full border border-secondary-text/10" />
              <div className="absolute inset-[8%] rounded-full border border-accent/18" />
              <div className="absolute inset-[18%] rounded-full border border-secondary-text/14" />
              <div className="absolute inset-[28%] rounded-full border border-accent/16" />

              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

              {orbitRings.map((ring, ringIndex) => (
                <div
                  key={`${ring.radius}-${ringIndex}`}
                  className="absolute inset-0"
                  style={{
                    animation:
                      shouldReduceMotion || ring.items.length === 0
                        ? undefined
                        : `${ring.reverse ? 'orbit-reverse' : 'orbit'} ${ring.duration}s linear infinite`,
                  }}
                >
                  {ring.items.map((skill, itemIndex) => {
                    const angle = ring.offset + (360 / ring.items.length) * itemIndex;

                    return (
                      <div
                        key={`${skill}-${ringIndex}`}
                        className="absolute left-1/2 top-1/2"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * ${ring.radius}))`,
                        }}
                      >
                        <div
                          className="rounded-full border border-secondary-text/15 bg-primary-background/45 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary-text/85 backdrop-blur-md sm:text-xs"
                          style={{
                            transform: `rotate(${-angle}deg)`,
                            animation:
                              shouldReduceMotion || ring.items.length === 0
                                ? undefined
                                : `${ring.reverse ? 'orbit' : 'orbit-reverse'} ${ring.duration}s linear infinite`,
                          }}
                        >
                          {skill}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

              <div className="absolute inset-[22%] overflow-hidden rounded-full border border-accent/20 bg-primary-background/25">
                <div className="absolute inset-[12%] rounded-full border border-secondary-text/12" />
                <div
                  className={`absolute left-[8%] right-[8%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/50 to-transparent ${shouldReduceMotion ? '' : 'animate-signal-sweep'}`}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-secondary-text/70">
                    {siteConfig.name}
                  </span>
                  <div className="mt-4 flex h-3 w-3 items-center justify-center rounded-full bg-accent shadow-[0_0_22px_var(--color-accent)]" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`core-${t.hero.titles[activeRole]}`}
                      initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="mt-5 max-w-[12rem] text-base font-semibold uppercase tracking-[0.28em] text-primary-text/90 sm:text-lg"
                    >
                      {t.hero.titles[activeRole]}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="absolute bottom-[18%] left-1/2 flex -translate-x-1/2 items-end gap-1.5">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <motion.span
                      key={`bar-${index}`}
                      className="w-1 rounded-full bg-accent/75"
                      animate={
                        shouldReduceMotion
                          ? { height: 10 + (index % 3) * 4, opacity: 0.65 }
                          : { height: [8, 14 + (index % 4) * 6, 8], opacity: [0.4, 1, 0.4] }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : {
                              duration: 1.6 + index * 0.08,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: index * 0.12,
                            }
                      }
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default Hero;
