'use client';

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Index pages lead with an h1; sections inside a page use h2. */
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  className?: string;
}

/**
 * The standard section heading treatment, driven by the carriage.
 *
 * Reveals are translate-only. The previous version started eyebrow, heading and
 * lead at `opacity: 0` and animated them in on `whileInView`, which shipped
 * unreadable copy in the prerender — measured at 16 hidden content nodes on
 * /about and 5 on /work, since this component is the shared treatment. Text now
 * ships opaque and merely sits low, so it stays legible if hydration is slow or
 * never happens. Only the decorative measure rule scales from zero.
 */
const SectionIntro = ({
  eyebrow,
  title,
  lead,
  as: Heading = 'h2',
  align = 'left',
  className = '',
}: SectionIntroProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 94%', 'start 60%'],
  });

  const eyebrowY = useTransform(scrollYProgress, [0, 0.6], [14, 0]);
  const titleY = useTransform(scrollYProgress, [0.15, 0.9], [22, 0]);
  const ruleScale = useTransform(scrollYProgress, [0.3, 1], [0, 1]);
  const leadY = useTransform(scrollYProgress, [0.35, 1], [16, 0]);

  const live = !shouldReduceMotion;
  const MotionHeading = Heading === 'h1' ? motion.h1 : motion.h2;

  return (
    <div ref={ref} className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <motion.p
          className="label-mono text-signal-ink"
          style={live ? { y: eyebrowY } : undefined}
        >
          {eyebrow}
        </motion.p>
      )}

      <MotionHeading
        className="mt-3 text-3xl text-ink sm:text-4xl lg:text-5xl"
        style={live ? { y: titleY } : undefined}
      >
        {title}
      </MotionHeading>

      {/* Measure rule — draws out from the text edge rather than fading in.
          Decorative and aria-hidden, so scaling it from zero hides no content. */}
      <motion.div
        aria-hidden="true"
        className={`mt-5 h-px w-16 bg-signal ${align === 'center' ? 'mx-auto' : 'origin-left'}`}
        style={live ? { scaleX: ruleScale } : undefined}
      />

      {lead && (
        <motion.p
          className={`mt-5 max-w-2xl text-base text-ink-2 sm:text-lg ${align === 'center' ? 'mx-auto' : ''}`}
          style={live ? { y: leadY } : undefined}
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
};

export default SectionIntro;
