'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SiGithub } from 'react-icons/si';
import { ExternalLink, Code2, Star } from 'lucide-react';
import { motion } from 'framer-motion';

import { projectsData } from '@/data/projects';
import Card from './ui/Card';
import { SectionHeader } from './ui/CardComponents';
import { MagneticButton } from './ui/MagneticButton';

const projects = projectsData;

const Projects = () => {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [cardEffects, setCardEffects] = useState<Record<number, { rotateX: number; rotateY: number; glareX: number; glareY: number }>>({});

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleImageError = (projectId: number) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  const handleCardMove = (event: React.MouseEvent<HTMLDivElement>, projectId: number) => {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const percentageX = (x / rect.width) * 100;
    const percentageY = (y / rect.height) * 100;
    const rotateY = ((percentageX - 50) / 50) * 7;
    const rotateX = -((percentageY - 50) / 50) * 7;

    setCardEffects((prev) => ({
      ...prev,
      [projectId]: {
        rotateX,
        rotateY,
        glareX: percentageX,
        glareY: percentageY,
      },
    }));
  };

  const resetCardEffect = (projectId: number) => {
    setCardEffects((prev) => ({
      ...prev,
      [projectId]: {
        rotateX: 0,
        rotateY: 0,
        glareX: 50,
        glareY: 50,
      },
    }));
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

  return (
    <section 
      id="projects" 
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title={
              <>
                I Miei <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Progetti</span>
              </>
            }
            description="Esplora una selezione dei miei progetti più significativi"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <Card
              key={project.id}
              hoverEffect="lift"
              padding="sm"
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" as const }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseMove={(event) => handleCardMove(event, project.id)}
              onMouseLeave={() => {
                setHoveredProject(null);
                resetCardEffect(project.id);
              }}
            >
              <motion.div
                className="relative h-full"
                animate={
                  reduceMotion
                    ? { rotateX: 0, rotateY: 0 }
                    : {
                        rotateX: cardEffects[project.id]?.rotateX ?? 0,
                        rotateY: cardEffects[project.id]?.rotateY ?? 0,
                      }
                }
                transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.5 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
              {!reduceMotion && (
                <div
                  className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(320px circle at ${cardEffects[project.id]?.glareX ?? 50}% ${cardEffects[project.id]?.glareY ?? 50}%, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.05) 30%, transparent 60%)`,
                  }}
                />
              )}

              {/* Image container */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-cyan-500/10 to-blue-500/10" style={{ transform: 'translateZ(24px)' }}>
                {/* Animated border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl z-0"></div>
                
                {!imageErrors[project.id] ? (
                  <Image
                    src={project.previewImage}
                    alt={`Anteprima del progetto ${project.title}`}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 relative z-10"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzE3MkE0NSIvPjwvc3ZnPg=="
                    onError={() => handleImageError(project.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                      <Code2 className="w-16 h-16 text-accent/50 mx-auto mb-2" />
                      <p className="text-secondary-text text-sm">Anteprima non disponibile</p>
                    </div>
                  </div>
                )}

                {/* Floating badge with star icon on hover */}
                <motion.div 
                  className="absolute top-4 right-4 px-3 py-1 bg-primary-background/90 backdrop-blur-md rounded-full border border-accent/30 z-20 flex items-center gap-1"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {hoveredProject === project.id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Star className="w-3 h-3 text-accent fill-accent" />
                    </motion.div>
                  )}
                  <span className="text-xs font-semibold text-accent">#{String(index + 1).padStart(2, '0')}</span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col p-6 relative z-20" style={{ transform: 'translateZ(20px)' }}>
                {/* Title */}
                <h3 className="text-2xl font-bold text-primary-text mb-3 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-secondary-text text-sm leading-relaxed mb-4 flex-grow">
                  {project.description}
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
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 w-full"
                        aria-label={`Visualizza la demo live di ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm">Live Demo</span>
                      </a>
                    </MagneticButton>
                  )}
                  <MagneticButton className={project.liveDemo ? 'flex-1' : 'w-full'}>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-accent/50 text-accent hover:bg-accent hover:text-white hover:border-accent font-semibold rounded-xl transition-all duration-300 w-full`}
                      aria-label={`Visualizza il codice sorgente di ${project.title} su GitHub`}
                    >
                      <SiGithub className="w-4 h-4" aria-hidden="true" />
                      <span className="text-sm">GitHub</span>
                    </a>
                  </MagneticButton>
                </div>
              </div>
              </motion.div>

            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
