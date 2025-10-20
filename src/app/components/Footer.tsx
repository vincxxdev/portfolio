'use client';

import React from 'react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-secondary-background/80 backdrop-blur-lg text-secondary-text border-t border-accent/10 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-32 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute top-0 right-0 w-72 h-24 bg-blue-500/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {/* Main content */}
        <div className="flex flex-col gap-8">
          {/* Social links and copyright */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full gap-6"
          >
            {/* Copyright */}
            <div className="text-center sm:text-left order-2 sm:order-1">
              <p className="text-sm flex items-center justify-center sm:justify-start gap-2">
                &copy; {currentYear} Vincenzo Buttari
              </p>
              <p className="text-xs text-secondary-text/70 mt-1">
                Tutti i diritti riservati
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 order-1 sm:order-2">
              <motion.a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profilo LinkedIn"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-secondary-background/50 backdrop-blur-sm rounded-xl border border-secondary-text/20 hover:border-accent/40 text-secondary-text hover:text-accent transition-all duration-300 shadow-lg hover:shadow-cyan-400/20"
              >
                <SiLinkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profilo GitHub"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-secondary-background/50 backdrop-blur-sm rounded-xl border border-secondary-text/20 hover:border-accent/40 text-secondary-text hover:text-accent transition-all duration-300 shadow-lg hover:shadow-cyan-400/20"
              >
                <SiGithub className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Privacy note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center sm:text-left"
          >
            <p className="text-xs text-secondary-text/70">
              Questo sito utilizza analytics anonimizzate per migliorare l&apos;esperienza utente.
              <br className="hidden sm:inline" />
              Nessun dato personale viene raccolto o condiviso con terze parti.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;