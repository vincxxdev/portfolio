'use client';

import React from 'react';

import { useLocale } from '@/i18n';
import Timeline from './ui/Timeline';

const Experience = () => {
  const { t } = useLocale();

  return (
    <div>
      <h2 className="text-2xl text-ink sm:text-3xl">{t.about.experience.title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-ink-2 sm:text-base">
        {t.about.experience.description}
      </p>

      <Timeline entries={t.experience.items.map((item, index) => ({
        id: `${item.company}-${item.date}`,
        period: item.date,
        title: item.title,
        organization: item.company,
        description: item.description,
        highlighted: index === 0,
        status: index === 0 ? t.about.experience.current : undefined,
      }))} />
    </div>
  );
};

export default Experience;
