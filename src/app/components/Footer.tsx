'use client';

import React from 'react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { motion } from 'framer-motion';
import { Gauge } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useLocale } from '@/i18n';
import { lighthouseSummary } from '@/data/lighthouse';

const Footer = () => {
  const { locale, t } = useLocale();
  const currentYear = new Date().getFullYear();
  const auditDate = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(lighthouseSummary.generatedAt));
  const auditedFormFactor = lighthouseSummary.formFactor as string;
  const formFactorLabel =
    auditedFormFactor === 'mobile'
      ? t.footer.lighthouse.formFactors.mobile
      : t.footer.lighthouse.formFactors.desktop;
  const lighthouseMetrics = [
    {
      label: t.footer.lighthouse.metrics.performance,
      score: lighthouseSummary.scores.performance,
    },
    {
      label: t.footer.lighthouse.metrics.accessibility,
      score: lighthouseSummary.scores.accessibility,
    },
    {
      label: t.footer.lighthouse.metrics.bestPractices,
      score: lighthouseSummary.scores.bestPractices,
    },
    {
      label: t.footer.lighthouse.metrics.seo,
      score: lighthouseSummary.scores.seo,
    },
  ];

  return (
    <footer className="relative bg-secondary-background/80 backdrop-blur-lg text-secondary-text border-t border-accent/10 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, rgba(100, 116, 139, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.18) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' } as React.CSSProperties} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {/* Main content */}
        <div className="flex flex-col gap-8">
          {/* Social links and copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-center"
          >
            {/* Copyright */}
            <div className="text-center lg:text-left lg:w-56">
              <p className="text-sm flex items-center justify-center sm:justify-start gap-2">
                &copy; <span suppressHydrationWarning>{currentYear}</span> {siteConfig.personal.fullName}
              </p>
              <p className="text-xs text-secondary-text/70 mt-1">
                {t.footer.allRightsReserved}
              </p>
            </div>

            <div className="w-full max-w-2xl rounded-2xl border border-accent/20 bg-primary-background/45 p-4 shadow-lg shadow-accent/5 backdrop-blur-md lg:max-w-xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                    <Gauge className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                      {t.footer.lighthouse.label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-secondary-text/75">
                      {t.footer.lighthouse.caption}
                    </span>
                  </span>
                </div>

                <div className="flex shrink-0 items-end gap-1">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-3xl font-black leading-none text-transparent">
                    {lighthouseSummary.scores.performance}
                  </span>
                  <span className="pb-0.5 text-xs font-semibold text-secondary-text/70">/100</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {lighthouseMetrics.map((metric) => (
                  <span
                    key={metric.label}
                    className="inline-flex h-8 min-w-0 items-center justify-center gap-2 rounded-full border border-secondary-text/15 bg-secondary-background/50 px-3 text-center text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-secondary-text/80"
                  >
                    <span className="text-accent">{metric.score}</span>
                    <span className="whitespace-nowrap">{metric.label}</span>
                  </span>
                ))}
              </div>

              <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-secondary-text/60">
                {t.footer.lighthouse.audited}: {auditDate} - {formFactorLabel}
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center gap-4 lg:w-56 lg:justify-end">
              <motion.a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.linkedinProfile}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-primary-background/40 backdrop-blur-md rounded-xl border border-secondary-text/15 hover:border-accent/40 text-secondary-text hover:text-accent transition-all duration-300 shadow-lg hover:shadow-cyan-400/20"
              >
                <SiLinkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.githubProfile}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-primary-background/40 backdrop-blur-md rounded-xl border border-secondary-text/15 hover:border-accent/40 text-secondary-text hover:text-accent transition-all duration-300 shadow-lg hover:shadow-cyan-400/20"
              >
                <SiGithub className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
