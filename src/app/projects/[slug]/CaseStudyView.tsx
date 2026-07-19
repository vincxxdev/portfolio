'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiGithub } from 'react-icons/si';
import { ExternalLink, Code2, ArrowLeft, ArrowRight } from 'lucide-react';

import type { Project } from '@/types';
import type { NarrativeBlock } from '@/i18n/types';
import { useLocale } from '@/i18n';
import Button from '@/app/components/ui/Button';
import Card from '@/app/components/ui/Card';
import { CardDivider } from '@/app/components/ui/CardComponents';
import { MagneticButton } from '@/app/components/ui/MagneticButton';

interface MetaItemProps {
  label: string;
  children: React.ReactNode;
}

const MetaItem = ({ label, children }: MetaItemProps) => (
  <div className="flex flex-col gap-1.5">
    <span className="font-mono text-2xs uppercase text-ink-3">{label}</span>
    <div className="text-sm text-ink">{children}</div>
  </div>
);

interface CaseStudySectionProps {
  index: number;
  label: string;
  block: NarrativeBlock;
}

const CaseStudySection = ({ index, label, block }: CaseStudySectionProps) => (
  <section className="relative py-14 sm:py-20">
    <div className="bg-section-grid absolute inset-0" aria-hidden="true" />
    <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Card padding="lg">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-2xs uppercase text-signal-ink">
            {String(index).padStart(2, '0')}
          </span>
          <span className="font-mono text-2xs uppercase text-ink-3">{label}</span>
        </div>
        <h2 className="font-display mt-3 text-2xl font-bold text-ink sm:text-3xl">
          {block.title}
        </h2>
        <CardDivider className="my-6" />
        <div className="space-y-4">
          {block.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-ink-2">
              {paragraph}
            </p>
          ))}
        </div>
      </Card>
    </div>
  </section>
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
  const description = localized?.description ?? project.description;
  const caseStudy = localized?.caseStudy;
  const labels = t.work.caseStudy;

  const nextLocalized = nextProject ? t.projects.items[nextProject.id] : undefined;
  const nextTitle = nextLocalized?.title ?? nextProject?.title;

  return (
    <main className="relative">
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20">
        <div className="bg-section-grid absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/work"
            className="font-mono text-2xs uppercase inline-flex items-center gap-2 text-ink-2 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-signal-ink"
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

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2">
            {description}
          </p>

          <CardDivider className="my-10" />

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
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      aria-label={`${t.accessibility.viewDemo} ${title}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{t.work.card.liveDemo}</span>
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
                    aria-label={`${t.accessibility.viewSource} ${title}`}
                  >
                    <SiGithub className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.work.card.github}</span>
                  </Button>
                </MagneticButton>
              </div>
            </MetaItem>
          </div>

          <div className="border-hairline bg-raised relative mt-12 w-full overflow-hidden rounded-sm border">
            {!imageError ? (
              <Image
                src={project.previewImage}
                alt={`${t.accessibility.projectPreview} ${title}`}
                width={1200}
                height={630}
                priority
                className="h-auto max-h-[480px] w-full object-cover"
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

      {caseStudy && (
        <>
          <CaseStudySection index={1} label={labels.contextLabel} block={caseStudy.context} />
          <CaseStudySection index={2} label={labels.approachLabel} block={caseStudy.approach} />
          <CaseStudySection index={3} label={labels.outcomeLabel} block={caseStudy.outcome} />
        </>
      )}

      <section className="relative py-16 sm:py-20">
        <div className="bg-section-grid absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <CardDivider className="mb-10" />
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <Link
              href="/work"
              className="font-mono text-2xs uppercase inline-flex items-center gap-2 text-ink-2 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-signal-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              {labels.backToWork}
            </Link>

            {nextProject && nextTitle && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col gap-2 sm:items-end"
              >
                <span className="font-mono text-2xs uppercase text-ink-3">
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
