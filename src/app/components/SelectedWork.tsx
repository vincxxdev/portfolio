'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import ProjectCard from './ProjectCard';
import SectionIntro from './SectionIntro';
import Button from './ui/Button';
import { projectsData } from '@/data/projects';
import { useLocale } from '@/i18n';
import { registerIn } from './motion';

interface SelectedWorkProps {
  limit?: number;
  workHref?: string;
  basePath?: string;
}

const SelectedWork = ({ limit = 3, workHref = '/work', basePath = '/projects' }: SelectedWorkProps) => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const selected = projectsData.slice(0, limit);

  return (
    <section id="work" className="relative overflow-clip border-t border-hairline bg-raised">
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <SectionIntro
            eyebrow={t.landing.selectedWork.label}
            title={t.landing.selectedWork.title}
            lead={t.landing.selectedWork.description}
            className="max-w-2xl"
          />
          <Button href={workHref} variant="secondary" className="w-fit shrink-0 gap-2.5">
            <span>{t.landing.selectedWork.viewAll}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {selected.map((project, index) => (
            <motion.div
              key={project.id}
              {...registerIn(!!shouldReduceMotion, 16, index * 0.07)}
              className="h-full"
            >
              <ProjectCard project={project} index={index} basePath={basePath} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SelectedWork;
