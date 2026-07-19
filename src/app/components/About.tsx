'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import SectionIntro from './SectionIntro';
import Experience from './Experience';
import Education from './Education';
import Certifications from './Certifications';
import Skills from './Skills';
import Languages from './Languages';
import { useLocale } from '@/i18n';
import { registerIn } from './motion';

interface AboutProps {
  as?: 'h1' | 'h2';
}

const About = ({ as = 'h1' }: AboutProps) => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative overflow-clip bg-canvas">
      <div aria-hidden="true" className="bg-section-grid absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionIntro title={t.about.title} lead={t.about.lead} as={as} />

        <motion.div
          {...registerIn(!!shouldReduceMotion, 12)}
          className="mt-12 max-w-3xl space-y-5"
        >
          {t.about.bio.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-ink-2">
              {paragraph}
            </p>
          ))}
        </motion.div>

        <div className="mt-20 space-y-20 border-t border-hairline pt-20 sm:mt-24 sm:space-y-24 sm:pt-24">
          <Experience />
          <Education />
          <Certifications />
          <Skills />
          <Languages />
        </div>
      </div>
    </section>
  );
};

export default About;
