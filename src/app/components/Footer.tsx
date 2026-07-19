'use client';

import React from 'react';
import Link from 'next/link';
import { SiGithub, SiLinkedin } from 'react-icons/si';

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

  const formFactorLabel =
    (lighthouseSummary.formFactor as string) === 'mobile'
      ? t.footer.lighthouse.formFactors.mobile
      : t.footer.lighthouse.formFactors.desktop;

  const lighthouseMetrics = [
    { label: t.footer.lighthouse.metrics.performance, score: lighthouseSummary.scores.performance },
    { label: t.footer.lighthouse.metrics.accessibility, score: lighthouseSummary.scores.accessibility },
    { label: t.footer.lighthouse.metrics.bestPractices, score: lighthouseSummary.scores.bestPractices },
    { label: t.footer.lighthouse.metrics.seo, score: lighthouseSummary.scores.seo },
  ];

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/work', label: t.nav.work },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-hairline bg-raised text-ink-2">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <nav aria-label={t.footer.navLabel}>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="label-mono text-ink-2 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-signal-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-10 flex items-center gap-3">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.linkedinProfile}
                className="flex h-10 w-10 items-center justify-center border border-hairline text-ink-2 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] hover:border-hairline-strong hover:text-signal-ink"
              >
                <SiLinkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.githubProfile}
                className="flex h-10 w-10 items-center justify-center border border-hairline text-ink-2 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] hover:border-hairline-strong hover:text-signal-ink"
              >
                <SiGithub className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Lighthouse badge. Scores are measured, not asserted. */}
          <div className="w-full border border-hairline bg-canvas p-5 lg:w-80">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="label-mono text-signal-ink">{t.footer.lighthouse.label}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-3">
                  {t.footer.lighthouse.caption}
                </p>
              </div>
              <p className="flex shrink-0 items-baseline gap-0.5">
                <span className="text-3xl leading-none text-ink">
                  {lighthouseSummary.scores.performance}
                </span>
                <span className="text-xs text-ink-3">/100</span>
              </p>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-2">
              {lighthouseMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex min-w-0 items-center gap-2 border border-hairline px-2.5 py-1.5"
                >
                  <dd className="text-xs font-medium text-signal-ink">{metric.score}</dd>
                  <dt className="label-mono truncate text-ink-3">{metric.label}</dt>
                </div>
              ))}
            </dl>

            <p className="label-mono mt-4 text-ink-3" suppressHydrationWarning>
              {t.footer.lighthouse.audited}: {auditDate} — {formFactorLabel}
            </p>
          </div>
        </div>

        {/* Plain <p>, never a flex container: flex makes each text node its own
            item and breaks the name onto a second line at narrow widths. */}
        <div className="mt-14 border-t border-hairline pt-6">
          <p className="whitespace-nowrap text-sm text-ink-3">
            &copy; <span suppressHydrationWarning>{currentYear}</span>{' '}
            {siteConfig.personal.fullName}
          </p>
          <p className="mt-1 text-xs text-ink-3">{t.footer.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
