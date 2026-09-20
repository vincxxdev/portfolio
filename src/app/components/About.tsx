'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import SectionIntro from './SectionIntro';
import AboutIndex, { type AboutSection } from './AboutIndex';
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

  // Ids live here, next to the index that targets them, so the two cannot
  // drift apart. Each sub-component still owns its own h2.
  const blocks: (AboutSection & { render: () => React.ReactElement })[] = [
    { id: 'experience', label: t.about.experience.title, render: () => <Experience /> },
    { id: 'education', label: t.about.education.title, render: () => <Education /> },
    {
      id: 'certifications',
      label: t.about.certifications.title,
      render: () => <Certifications />,
    },
    { id: 'skills', label: t.about.skills.title, render: () => <Skills /> },
    { id: 'languages', label: t.about.languages.title, render: () => <Languages /> },
  ];

  return (
    // overflow-clip, never overflow-hidden: `hidden` would make this a scroll
    // container and the index's `lg:sticky` would silently never stick.
    <section id="about" className="relative overflow-clip bg-canvas">
      <div aria-hidden="true" className="bg-section-grid absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionIntro title={t.about.title} lead={t.about.lead} as={as} />

        <motion.div {...registerIn(!!shouldReduceMotion, 12)} className="mt-10 w-full">
          <dl className="grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
            {t.about.profileFacts.map((fact) => (
              <div key={fact.label} className="bg-raised p-5 sm:p-6">
                <dt className="label-mono text-ink-3">{fact.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <details className="group mt-4 border-y border-hairline">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
              {t.about.profileLabel}
              <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-(--dur-2) group-open:rotate-180" />
            </summary>
            <div className="grid gap-4 border-t border-hairline py-5 text-sm leading-relaxed text-ink-2 sm:grid-cols-3 sm:gap-6">
              {t.about.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </details>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-hairline pt-14 sm:mt-24 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14 lg:pt-16">
          <AboutIndex
            sections={blocks.map(({ id, label }) => ({ id, label }))}
            label={t.about.index.label}
          />

          <div className="min-w-0 space-y-20 sm:space-y-24">
            {blocks.map((block) => (
              // No scroll-mt here: `scroll-padding-top: 6rem` in globals.css
              // already clears the 72px navbar, and the two stack — measured at
              // 208px of dead space above the target with both in play.
              <section key={block.id} id={block.id}>
                {block.render()}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
