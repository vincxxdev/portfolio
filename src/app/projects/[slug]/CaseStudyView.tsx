'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiGithub } from 'react-icons/si';
import { ExternalLink, Code2, ArrowLeft, ArrowRight } from 'lucide-react';

import type { Project } from '@/types';
import { useLocale } from '@/i18n';
import Button from '@/app/components/ui/Button';
import { CardDivider } from '@/app/components/ui/CardComponents';
import { MagneticButton } from '@/app/components/ui/MagneticButton';
import CurrentSitePreview from '@/app/components/CurrentSitePreview';
import ReasoningDiagram from '@/app/components/ReasoningDiagram';

interface MetaItemProps {
  label: string;
  children: React.ReactNode;
}

const MetaItem = ({ label, children }: MetaItemProps) => (
  <div className="flex flex-col gap-1.5">
    <span className="label-mono text-ink-3">{label}</span>
    <div className="text-sm text-ink">{children}</div>
  </div>
);

interface CaseStudyViewProps {
  project: Project;
  nextProject?: Project;
}

const CaseStudyView = ({ project, nextProject }: CaseStudyViewProps) => {
  const { t } = useLocale();
  const [imageError, setImageError] = useState(false);

  const localized = t.projects.items[project.id];
  const title = localized?.title ?? project.title;
  const caseStudy = localized?.caseStudy;
  const labels = t.work.caseStudy;

  const nextLocalized = nextProject ? t.projects.items[nextProject.id] : undefined;
  const nextTitle = nextLocalized?.title ?? nextProject?.title;

  return (
    <main className="relative">
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-14">
        <div className="bg-section-grid absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <Link
            href="/work"
            className="label-mono inline-flex items-center gap-2 text-ink-2 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-signal-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {labels.backToWork}
          </Link>

          <h1 className="font-display mt-8 text-4xl leading-[1.02] font-bold text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {localized?.tagline && (
            <p className="mt-5 max-w-2xl text-lg text-ink-2 sm:text-xl">
              {localized.tagline}
            </p>
          )}

          <CardDivider className="my-8" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {localized?.role && (
              <MetaItem label={labels.roleLabel}>{localized.role}</MetaItem>
            )}
            {localized?.period && (
              <MetaItem label={labels.periodLabel}>{localized.period}</MetaItem>
            )}
            <MetaItem label={labels.stackLabel}>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {project.technologies.map((tech) => (
                  <span key={tech} className="font-mono text-xs text-ink-2">
                    {tech}
                  </span>
                ))}
              </div>
            </MetaItem>
            <MetaItem label={labels.linksLabel}>
              <div className="flex flex-wrap gap-2">
                {project.liveDemo && (
                  <MagneticButton>
                    <Button
                      href={project.isCurrentSite ? '/' : project.liveDemo}
                      target={project.isCurrentSite ? undefined : '_blank'}
                      rel={project.isCurrentSite ? undefined : 'noopener noreferrer'}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      {project.isCurrentSite
                        ? <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                        : <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />}
                      <span>{project.isCurrentSite ? t.work.currentSite.home : t.work.card.liveDemo}</span>
                      <span className="sr-only"> — {title}</span>
                    </Button>
                  </MagneticButton>
                )}
                <MagneticButton>
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
                </MagneticButton>
              </div>
            </MetaItem>
          </div>

        </div>
      </section>

      {caseStudy && <ReasoningDiagram diagram={caseStudy} labels={labels.diagram} />}

      <section className="border-t border-hairline py-12 sm:py-16" aria-labelledby="project-preview-title">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 id="project-preview-title" className="text-2xl text-ink sm:text-3xl">{labels.previewLabel}</h2>
          <div className="border-hairline bg-raised relative mt-6 w-full overflow-clip rounded-sm border">
            {project.isCurrentSite ? (
              <div className="aspect-[16/10] max-h-120 sm:aspect-[16/7]">
                <CurrentSitePreview />
              </div>
            ) : !imageError ? (
              <Image
                src={project.previewImage}
                alt={`${t.accessibility.projectPreview} ${title}`}
                width={1200}
                height={630}
                className="h-auto max-h-120 w-full bg-sunken object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="bg-sunken flex aspect-[16/9] w-full items-center justify-center">
                <div className="text-center">
                  <Code2 className="text-ink-3 mx-auto mb-2 h-12 w-12" aria-hidden="true" />
                  <p className="text-sm text-ink-2">{t.work.card.previewUnavailable}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative border-t border-hairline py-16 sm:py-20">
        <div className="bg-section-grid absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/work"
                className="label-mono inline-flex items-center gap-2 text-ink-2 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-signal-ink"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                {labels.backToWork}
              </Link>
              <Button href="/contact" variant="secondary">{t.hero.buttons.contact}</Button>
            </div>

            {nextProject && nextTitle && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col gap-2 sm:items-end"
              >
                <span className="label-mono text-ink-3">
                  {labels.nextProject}
                </span>
                <span className="font-display inline-flex items-center gap-2 text-2xl font-bold text-ink transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:text-signal-ink sm:text-3xl">
                  {nextTitle}
                  <ArrowRight
                    className="h-5 w-5 transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CaseStudyView;
