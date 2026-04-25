'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building2 } from 'lucide-react';
import Card from './ui/Card';
import { CardTitle, CardDescription, CardDivider, SectionHeader } from './ui/CardComponents';
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

  return (
    <section 
      id="experience" 
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Experiences Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title={
              <>
                {t.experience.title} <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">{t.experience.titleHighlight}</span>
              </>
            }
            description={t.experience.subtitle}
          />
        </motion.div>

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
                    <div className="absolute inset-0 bg-accent/30 rounded-full blur-md"></div>
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title={
              <>
                {t.experience.certTitle} <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  {t.experience.certTitleHighlight}
                </span>
              </>
            }
            description={t.experience.certSubtitle}
          />
        </motion.div>

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

              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-accent/50 text-accent hover:bg-accent hover:text-white hover:border-accent font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">{t.experience.viewCert}</span>
              </a>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
