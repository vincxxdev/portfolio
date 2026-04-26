'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building2 } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import { CardTitle, CardDescription, CardDivider, SectionHeader } from './ui/CardComponents';
import Printer3DText, { CHAR_DELAY } from './ui/Printer3DText';
import { certificationData as certificationDataRaw } from '@/data/certifications';
import { useLocale } from '@/i18n';

const Experience = () => {
  const { t } = useLocale();

  const certificationData = useMemo(() => {
    const urlMap = new Map(certificationDataRaw.map((c) => [c.id, c.url]));
    const certs = t.experience.certifications.map((cert) => ({
      ...cert,
      url: urlMap.get(cert.id) ?? '#',
    }));
    return [...certs].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  }, [t]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const expTotalChars = t.experience.title.length + 1 + t.experience.titleHighlight.length;
  const expDescDelay = (expTotalChars * CHAR_DELAY + 200) / 1000;

  const certTotalChars = t.experience.certTitle.length + 1 + t.experience.certTitleHighlight.length;
  const certDescDelay = (certTotalChars * CHAR_DELAY + 200) / 1000;

  return (
    <section
      id="experience"
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(to right, rgba(100, 116, 139, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.18) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)' } as React.CSSProperties} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_25%,transparent_72%,rgba(15,23,42,0.12)_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.12)_0%,transparent_22%,transparent_74%,rgba(10,25,47,0.32)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent opacity-70" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Experiences Section */}
        <SectionHeader
          title={<Printer3DText text={t.experience.title} highlightText={t.experience.titleHighlight} />}
          description={t.experience.subtitle}
          descriptionDelay={expDescDelay}
        />

        <div className="relative max-w-4xl mx-auto mb-24">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-accent/50 via-accent/30 to-accent/10"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {t.experience.items.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/30 rounded-full blur-md shadow-[0_0_18px_var(--color-accent)]"></div>
                    <div className="relative bg-accent w-4 h-4 rounded-full border-4 border-primary-background"></div>
                  </div>
                </div>

                {/* Content card */}
                <Card
                  hoverEffect="lift"
                  padding="md"
                  badge={{ icon: Calendar, text: item.date }}
                >
                  <CardTitle className="text-2xl mb-2">
                    {item.title}
                  </CardTitle>

                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-4 h-4 text-secondary-text" />
                    <p className="text-base text-secondary-text font-semibold">{item.company}</p>
                  </div>

                  <CardDescription>
                    {item.description}
                  </CardDescription>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certifications Section */}
        <SectionHeader
          title={<Printer3DText text={t.experience.certTitle} highlightText={t.experience.certTitleHighlight} />}
          description={t.experience.certSubtitle}
          descriptionDelay={certDescDelay}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2"
        >
          {certificationData.map((cert, index) => (
            <Card
              key={index}
              hoverEffect="both"
              padding="md"
              icon={{ Icon: Award }}
              badge={{ icon: Calendar, text: cert.date }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" as const }}
            >
              <CardTitle className="mb-2 flex-grow">
                {cert.title}
              </CardTitle>

              <p className="text-sm text-secondary-text mb-4 font-semibold">
                {cert.issuer}
              </p>

              <CardDivider className="mb-4" />

              <Button
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="default"
                className="w-full gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">{t.experience.viewCert}</span>
              </Button>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
