'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import ProjectCard from './ProjectCard';
import SectionIntro from './SectionIntro';
import Button from './ui/Button';
import { projectsData } from '@/data/projects';
import { useLocale } from '@/i18n';

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
    <section id="work" className="relative overflow-hidden border-t border-hairline bg-raised">
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionIntro
          eyebrow={t.landing.selectedWork.label}
          title={t.landing.selectedWork.title}
          lead={t.landing.selectedWork.description}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {selected.map((project, index) => (
            <motion.div
              key={project.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.32, ease: [0.2, 0, 0, 1], delay: index * 0.07 }}
              className="h-full"
            >
              <ProjectCard project={project} index={index} basePath={basePath} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Button href={workHref} variant="secondary" className="gap-2.5">
            <span>{t.landing.selectedWork.viewAll}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
