'use client';

import Link from 'next/link';
import { useLocale } from '@/i18n';

export default function ProjectNotFound() {
  const { t } = useLocale();
  const labels = t.projects.caseStudy;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-primary-text mb-4">
        {labels.notFoundTitle}
      </h1>
      <p className="text-secondary-text max-w-md mb-8">
        {labels.notFoundDescription}
      </p>
      <Link
        href="/#projects"
        className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold shadow-lg hover:from-cyan-500 hover:to-blue-700 transition-all duration-300"
      >
        {labels.notFoundCta}
      </Link>
    </main>
  );
}
