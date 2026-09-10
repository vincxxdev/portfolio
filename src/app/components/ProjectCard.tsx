'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiGithub } from 'react-icons/si';
import { ArrowRight, Code2, ExternalLink } from 'lucide-react';

import Card from './ui/Card';
import Button from './ui/Button';
import { useLocale } from '@/i18n';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Route prefix the case study lives under. */
  basePath?: string;
}

/**
 * The whole card face is the case-study link, via a stretched pseudo-element on
 * the title anchor rather than a wrapping <Link>: the demo and repo links are
 * real anchors, and nesting anchors is invalid HTML. One tab stop for the card,
 * two for its external links, and `Card interactive`'s traces and hover sound
 * now describe something that is actually clickable.
 */
const ProjectCard = ({ project, index, basePath = '/projects' }: ProjectCardProps) => {
  const { t } = useLocale();
  const [imageFailed, setImageFailed] = useState(false);

  const content = t.projects.items[project.id];
  const title = content?.title ?? project.title;
  const tagline = content?.tagline ?? content?.description ?? project.description;

  return (
    <Card interactive padding="none" className="h-full overflow-hidden">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-hairline bg-sunken">
        {!imageFailed ? (
          <Image
            src={project.previewImage}
            alt={`${t.accessibility.projectPreview} ${title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-3">
            <Code2 className="h-8 w-8" aria-hidden="true" />
            <span className="label-mono">{t.work.card.previewUnavailable}</span>
          </div>
        )}

        <span className="label-mono absolute left-0 top-0 bg-canvas px-2.5 py-1.5 text-ink-2">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl text-ink">
          {/* after:inset-0 resolves against Card's inner relative face, so the
              hit area covers the preview image too. */}
          <Link
            href={`${basePath}/${project.slug}`}
            className="after:absolute after:inset-0 after:z-10 after:content-[''] transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:text-signal-ink"
          >
            {/* Prefix, because both locales write this string as one
                ("Leggi il case study di" / "Read the case study for") — as a
                suffix it reads out with a dangling preposition. The accessible
                name still contains the visible title, so SC 2.5.3 holds. */}
            <span className="sr-only">{t.accessibility.readCaseStudy} </span>
            {title}
          </Link>
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-ink-2">{tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="label-mono border border-hairline px-2 py-1 text-ink-3"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          {/* A readout of where the card leads, not a second control — the
              stretched link above already owns the click and the tab stop. */}
          <span
            aria-hidden="true"
            className="label-mono flex items-center gap-2 text-signal-ink"
          >
            {t.work.card.caseStudy}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-1"
            />
          </span>

          {/* z-20 lifts these above the stretched link's pseudo-element. */}
          <div className="relative z-20 mt-4 flex gap-2.5 border-t border-hairline pt-4">
            {project.liveDemo && (
              <Button
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.work.card.liveDemo}</span>
                <span className="sr-only"> — {title}</span>
              </Button>
            )}
            <Button
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <SiGithub className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.work.card.github}</span>
              <span className="sr-only"> — {title}</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
