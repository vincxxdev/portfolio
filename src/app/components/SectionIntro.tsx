'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Index pages lead with an h1; sections inside a page use h2. */
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  className?: string;
}

const SectionIntro = ({
  eyebrow,
  title,
  lead,
  as: Heading = 'h2',
  align = 'left',
  className = '',
}: SectionIntroProps) => {
  const shouldReduceMotion = useReducedMotion();

  const enter = shouldReduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
    : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <div
      className={`
        ${align === 'center' ? 'text-center' : ''}
        ${className}
      `}
    >
      {eyebrow && (
        <motion.p
          {...enter}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.26, ease: [0.2, 0, 0, 1] }}
          className="label-mono text-signal-ink"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.div
        {...enter}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.38, ease: [0.2, 0, 0, 1], delay: 0.04 }}
      >
        <Heading className="mt-3 text-3xl text-ink sm:text-4xl lg:text-5xl">{title}</Heading>
      </motion.div>

      {/* Measure rule — draws out from the text edge rather than fading in. */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.38, ease: [0.2, 0, 0, 1], delay: 0.12 }}
        className={`mt-5 h-px w-16 bg-signal ${align === 'center' ? 'mx-auto' : 'origin-left'}`}
      />

      {lead && (
        <motion.p
          {...enter}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.38, ease: [0.2, 0, 0, 1], delay: 0.16 }}
          className={`mt-5 max-w-2xl text-base text-ink-2 sm:text-lg ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
};

export default SectionIntro;
