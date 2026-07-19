'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
        <h3 className="text-xl text-ink">{title}</h3>
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

        {/* Primary action owns its own row so it never competes for width with
            the two external links — that was the source of the old squish. */}
        <div className="mt-auto pt-7">
          <Button
            href={`${basePath}/${project.slug}`}
            variant="primary"
            className="w-full gap-2"
            aria-label={`${t.accessibility.readCaseStudy} ${title}`}
          >
            <span>{t.work.card.caseStudy}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>

          <div className="mt-2.5 flex gap-2.5">
            {project.liveDemo && (
              <Button
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                className="flex-1 gap-2"
                aria-label={`${t.accessibility.viewDemo} ${title}`}
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.work.card.liveDemo}</span>
              </Button>
            )}
            <Button
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
              className="flex-1 gap-2"
              aria-label={`${t.accessibility.viewSource} ${title}`}
            >
              <SiGithub className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.work.card.github}</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
