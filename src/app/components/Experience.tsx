'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Button from './ui/Button';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const experienceData = [
  {
    date: '26/11/2017 - 10/12/2017 - 10/02/2018',
    title: 'Cameriere',
    company: 'Bari',
    description: 'Cameriere presso lo Stadio San Nicola tramite Scuola Alberghiera Molfetta, servizio a buffet presso la tribuna d’onore',
  }
];

const certificationData = [
  {
    title: '100 Days Of Code - 2022 Wed Development Bootcamp',
    issuer: 'Udemy',
    date: 'Marzo 2022',
    url: '/certificates/100-days-web-development.pdf',
  },
  {
    title: '10 Mega Responsive Websites with HTML, CSS, and JavaScript',
    issuer: 'Udemy',
    date: 'Gennaio 2022',
    url: '/certificates/mega-responsive-websites.pdf',
  },
  {
    title: 'Networking 101: Corso di Reti da zero',
    issuer: 'Udemy',
    date: "Gennaio 2025",
    url: '/certificates/networking-101.pdf',
  },
  {
    title: 'The Web Developer Bootcamp 2022',
    issuer: 'Udemy',
    date: 'Dicembre 2021',
    url: '/certificates/web-developer-bootcamp-2022.pdf',
  }
];

const monthMap: { [key:string]: number } = {
  'gennaio': 0, 'febbraio': 1, 'marzo': 2, 'aprile': 3, 'maggio': 4, 'giugno': 5,
  'luglio': 6, 'agosto': 7, 'settembre': 8, 'ottobre': 9, 'novembre': 10, 'dicembre': 11
};

certificationData.sort((a, b) => {
  const [monthA, yearA] = a.date.toLowerCase().split(' ');
  const [monthB, yearB] = b.date.toLowerCase().split(' ');

  const dateA = new Date(parseInt(yearA), monthMap[monthA]);
  const dateB = new Date(parseInt(yearB), monthMap[monthB]);

  return dateA.getTime() - dateB.getTime();
});

const Experience = () => {
  return (
    <motion.section 
      id="experience" 
      className="py-20 sm:py-32"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Sezione Esperienze */}
        <h2 className="text-4xl font-bold text-center text-primary-text mb-16">
          Esperienze
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-3 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 bg-secondary-text/30"></div>
          {experienceData.map((item, index) => (
            <div key={index} className="relative mb-12">
              <div className="flex items-center">
                <div className="absolute left-3 sm:left-1/2 transform sm:-translate-x-1/2 z-10">
                  <div className="bg-accent w-6 h-6 rounded-full border-4 border-background"></div>
                </div>
                <div className={`w-full pl-12 sm:pl-0 ${index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'}`}>
                  <div className={`inline-block p-6 rounded-xl border border-secondary-text/20 bg-secondary-background shadow-lg max-w-sm ${index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <p className="text-sm font-semibold text-accent mb-1">{item.date}</p>
                    <h3 className="text-xl font-bold text-primary-text">{item.title}</h3>
                    <p className="text-md text-secondary-text mb-3">{item.company}</p>
                    <p className="text-sm text-primary-text/80">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sezione Certificazioni */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center text-primary-text mb-16">
            Certificazioni
          </h2>
          <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-2">
            {certificationData.map((cert, index) => (
              <div key={index} className="p-6 rounded-xl border border-secondary-text/20 bg-secondary-background shadow-lg flex flex-col">
                <p className="text-sm font-semibold text-accent mb-1">{cert.date}</p>
                <h3 className="text-xl font-bold text-primary-text">{cert.title}</h3>
                <p className="text-md text-secondary-text mb-4 flex-grow">{cert.issuer}</p>
                <Button href={cert.url} target="_blank" rel="noopener noreferrer" variant="outline" className="w-full mt-auto">
                  Visualizza Certificato
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
