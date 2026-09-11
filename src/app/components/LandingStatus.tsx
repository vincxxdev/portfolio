'use client';

import React from 'react';
import { siteConfig } from '@/config/site';
import { useLocale } from '@/i18n';
import DownloadCVButton from './ui/DownloadCVButton';

const LandingStatus = () => {
  const { t } = useLocale();
  const status = t.landing.status;
  const rows = [
    { label: status.roleLabel, value: status.roleValue },
    { label: status.studyLabel, value: status.studyValue },
    { label: status.availabilityLabel, value: status.availabilityValue, positive: true },
    { label: status.locationLabel, value: siteConfig.personal.location },
  ].filter((row) => row.value);

  return (
    <section aria-labelledby="status-heading" className="border border-hairline border-t-signal bg-raised p-6 sm:p-8">
      <h2 id="status-heading" className="label-mono text-ink-3">{status.label}</h2>
      <dl className="mt-6 divide-y divide-hairline">
        {rows.map((row) => (
          <div key={row.label} className="py-4 first:pt-0">
            <dt className="label-mono text-ink-3">{row.label}</dt>
            <dd className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-ink">
              {row.positive && (
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-moss" />
              )}
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-2 border-t border-hairline pt-6">
        <DownloadCVButton variant="secondary" size="sm" className="w-full" />
      </div>
    </section>
  );
};

export default LandingStatus;
