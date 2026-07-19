'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiGithub } from 'react-icons/si';
import { ExternalLink, Code2 } from 'lucide-react';

import type { Project } from '@/types';
import { useLocale } from '@/i18n';
import Button from '@/app/components/ui/Button';
import Card from '@/app/components/ui/Card';
import { CardDivider } from '@/app/components/ui/CardComponents';
import { MagneticButton } from '@/app/components/ui/MagneticButton';
import Printer3DText from '@/app/components/ui/Printer3DText';

const gridBackgroundStyle: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, rgba(100, 116, 139, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.18) 1px, transparent 1px)',
  backgroundSize: '72px 72px',
  maskImage:
    'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)',
  WebkitMaskImage:
    'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)',
};

interface CaseStudySectionProps {
  label: string;
  title: string;
  paragraphs: string[];
}

const CaseStudySection = ({ label, title, paragraphs }: CaseStudySectionProps) => (
  <section className="relative py-16 sm:py-20 overflow-hidden">
    <div className="absolute inset-0 opacity-20" style={gridBackgroundStyle} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <Card padding="lg" cornerAccent glowIntensity="light">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
          {label}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-primary-text mt-3">
          {title}
        </h2>
        <CardDivider className="my-6" />
        <div className="space-y-4">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-base sm:text-lg text-secondary-text leading-relaxed"
            >
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
}

const CaseStudyView = ({ project }: CaseStudyViewProps) => {
  const { t } = useLocale();
  const [imageError, setImageError] = useState(false);

  const localized = t.projects.items[project.id];
  const title = localized?.title ?? project.title;
  const description = localized?.description ?? project.description;
  const caseStudy = localized?.caseStudy;
  const labels = t.projects.caseStudy;

  return (
    <main className="relative">
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-25" style={gridBackgroundStyle} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_25%,transparent_72%,rgba(15,23,42,0.12)_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.12)_0%,transparent_22%,transparent_74%,rgba(10,25,47,0.32)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent opacity-70" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/#projects"
            className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.22em] text-secondary-text hover:text-accent transition-colors duration-300 mb-8"
          >
            {labels.backToProjects}
          </Link>

          <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-accent/10 border border-accent/20 rounded-full">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              {labels.overviewLabel}
            </span>
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] text-primary-text mb-6">
            <Printer3DText text={title} />
          </h1>

          {caseStudy?.tagline && (
            <p className="text-lg sm:text-xl text-secondary-text/90 max-w-3xl mb-8 leading-relaxed">
              {caseStudy.tagline}
            </p>
          )}

          <p className="text-base text-secondary-text max-w-3xl mb-8 leading-relaxed">
            {description}
          </p>

          <div className="mb-8">
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-secondary-text/70 mb-3">
              {labels.technologiesLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-semibold rounded-lg hover:bg-accent/20 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {project.liveDemo && (
              <MagneticButton>
                <Button
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="default"
                  className="gap-2 leading-5"
                  aria-label={`${t.accessibility.viewDemo} ${title}`}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  <span>{t.projects.liveDemo}</span>
                </Button>
              </MagneticButton>
            )}
            <MagneticButton>
              <Button
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="default"
                className="gap-2 leading-5"
                aria-label={`${t.accessibility.viewSource} ${title}`}
              >
                <SiGithub className="w-4 h-4" aria-hidden="true" />
                <span>{t.projects.github}</span>
              </Button>
            </MagneticButton>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl border border-secondary-text/15 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
            {!imageError ? (
              <Image
                src={project.previewImage}
                alt={`${t.accessibility.projectPreview} ${title}`}
                width={1200}
                height={630}
                priority
                className="w-full h-auto max-h-[480px] object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full aspect-[16/9] flex items-center justify-center bg-secondary-background/60">
                <div className="text-center">
                  <Code2 className="w-16 h-16 text-accent/50 mx-auto mb-2" />
                  <p className="text-secondary-text text-sm">
                    {t.projects.previewUnavailable}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {caseStudy && (
        <>
          <CaseStudySection
            label={labels.problemLabel}
            title={caseStudy.problem.title}
            paragraphs={caseStudy.problem.paragraphs}
          />
          <CaseStudySection
            label={labels.approachLabel}
            title={caseStudy.approach.title}
            paragraphs={caseStudy.approach.paragraphs}
          />
          <CaseStudySection
            label={labels.solutionLabel}
            title={caseStudy.solution.title}
            paragraphs={caseStudy.solution.paragraphs}
          />
          <CaseStudySection
            label={labels.resultsLabel}
            title={caseStudy.results.title}
            paragraphs={caseStudy.results.paragraphs}
          />
        </>
      )}

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={gridBackgroundStyle} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <MagneticButton className="inline-block">
            <Button
              href="/#projects"
              variant="secondary"
              size="lg"
              className="gap-2"
            >
              {labels.backToProjects}
            </Button>
          </MagneticButton>
        </div>
      </section>
    </main>
  );
};

export default CaseStudyView;
