"use client";

import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { SectionHeader } from './ui/CardComponents';
import Printer3DText, { CHAR_DELAY } from './ui/Printer3DText';

import { useLocale } from '@/i18n';


const About = () => {
  const { t } = useLocale();
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cursorIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const command = t.about.terminalCommand;
  const content = `\n${t.about.bio}`;
  const bioText = useMemo(() => content, [content]);

  const startTyping = useCallback(() => {
    let i = 0;
    const typeNext = () => {
      if (i >= bioText.length) {
        cursorIntervalRef.current = setInterval(() => {
          if (cursorRef.current) {
            cursorRef.current.style.opacity = cursorRef.current.style.opacity === '0' ? '1' : '0';
          }
        }, 500);
        return;
      }
      if (textRef.current) {
        textRef.current.textContent = bioText.substring(0, i + 1);
      }
      i++;
      typingTimeoutRef.current = setTimeout(typeNext, Math.random() * 30 + 20);
    };
    typingTimeoutRef.current = setTimeout(typeNext, 50);
  }, [bioText]);

  useEffect(() => {
    startTyping();
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, [startTyping]);

  const totalChars = t.about.title.length + 1 + t.about.titleHighlight.length;
  const descDelay = totalChars * CHAR_DELAY + 200;

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
        <SectionHeader
          title={<Printer3DText text={t.about.title} highlightText={t.about.titleHighlight} />}
          description={t.about.subtitle}
          descriptionDelay={descDelay}
        />

        {/* Terminal Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="group relative rounded-2xl border border-secondary-text/20 bg-secondary-background/80 shadow-xl hover:shadow-2xl hover:shadow-cyan-400/20 transition-[box-shadow] duration-500 overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-[background] duration-500 rounded-2xl pointer-events-none"></div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {/* Terminal Header */}
            <div className="relative z-10 bg-secondary-background/90 p-4 flex items-center border-b border-secondary-text/20">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
              </div>
              <div className="flex-grow flex items-center justify-center gap-2">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">{t.about.terminalUser}</span>
              </div>
              <div className="w-16"></div>
            </div>

            {/* Terminal Content */}
            <div className="relative z-10 p-6 sm:p-8 font-mono text-primary-text text-sm sm:text-base">
              <pre className="whitespace-pre-wrap leading-relaxed">
                <span className="text-accent font-bold">$ </span>
                <span className="text-secondary-text">{command}</span>
                {'\n'}
                <span ref={textRef} className="text-primary-text" />
                <span ref={cursorRef} className="inline-block w-2 h-5 ml-0.5 bg-accent align-middle" />
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
