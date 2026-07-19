'use client';

import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

import { certificationData as certificationDataRaw } from '@/data/certifications';
import { useLocale } from '@/i18n';

const Certifications = () => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  const certifications = useMemo(() => {
    const urlMap = new Map(certificationDataRaw.map((c) => [c.id, c.url]));
    return t.certifications.items
      .map((cert) => ({ ...cert, url: urlMap.get(cert.id) ?? '#' }))
      .sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  }, [t]);

  return (
    <div>
      <h3 className="text-2xl text-ink sm:text-3xl">{t.about.certifications.title}</h3>
      <p className="mt-3 max-w-2xl text-sm text-ink-2 sm:text-base">
        {t.about.certifications.description}
      </p>

      <ul className="mt-10 border-t border-hairline">
        {certifications.map((cert, index) => (
          <motion.li
            key={cert.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.26, ease: [0.2, 0, 0, 1], delay: index * 0.05 }}
            className="border-b border-hairline"
          >
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 py-5 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] sm:flex-row sm:items-center sm:gap-6"
              aria-label={`${t.about.certifications.viewCert} — ${cert.title}`}
            >
              <span className="label-mono w-28 shrink-0 text-ink-3">{cert.date}</span>

              <span className="min-w-0 flex-1">
                <span className="block text-base text-ink transition-colors duration-[180ms] group-hover:text-signal-ink">
                  {cert.title}
                </span>
                <span className="mt-1 block text-sm text-ink-2">{cert.issuer}</span>
              </span>

              <span className="label-mono flex shrink-0 items-center gap-2 text-ink-3 transition-colors duration-[180ms] group-hover:text-signal-ink">
                {t.about.certifications.viewCert}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Certifications;
