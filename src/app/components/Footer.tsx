import React from 'react';
import Link from 'next/link';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { siteConfig } from '@/config/site';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-background text-secondary-text border-t border-secondary-text/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <Link href="/" className="text-xl font-bold text-primary-text transition-colors hover:text-accent">
              &lt;vincxxdev /&gt;
            </Link>
            <p className="text-sm mt-1">
              &copy; {currentYear} Vincenzo Buttari. Tutti i diritti riservati.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors duration-300">
              <SiLinkedin className="w-6 h-6" />
            </a>
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors duration-300">
              <SiGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;