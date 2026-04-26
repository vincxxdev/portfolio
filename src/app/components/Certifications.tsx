'use client';

import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import Button from './ui/Button';
import GradientBorderCard from './ui/GradientBorderCard';
import { CardTitle, CardDivider, SectionHeader } from './ui/CardComponents';
import Printer3DText, { CHAR_DELAY } from './ui/Printer3DText';
import { certificationData as certificationDataRaw } from '@/data/certifications';
import { useLocale } from '@/i18n';

const Certifications = () => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  const certificationData = useMemo(() => {
    const urlMap = new Map(certificationDataRaw.map((c) => [c.id, c.url]));
    const certs = t.certifications.items.map((cert) => ({
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
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: (i: number) =>
      shouldReduceMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: i % 2 === 0 ? -160 : 160,
            y: 50,
            scale: 0.7,
            rotateY: i % 2 === 0 ? -18 : 18,
          },
    visible: shouldReduceMotion
      ? { opacity: 1, transition: { duration: 0.3 } }
      : {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotateY: 0,
          transition: {
            type: 'spring' as const,
            stiffness: 65,
            damping: 13,
            mass: 0.9,
          },
        },
  };

  const totalChars = t.certifications.title.length + 1 + t.certifications.titleHighlight.length;
  const descDelay = (totalChars * CHAR_DELAY + 200) / 1000;

  return (
    <section
      id="certifications"
      className="py-20 sm:py-32 relative"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(to right, rgba(100, 116, 139, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.18) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)' } as React.CSSProperties} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_25%,transparent_72%,rgba(15,23,42,0.12)_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.12)_0%,transparent_22%,transparent_74%,rgba(10,25,47,0.32)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent opacity-70" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title={<Printer3DText text={t.certifications.title} highlightText={t.certifications.titleHighlight} />}
          description={t.certifications.subtitle}
          descriptionDelay={descDelay}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2"
          style={{ perspective: 800 }}
        >
          {certificationData.map((cert, index) => (
            <GradientBorderCard
              key={index}
              padding="md"
              icon={{ Icon: Award }}
              badge={{ icon: Calendar, text: cert.date }}
              custom={index}
              variants={cardVariants}
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
                <span className="text-sm">{t.certifications.viewCert}</span>
              </Button>
            </GradientBorderCard>
          ))}
        </motion.div>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-secondary-background z-[5] pointer-events-none" />
    </section>
  );
};

export default Certifications;
