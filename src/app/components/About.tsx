"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { SectionHeader } from './ui/CardComponents';
import { useTranslations } from 'next-intl';


const About = () => {
  const t = useTranslations('about');
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const command = 'cat ./about.txt';
  const content = `
${t('bio')}`;
  
  const fullText = useMemo(() => `$ ${command}\n${content}`, [command, content]);

  useEffect(() => {
    let i = 0;
    let cursorInterval: NodeJS.Timeout | null = null;
    
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
        
        // Random speed variation for more realistic typing
        const randomDelay = Math.random() * 30 + 20;
        clearInterval(typing);
        setTimeout(() => {
          const newTyping = setInterval(() => {
            if (i < fullText.length) {
              setText(fullText.substring(0, i + 1));
              i++;
            } else {
              clearInterval(newTyping);
              cursorInterval = setInterval(() => setShowCursor(show => !show), 500);
            }
          }, randomDelay);
        }, randomDelay);
      } else {
        clearInterval(typing);
        cursorInterval = setInterval(() => setShowCursor(show => !show), 500);
      }
    }, 50);

    return () => {
      clearInterval(typing);
      if (cursorInterval) clearInterval(cursorInterval);
    };
  }, [fullText]);

  return (
    <section 
      id="about" 
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {/* Terminal Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="group relative rounded-2xl border border-secondary-text/20 bg-secondary-background/50 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500 overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-2xl pointer-events-none"></div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {/* Terminal Header */}
            <div className="relative z-10 bg-gradient-to-r from-secondary-background/80 to-secondary-background/60 backdrop-blur-md p-4 flex items-center border-b border-secondary-text/20">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
              </div>
              <div className="flex-grow flex items-center justify-center gap-2">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">vincxsh@portfolio</span>
              </div>
              <div className="w-16"></div>
            </div>

            {/* Terminal Content */}
            <div className="relative z-10 p-6 sm:p-8 font-mono text-primary-text text-sm sm:text-base">
              <pre className="whitespace-pre-wrap leading-relaxed">
                <span className="text-accent font-bold">$ </span>
                <span className="text-secondary-text">{command}</span>
                {'\n'}
                <span className="text-primary-text">{text.substring(command.length + 3)}</span>
                {showCursor && (
                  <span className="inline-block w-2 h-5 ml-0.5 bg-accent animate-pulse align-middle"></span>
                )}
              </pre>
            </div>

            {/* Bottom gradient line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
