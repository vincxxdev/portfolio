'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Award, Briefcase, Code, Mail, MapPin, FolderGit2 } from 'lucide-react';
import { SectionHeader } from './ui/CardComponents';
import DownloadCVButton from './ui/DownloadCVButton';

const CVSection = () => {
  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Informazioni Personali',
      description: 'Nome, location e dati di contatto'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Competenze Tecniche',
      description: 'Tutte le skills organizzate per livello'
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Esperienza Lavorativa',
      description: 'Cronologia delle esperienze professionali'
    },
    {
      icon: <FolderGit2 className="w-6 h-6" />,
      title: 'Progetti',
      description: 'Portfolio progetti con link GitHub'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Certificazioni',
      description: 'Corsi e certificazioni completate'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Contatti',
      description: 'Email, telefono e link social'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Design Professionale',
      description: 'Layout pulito e ben strutturato'
    }
  ];

  return (
    <section 
      id="cv" 
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title={
              <>
                Scarica il mio <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">CV</span>
              </>
            }
            description="Curriculum Vitae generato automaticamente con tutte le informazioni del portfolio"
          />
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="group relative rounded-2xl border border-secondary-text/20 bg-secondary-background/50 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500 overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-2xl pointer-events-none"></div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10 p-8 sm:p-12">
              {/* Icon and Main Description */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3 
                  }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 mb-6 shadow-lg shadow-cyan-400/50"
                >
                  <Download className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-primary-text mb-4">
                  Curriculum Vitae Professionale
                </h3>
                <p className="text-lg text-secondary-text max-w-2xl mx-auto">
                  Genera automaticamente un CV in formato PDF contenente tutte le informazioni presenti in questo portfolio, 
                  strutturato in modo professionale e pronto per essere condiviso.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-primary-background/30 hover:bg-primary-background/50 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-600/20 flex items-center justify-center text-accent">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-text mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-secondary-text">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Download Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex justify-center"
              >
                <DownloadCVButton variant="primary" size="lg" />
              </motion.div>

              {/* Info Note */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-center text-sm text-secondary-text mt-6"
              >
                Il CV viene generato istantaneamente dal tuo browser, nessun dato viene inviato a server esterni.
              </motion.p>
            </div>

            {/* Bottom gradient line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CVSection;
