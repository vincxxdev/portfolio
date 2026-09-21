'use client';

import React, { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

import ProjectCard from './ProjectCard';
import SectionIntro from './SectionIntro';
import { projectsData } from '@/data/projects';
import { useLocale } from '@/i18n';
import { DUR, EASE_SNAP } from './motion';

/**
 * A chip's result count. The digit is visible but aria-hidden, with `phrase`
 * alongside it as sr-only text — so the accessible name reads "Java 1 progetto"
 * and still contains the visible "Java 1" (SC 2.5.3), and the bare digit is
 * never announced unqualified. An aria-label on the button would displace the
 * visible label instead of extending it.
 *
 * Module scope, not the render body: a component declared inside `Work` gets a
 * fresh identity every render and would remount on every filter click.
 *
 * The selected state inherits its colour rather than dimming it. aria-hidden
 * text sits outside axe's contrast rule, so nothing flags it, but it is still
 * visible information — the `opacity-70` this replaced measured 3.30:1 light
 * and 4.20:1 dark over `bg-signal`, short of the 4.5:1 the rest of the palette
 * is verified against.
 */
const ChipCount = ({
  n,
  phrase,
  selected,
}: {
  n: number;
  phrase: string;
  selected: boolean;
}) => (
  <>
    {/* Selected inherits text-on-signal from the button; unselected dims to
        ink-3. Verified 5.22:1 / 7.13:1 and 4.58:1 / 5.35:1 light / dark. */}
    <span aria-hidden="true" className={selected ? undefined : 'text-ink-3'}>
      {n}
    </span>
    <span className="sr-only">{phrase}</span>
  </>
);

interface WorkProps {
  as?: 'h1' | 'h2';
  basePath?: string;
}

const Work = ({ as = 'h1', basePath = '/projects' }: WorkProps) => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const filterToggleRef = useRef<HTMLElement>(null);

  // Counted here rather than per render: with three projects the union is 14
  // technologies, most of them matching a single project. Showing the count in
  // the chip states the cost of the click before it is made.
  const technologies = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projectsData) {
      for (const tech of project.technologies) {
        counts.set(tech, (counts.get(tech) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const visibleProjects = useMemo(
    () =>
      activeTech
        ? projectsData.filter((project) => project.technologies.includes(activeTech))
        : projectsData,
    [activeTech]
  );

  const count = visibleProjects.length;
  const countPhrase = (n: number) =>
    (n === 1 ? t.work.index.countOne : t.work.index.countMany).replace('{n}', String(n));
  const countLabel = countPhrase(count);

  const chipClass = (selected: boolean) =>
    `label-mono inline-flex items-center gap-2 border px-3 py-2 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] ${
      selected
        ? 'border-signal bg-signal text-on-signal'
        : 'border-hairline text-ink-2 hover:border-hairline-strong hover:text-ink'
    }`;

  return (
    <section id="work" className="relative overflow-clip bg-canvas">
      <div aria-hidden="true" className="bg-section-grid absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionIntro title={t.work.title} lead={t.work.lead} as={as} />

        {/* The index proper. The heading is visually redundant next to the
            page title but load-bearing for the outline: without it the filter
            label had to be the h2, and demoting that alone would restore the
            h1 -> h3 jump. */}
        <h2 className="sr-only">{t.work.index.listHeading}</h2>

        <div className="mt-10 border-y border-hairline">
          <details className="group/filter">
            <summary ref={filterToggleRef} className="flex min-h-16 list-none items-center justify-between gap-4 py-4 text-sm font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-3" id="work-filter-label">
                <SlidersHorizontal aria-hidden="true" className="h-4 w-4 text-signal-ink" />
                {t.work.index.filterLabel}
              </span>
              <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-(--dur-2) group-open/filter:rotate-180" />
            </summary>
            <div className="flex flex-wrap gap-2 pb-6" role="group" aria-labelledby="work-filter-label">
              <button
                type="button"
                onClick={() => setActiveTech(null)}
                aria-pressed={activeTech === null}
                className={chipClass(activeTech === null)}
              >
                {t.work.index.filterAll}
                <ChipCount
                  n={projectsData.length}
                  phrase={countPhrase(projectsData.length)}
                  selected={activeTech === null}
                />
              </button>
              {technologies.map(({ name, count: techCount }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setActiveTech(name)}
                  aria-pressed={activeTech === name}
                  className={chipClass(activeTech === name)}
                >
                  {name}
                  <ChipCount
                    n={techCount}
                    phrase={countPhrase(techCount)}
                    selected={activeTech === name}
                  />
                </button>
              ))}
            </div>
          </details>
        </div>

        <div className="mt-6 flex min-h-11 flex-wrap items-center justify-between gap-3">
          <p className="label-mono text-ink-3" role="status" aria-live="polite" aria-atomic="true">
            {countLabel}{activeTech && ` · ${activeTech}`}
          </p>
          {activeTech && (
            <button
              type="button"
              onClick={() => {
                setActiveTech(null);
                filterToggleRef.current?.focus();
              }}
              className="inline-flex min-h-11 items-center gap-2 text-sm text-signal-ink underline underline-offset-4"
            >
              {t.work.index.resetFilter}
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
        </div>

        {count === 0 ? (
          <p className="mt-14 text-base text-ink-2">{t.work.index.empty}</p>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
