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
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label={t.footer.navLabel}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="label-mono inline-flex min-h-10 items-center text-ink-2 transition-colors duration-(--dur-2) ease-snap hover:text-signal-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.linkedinProfile}
              className="inline-flex min-h-10 items-center justify-center gap-2 border border-hairline px-3 text-sm text-ink transition-colors duration-(--dur-2) ease-snap hover:border-hairline-strong hover:text-signal-ink"
            >
              <SiLinkedin className="h-4 w-4" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.githubProfile}
              className="inline-flex min-h-10 items-center justify-center gap-2 border border-hairline px-3 text-sm text-ink transition-colors duration-(--dur-2) ease-snap hover:border-hairline-strong hover:text-signal-ink"
            >
              <SiGithub className="h-4 w-4" aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Keep all four measured scores and the audit date, as secondary info. */}
        <div className="mt-6 flex flex-col gap-3 border-t border-hairline pt-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-ink-3">
            <p className="label-mono">{t.footer.lighthouse.label}</p>
            <p>{t.footer.lighthouse.caption} · {formFactorLabel}</p>
            <p>
              <span className="sr-only">{t.footer.lighthouse.audited}: </span>
              <time dateTime={lighthouseSummary.generatedAt} suppressHydrationWarning>{auditDate}</time>
            </p>
          </div>
          <dl className="grid shrink-0 grid-cols-2 gap-x-5 gap-y-2 sm:flex sm:flex-wrap">
            {lighthouseMetrics.map((metric) => (
              <div key={metric.label} className="flex items-baseline gap-1.5">
                <dt className="label-mono text-ink-3">{metric.label}</dt>
                <dd className="font-mono text-xs font-medium tabular-nums text-ink-2">
                  {metric.score}<span className="sr-only">/100</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Reserve space for the fixed back-to-top control on narrow screens. */}
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pr-16 text-xs text-ink-3 xl:pr-0">
          <p>
            &copy; <span suppressHydrationWarning>{currentYear}</span>{' '}
            {siteConfig.personal.fullName}
          </p>
          <p>{t.footer.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
