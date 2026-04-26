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
  const descDelay = (totalChars * CHAR_DELAY + 200) / 1000;

  return (
    <section
      id="about"
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(to right, rgba(100, 116, 139, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.18) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)' } as React.CSSProperties} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_25%,transparent_72%,rgba(15,23,42,0.12)_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.12)_0%,transparent_22%,transparent_74%,rgba(10,25,47,0.32)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent opacity-70" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          <div className="group relative rounded-2xl border border-secondary-text/15 bg-primary-background/60 backdrop-blur-md shadow-lg hover:shadow-xl transition-[box-shadow] duration-500 overflow-hidden">
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

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-secondary-background z-[5] pointer-events-none" />
    </section>
  );
};

export default About;
