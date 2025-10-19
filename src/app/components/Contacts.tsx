'use client'; // Framer Motion requires this

import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';



import { siteConfig } from '@/config/site';

const Contacts = () => {
  return (
    <section 
      id="contacts" 
      className="py-20 sm:py-32 bg-secondary-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-primary-text mb-4">
          Contattami
        </h2>
        <p className="text-lg text-secondary-text max-w-2xl mx-auto mb-16">
          Sono sempre aperto a nuove opportunità e collaborazioni. Sentiti libero di contattarmi tramite i canali qui sotto.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
          <motion.a 
            href={`mailto:${siteConfig.contact.email}`}
            className="flex flex-col items-center gap-4 text-primary-text group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="p-6 bg-background rounded-full border-2 border-transparent group-hover:border-accent transition-all duration-300 shadow-lg">
              <Mail className="w-10 h-10 text-accent" />
            </div>
            <span className="text-xl font-semibold group-hover:text-accent transition-colors duration-300">{siteConfig.contact.email}</span>
          </motion.a>
          
          <motion.a 
            href={`tel:${siteConfig.contact.phone}`}
            className="flex flex-col items-center gap-4 text-primary-text group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="p-6 bg-background rounded-full border-2 border-transparent group-hover:border-accent transition-all duration-300 shadow-lg">
              <Phone className="w-10 h-10 text-accent" />
            </div>
            <span className="text-xl font-semibold group-hover:text-accent transition-colors duration-300">{siteConfig.contact.phoneDisplay}</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Contacts;