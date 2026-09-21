'use client';

import React from 'react';

import { useLocale } from '@/i18n';
import Timeline from './ui/Timeline';

const Education = () => {
  const { t } = useLocale();

  return (
    <div>
      <h2 className="text-2xl text-ink sm:text-3xl">{t.about.education.title}</h2>

      <Timeline entries={t.cvData.education.map((item, index) => ({
        id: `${item.institution}-${item.period}`,
        period: item.period,
        title: item.title,
        organization: item.institution,
        highlighted: index === 0,
      }))} />
    </div>
  );
};

export default Education;
