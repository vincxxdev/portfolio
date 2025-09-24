'use client';

import React from 'react';
import { Github } from 'lucide-react';

const TrainIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
    >
        <path d="M52 48H12a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4z" />
        <path d="M8 36h48" />
        <path d="M20 48v4" />
        <path d="M44 48v4" />
        <path d="M20 16V8" />
        <path d="M28 16V8" />
        <path d="M36 16V8" />
        <path d="M12 8h3.5a4.5 4.5 0 0 1 4.5 4.5V16" />
        <path d="M48.5 16V12.5A4.5 4.5 0 0 0 44 8h-2.5" />
        <circle cx="20" cy="52" r="4" />
        <circle cx="44" cy="52" r="4" />
    </svg>
);


const projects = [
  {
    id: 1,
    title: 'Railway Simulator',
    description: 'Progetto realizzato in gruppo con un collega. Backend in Node.js (Express) e frontend in FlexSim. Simula una stazione ferroviaria interagendo via Arduino.',
    technologies: ['Node.js', 'Express', 'FlexSim', 'Arduino'],
    githubLink: 'https://github.com/zeltarave/Railway-Simulator',
  },
  {
    id: 2,
    title: 'Nome Progetto 2',
    description: 'Questa è una breve descrizione del progetto 2.',
    technologies: ['React', 'Tailwind CSS', 'Next.js'],
    githubLink: 'https://github.com/tuo-username/progetto-2',
  },
  {
    id: 3,
    title: 'Nome Progetto 3',
    description: 'Questa è una breve descrizione del progetto 3.',
    technologies: ['Python', 'Django', 'PostgreSQL'],
    githubLink: 'https://github.com/tuo-username/progetto-3',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white sm:text-4xl mb-12">
          I Miei Progetti
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl border border-secondary-text/20 bg-secondary-background/50 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-cyan-400/20 hover:scale-105"
            >
              {project.title === 'Railway Simulator' && (
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-8 z-20 pointer-events-none">
                    <TrainIcon className="absolute w-24 h-24 text-accent/80 left-[-30%] top-0 transition-all duration-[2s] ease-in-out group-hover:left-[110%]" />
                </div>
              )}

              <div className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-bold text-primary-text">{project.title}</h3>
                
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-accent">Descrizione</h4>
                  <p className="mt-1 text-secondary-text text-sm h-20">{project.description}</p>
                </div>

                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-accent">Tecnologie Utilizzate</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-grow" /> 

                <div className="mt-6 text-center text-xs text-secondary-text/80">
                  <p>Passa sopra per vedere il codice su Github</p>
                </div>
              </div>

              <div className="absolute inset-0 bg-cyan-400/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <Github className="h-16 w-16" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;