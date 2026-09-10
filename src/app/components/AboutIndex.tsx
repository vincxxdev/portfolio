'use client';

import React, { useEffect, useState } from 'react';

export interface AboutSection {
  id: string;
  label: string;
}

interface AboutIndexProps {
  sections: AboutSection[];
  label: string;
}

/**
 * In-page index for /about, the one page long enough to need wayfinding.
 *
 * These are the only `#section` hrefs on the site. The ban in CLAUDE.md is on
 * the removed single-page architecture — a global nav that scrolled instead of
 * routing. This is intra-document navigation on a single route, which is what
 * fragments are for, and `scroll-padding-top: 6rem` already lands the target
 * clear of the fixed navbar.
 *
 * The label is a <span> referenced by aria-labelledby, not a heading: it names
 * a set of controls, not a section of content, so it stays out of the document
 * outline (same reasoning as Work's filter label).
 */
const AboutIndex = ({ sections, label }: AboutIndexProps) => {
  // Seeded from the first section rather than null, so the rail reads as a
  // position indicator from the first paint instead of showing nothing active
  // until the observer fires. Derived from props, so no hydration mismatch.
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) return;

    // The top band is masked out by the navbar's 72px plus breathing room; the
    // bottom 55% is masked so the section being read is the one that registers,
    // not whichever one has just entered from below.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -55% 0px', threshold: 0 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);

  return (
    /* Two load-bearing classes on the nav below. `lg:self-start`: a grid item
       defaults to align-self: stretch, so without it this nav is as tall as the
       whole sections row and `sticky` has no offset to resolve — it silently
       never sticks. `min-w-0`: the mobile chip row is nowrap, so without it the
       grid track sizes to their max-content and the section's overflow-clip cuts
       the last chips off with nothing left to scroll. */
    <nav
      aria-labelledby="about-index-label"
      className="min-w-0 lg:sticky lg:top-24 lg:self-start"
    >
      <span id="about-index-label" className="label-mono block text-ink-3">
        {label}
      </span>

      <ul className="mt-4 flex gap-x-1 gap-y-1 overflow-x-auto pb-1 lg:mt-5 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-hairline lg:pb-0">
        {sections.map((section) => {
          const active = activeId === section.id;

          return (
            <li key={section.id} className="shrink-0 lg:shrink lg:-ml-px">
              <a
                href={`#${section.id}`}
                aria-current={active ? 'true' : undefined}
                className={`label-mono block whitespace-nowrap border px-3 py-2 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] lg:border-y-0 lg:border-r-0 lg:border-l-2 lg:px-3.5 lg:py-2.5 ${
                  active
                    ? 'border-signal text-signal-ink lg:border-l-signal'
                    : 'border-hairline text-ink-2 hover:border-hairline-strong hover:text-ink lg:border-l-transparent'
                }`}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AboutIndex;
