'use client';

import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import ProjectCard from './ProjectCard';
import SectionIntro from './SectionIntro';
import { projectsData } from '@/data/projects';
import { useLocale } from '@/i18n';
import { DUR, EASE_SNAP } from './motion';

interface WorkProps {
  as?: 'h1' | 'h2';
  basePath?: string;
}

const Work = ({ as = 'h1', basePath = '/projects' }: WorkProps) => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const technologies = useMemo(() => {
    const seen = new Set<string>();
    for (const project of projectsData) {
      for (const tech of project.technologies) seen.add(tech);
    }
    return [...seen].sort((a, b) => a.localeCompare(b));
  }, []);

  const visibleProjects = useMemo(
    () =>
      activeTech
        ? projectsData.filter((project) => project.technologies.includes(activeTech))
        : projectsData,
    [activeTech]
  );

  const count = visibleProjects.length;
  const countLabel = (count === 1 ? t.work.index.countOne : t.work.index.countMany).replace(
    '{n}',
    String(count)
  );

  const chipClass = (selected: boolean) =>
    `label-mono border px-3 py-2 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] ${
      selected
        ? 'border-signal bg-signal text-on-signal'
        : 'border-hairline text-ink-2 hover:border-hairline-strong hover:text-ink'
    }`;

  return (
    <section id="work" className="relative overflow-hidden bg-canvas">
      <div aria-hidden="true" className="bg-section-grid absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionIntro title={t.work.title} lead={t.work.lead} as={as} />

        <div className="mt-14 border-y border-hairline py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="label-mono text-ink-3" id="work-filter-label">
              {t.work.index.filterLabel}
            </h2>
            <p className="label-mono text-ink-3" aria-live="polite">
              {countLabel}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-labelledby="work-filter-label">
            <button
              type="button"
              onClick={() => setActiveTech(null)}
              aria-pressed={activeTech === null}
              className={chipClass(activeTech === null)}
            >
              {t.work.index.filterAll}
            </button>
            {technologies.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => setActiveTech(tech)}
                aria-pressed={activeTech === tech}
                className={chipClass(activeTech === tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {count === 0 ? (
          <p className="mt-14 text-base text-ink-2">{t.work.index.empty}</p>
        ) : (
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                // Mount animation, not a scroll reveal: the grid remounts when
                // the technology filter changes. Translate-only, so results are
                // legible in the prerender rather than starting invisible.
                initial={shouldReduceMotion ? false : { y: 16 }}
                animate={{ y: 0 }}
                transition={{ duration: DUR.d3, ease: EASE_SNAP, delay: index * 0.05 }}
                className="h-full"
              >
                <ProjectCard project={project} index={index} basePath={basePath} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;
