'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SiGithub } from 'react-icons/si';
import { ExternalLink, Code2, Star } from 'lucide-react';
import { motion } from 'framer-motion';

import { projectsData } from '@/data/projects';
import Button from './ui/Button';
import TiltCard from './ui/TiltCard';
import { SectionHeader } from './ui/CardComponents';
import Printer3DText, { CHAR_DELAY } from './ui/Printer3DText';
import { MagneticButton } from './ui/MagneticButton';
import { useLocale } from '@/i18n';

const projects = projectsData;

const Projects = () => {
  const { t } = useLocale();
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (projectId: number) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const totalChars = t.projects.title.length + 1 + t.projects.titleHighlight.length;
  const descDelay = (totalChars * CHAR_DELAY + 200) / 1000;

  return (
    <section
      id="projects"
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(to right, rgba(100, 116, 139, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.18) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)' } as React.CSSProperties} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_25%,transparent_72%,rgba(15,23,42,0.12)_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.12)_0%,transparent_22%,transparent_74%,rgba(10,25,47,0.32)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent opacity-70" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title={<Printer3DText text={t.projects.title} highlightText={t.projects.titleHighlight} />}
          description={t.projects.subtitle}
          descriptionDelay={descDelay}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <TiltCard
              key={project.id}
              padding="sm"
              disableBlur
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" as const }}
            >

              {/* Image container */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
                {/* Animated border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl z-0"></div>

                {!imageErrors[project.id] ? (
                  <Image
                    src={project.previewImage}
                    alt={`${t.accessibility.projectPreview} ${t.projects.items[project.id]?.title ?? project.title}`}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 relative z-10"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzE3MkE0NSIvPjwvc3ZnPg=="
                    onError={() => handleImageError(project.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary-background/60">
                    <div className="text-center">
                      <Code2 className="w-16 h-16 text-accent/50 mx-auto mb-2" />
                      <p className="text-secondary-text text-sm">{t.projects.previewUnavailable}</p>
                    </div>
                  </div>
                )}

                {/* Floating badge with star icon on hover */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary-background/95 rounded-full border border-accent/30 z-20 flex items-center gap-1 transition-transform duration-200 group-hover:scale-110">
                  <Star className="w-3 h-3 text-accent fill-accent scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <span className="text-xs font-semibold text-accent">#{String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col p-6 relative z-20">
                {/* Title */}
                <h3 className="text-2xl font-bold text-primary-text mb-3 group-hover:text-accent transition-colors duration-300">
                  {t.projects.items[project.id]?.title ?? project.title}
                </h3>

                {/* Description */}
                <p className="text-secondary-text text-sm leading-relaxed mb-4 flex-grow">
                  {t.projects.items[project.id]?.description ?? project.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-semibold rounded-lg hover:bg-accent/20 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-secondary-text/10 text-secondary-text text-xs font-semibold rounded-lg">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-6"></div>

                {/* Action buttons with magnetic effect */}
                <div className="flex gap-3">
                  {project.liveDemo && (
                    <MagneticButton className="flex-1">
                      <Button
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        size="default"
                        className="w-full gap-2"
                        aria-label={`${t.accessibility.viewDemo} ${t.projects.items[project.id]?.title ?? project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm">{t.projects.liveDemo}</span>
                      </Button>
                    </MagneticButton>
                  )}
                  <MagneticButton className={project.liveDemo ? 'flex-1' : 'w-full'}>
                    <Button
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="default"
                      className="w-full gap-2"
                      aria-label={`${t.accessibility.viewSource} ${t.projects.items[project.id]?.title ?? project.title}`}
                    >
                      <SiGithub className="w-4 h-4" aria-hidden="true" />
                      <span className="text-sm">{t.projects.github}</span>
                    </Button>
                  </MagneticButton>
                </div>
              </div>

            </TiltCard>
          ))}
        </motion.div>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-secondary-background z-[5] pointer-events-none" />
    </section>
  );
};

export default Projects;
