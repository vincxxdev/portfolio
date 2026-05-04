'use client';

import React from 'react';
import { Mail, Phone, MessageSquare, Send, MapPin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

import { siteConfig } from '@/config/site';
import Printer3DText, { CHAR_DELAY } from './ui/Printer3DText';
import { useLocale } from '@/i18n';
import SpotlightWrapper from './ui/SpotlightWrapper';

const Contacts = () => {
  const { t } = useLocale();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const totalChars = t.contacts.title.length + 1 + t.contacts.titleHighlight.length;
  const descDelay = (totalChars * CHAR_DELAY + 200) / 1000;

  return (
    <section
      id="contacts"
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(to right, rgba(100, 116, 139, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.18) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)' } as React.CSSProperties} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_25%,transparent_72%,rgba(15,23,42,0.12)_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.12)_0%,transparent_22%,transparent_74%,rgba(10,25,47,0.32)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent opacity-70" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-text mb-4">
            <Printer3DText text={t.contacts.title} highlightText={t.contacts.titleHighlight} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: descDelay / 1000 }}
            className="text-lg text-secondary-text max-w-2xl mx-auto"
          >
            {t.contacts.subtitle}
          </motion.p>
        </div>

        {/* Main contact cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12"
        >
          {/* Email Card */}
          <motion.div variants={itemVariants}>
            <SpotlightWrapper className="rounded-2xl h-full">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group relative flex flex-col items-center gap-6 p-8 bg-primary-background/60 rounded-2xl border border-secondary-text/15 shadow-lg hover:shadow-xl transition-[transform,box-shadow] duration-500 hover:-translate-y-2 overflow-hidden h-full"
                aria-label={`${t.accessibility.sendEmail} ${siteConfig.contact.email}`}
              >
                {/* Icon with glow effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-accent/30 group-hover:border-accent/50 transition-all duration-300">
                    <Mail className="w-12 h-12 text-accent group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-primary-text mb-2 group-hover:text-accent transition-colors duration-300">
                    {t.contacts.email.title}
                  </h3>
                  <p className="text-secondary-text text-sm mb-3">{t.contacts.email.subtitle}</p>
                  <p className="text-accent font-semibold break-all">{siteConfig.contact.email}</p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <Send className="w-5 h-5 text-accent" />
                </div>
              </a>
            </SpotlightWrapper>
          </motion.div>

          {/* Phone Card */}
          <motion.div variants={itemVariants}>
            <SpotlightWrapper className="rounded-2xl h-full">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="group relative flex flex-col items-center gap-6 p-8 bg-primary-background/60 rounded-2xl border border-secondary-text/15 shadow-lg hover:shadow-xl transition-[transform,box-shadow] duration-500 hover:-translate-y-2 overflow-hidden h-full"
                aria-label={`${t.accessibility.callPhone} ${siteConfig.contact.phoneDisplay}`}
              >
                {/* Icon with glow effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-accent/30 group-hover:border-accent/50 transition-all duration-300">
                    <Phone className="w-12 h-12 text-accent group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-primary-text mb-2 group-hover:text-accent transition-colors duration-300">
                    {t.contacts.phone.title}
                  </h3>
                  <p className="text-secondary-text text-sm mb-3">{t.contacts.phone.subtitle}</p>
                  <p className="text-accent font-semibold">{siteConfig.contact.phoneDisplay}</p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <Send className="w-5 h-5 text-accent" />
                </div>
              </a>
            </SpotlightWrapper>
          </motion.div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <SpotlightWrapper className="rounded-2xl h-full">
            <div className="flex flex-col items-center gap-3 p-6 bg-primary-background/60 rounded-2xl border border-secondary-text/15 shadow-lg h-full transition-shadow duration-500 hover:shadow-cyan-400/20">
              <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-accent/20 group-hover:border-accent/40 transition-colors duration-300">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-secondary-text mb-1">{t.contacts.location}</p>
                <p className="text-base font-bold text-primary-text">{siteConfig.personal.location}</p>
              </div>
            </div>
          </SpotlightWrapper>

          <SpotlightWrapper className="rounded-2xl h-full">
            <div className="flex flex-col items-center gap-3 p-6 bg-primary-background/60 rounded-2xl border border-secondary-text/15 shadow-lg h-full transition-shadow duration-500 hover:shadow-cyan-400/20">
              <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-accent/20 group-hover:border-accent/40 transition-colors duration-300">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-secondary-text mb-1">{t.contacts.availability}</p>
                <p className="text-base font-bold text-primary-text">{t.contacts.availabilityValue}</p>
              </div>
            </div>
          </SpotlightWrapper>

          <SpotlightWrapper className="rounded-2xl h-full">
            <div className="flex flex-col items-center gap-3 p-6 bg-primary-background/60 rounded-2xl border border-secondary-text/15 shadow-lg h-full transition-shadow duration-500 hover:shadow-cyan-400/20">
              <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-accent/20 group-hover:border-accent/40 transition-colors duration-300">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-secondary-text mb-1">{t.contacts.responseTime}</p>
                <p className="text-base font-bold text-primary-text">{t.contacts.responseTimeValue}</p>
              </div>
            </div>
          </SpotlightWrapper>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacts;
