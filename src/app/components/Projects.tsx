'use client';

import React from 'react';
import { Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Railway Simulator',
    description: 'Progetto realizzato in gruppo insieme a un mio collega universitario. Realizzato con Node.js lato backend con il framework Express e con FlexSim lato frontend. Si tratta di una simulazione realistica di una stazione ferroviaria interagendo tramite Arduino. Clicca per vedere il codice su GitHub.',
    githubLink: 'https://github.com/zeltarave/Railway-Simulator',
  },
  {
    id: 2,
    title: 'Nome Progetto 2',
    description: 'Questa è una breve descrizione del progetto 2. Clicca per vedere il codice su GitHub.',
    githubLink: 'https://github.com/tuo-username/progetto-2',
  },
  {
    id: 3,
    title: 'Nome Progetto 3',
    description: 'Questa è una breve descrizione del progetto 3. Clicca per vedere il codice su GitHub.',
    githubLink: 'https://github.com/tuo-username/progetto-3',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white sm:text-4xl">
          I Miei Progetti
        </h2>
        <p className="mt-4 text-lg text-center text-gray-600 dark:text-gray-300">
          Ecco alcuni dei progetti a cui ho lavorato.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{project.description}</p>
              </div>
              <div className="absolute inset-0 bg-cyan-400/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <Github className="h-12 w-12" />
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