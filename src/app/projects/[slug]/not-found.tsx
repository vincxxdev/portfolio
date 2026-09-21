'use client';

import Link from 'next/link';
import { useLocale } from '@/i18n';

export default function ProjectNotFound() {
  const { t } = useLocale();
  const labels = t.work.caseStudy.notFound;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
        {labels.title}
      </h1>
      <p className="mt-4 mb-8 max-w-md text-ink-2">{labels.description}</p>
      <Link
        href="/work"
        className="bg-signal text-on-signal hover:bg-signal-hover shadow-raised inline-flex items-center rounded-sm px-5 py-2.5 text-sm font-medium transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)]"
      >
        {labels.cta}
      </Link>
    </main>
  );
}
