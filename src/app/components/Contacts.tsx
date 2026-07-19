'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';

import SectionIntro from './SectionIntro';
import Card from './ui/Card';
import Button from './ui/Button';
import DownloadCVButton from './ui/DownloadCVButton';
import { siteConfig } from '@/config/site';
import { useLocale } from '@/i18n';

interface ContactsProps {
  as?: 'h1' | 'h2';
}

const Contacts = ({ as = 'h1' }: ContactsProps) => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  const channels = [
    {
      href: `mailto:${siteConfig.contact.email}`,
      icon: Mail,
      title: t.contact.email.title,
      subtitle: t.contact.email.subtitle,
      value: siteConfig.contact.email,
      ariaLabel: `${t.accessibility.sendEmail} ${siteConfig.contact.email}`,
    },
    {
      href: `tel:${siteConfig.contact.phone}`,
      icon: Phone,
      title: t.contact.phone.title,
      subtitle: t.contact.phone.subtitle,
      value: siteConfig.contact.phoneDisplay,
      ariaLabel: `${t.accessibility.callPhone} ${siteConfig.contact.phoneDisplay}`,
    },
  ];

  const facts = [
    { label: t.contact.location, value: siteConfig.personal.location },
    { label: t.contact.availability, value: t.contact.availabilityValue, positive: true },
    { label: t.contact.responseTime, value: t.contact.responseTimeValue },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-canvas">
      <div aria-hidden="true" className="bg-section-grid absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionIntro title={t.contact.title} lead={t.contact.lead} as={as} />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {channels.map((channel, index) => (
            <motion.div
              key={channel.href}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.32, ease: [0.2, 0, 0, 1], delay: index * 0.07 }}
              className="h-full"
            >
              <a href={channel.href} aria-label={channel.ariaLabel} className="block h-full">
                <Card interactive padding="lg" className="h-full">
                  <span className="flex items-start justify-between gap-4">
                    <channel.icon className="h-6 w-6 text-signal-ink" aria-hidden="true" />
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-5 w-5 text-ink-3 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:text-signal-ink"
                    />
                  </span>

                  <h3 className="mt-7 text-xl text-ink">{channel.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-2">{channel.subtitle}</p>
                  <p className="mt-5 break-all font-mono text-sm text-signal-ink">
                    {channel.value}
                  </p>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-2.5 bg-raised p-5">
              <dt className="label-mono text-ink-3">{fact.label}</dt>
              <dd className="flex items-start gap-2 text-sm text-ink">
                {fact.positive && (
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-moss" />
                )}
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 border-t border-hairline pt-16">
          <h3 className="text-2xl text-ink sm:text-3xl">{t.contact.cta.title}</h3>
          <p className="mt-3 max-w-2xl text-base text-ink-2">{t.contact.cta.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={`mailto:${siteConfig.contact.email}`}
              variant="primary"
              size="lg"
              className="gap-2.5"
            >
              <span>{t.contact.cta.action}</span>
              <Mail className="h-4 w-4" aria-hidden="true" />
            </Button>
            <DownloadCVButton variant="secondary" size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
