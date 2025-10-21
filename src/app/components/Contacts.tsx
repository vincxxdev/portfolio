'use client';

import React from 'react';
import { Mail, Phone, MessageSquare, Send, MapPin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

import { siteConfig } from '@/config/site';
import { SectionHeader } from './ui/CardComponents';
import { useTranslations } from 'next-intl';

const Contacts = () => {
  const t = useTranslations('contacts');
  
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section 
      id="contacts" 
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title={t('title')}
            description={t('description')}
          />
        </motion.div>
        
        {/* Main contact cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12"
        >
          {/* Email Card */}
          <motion.a 
            variants={itemVariants}
            href={`mailto:${siteConfig.contact.email}`}
            className="group relative flex flex-col items-center gap-6 p-8 bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-secondary-text/20 shadow-xl hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            aria-label={t('sendEmail', { email: siteConfig.contact.email })}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-2xl"></div>
            
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Icon with glow effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-accent/30 group-hover:border-accent/50 transition-all duration-300">
                <Mail className="w-12 h-12 text-accent group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-primary-text mb-2 group-hover:text-accent transition-colors duration-300">
                {t('email')}
              </h3>
              <p className="text-secondary-text text-sm mb-3">{t('emailDescription')}</p>
              <p className="text-accent font-semibold break-all">{siteConfig.contact.email}</p>
            </div>

            {/* Arrow indicator */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <Send className="w-5 h-5 text-accent" />
            </div>
          </motion.a>
          
          {/* Phone Card */}
          <motion.a 
            variants={itemVariants}
            href={`tel:${siteConfig.contact.phone}`}
            className="group relative flex flex-col items-center gap-6 p-8 bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-secondary-text/20 shadow-xl hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            aria-label={t('callMe', { phone: siteConfig.contact.phoneDisplay })}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-2xl"></div>
            
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Icon with glow effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-accent/30 group-hover:border-accent/50 transition-all duration-300">
                <Phone className="w-12 h-12 text-accent group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-primary-text mb-2 group-hover:text-accent transition-colors duration-300">
                {t('phone')}
              </h3>
              <p className="text-secondary-text text-sm mb-3">{t('phoneDescription')}</p>
              <p className="text-accent font-semibold">{siteConfig.contact.phoneDisplay}</p>
            </div>

            {/* Arrow indicator */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <Send className="w-5 h-5 text-accent" />
            </div>
          </motion.a>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center gap-3 p-6 bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-accent/20 shadow-lg">
            <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-secondary-text mb-1">{t('location')}</p>
              <p className="text-base font-bold text-primary-text">{siteConfig.personal.location}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-accent/20 shadow-lg">
            <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl">
              <Globe className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-secondary-text mb-1">{t('availability')}</p>
              <p className="text-base font-bold text-primary-text">{t('availabilityStatus')}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-accent/20 shadow-lg">
            <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl">
              <MessageSquare className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-secondary-text mb-1">{t('responseTime')}</p>
              <p className="text-base font-bold text-primary-text">{t('responseTimeValue')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacts;