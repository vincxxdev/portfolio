'use client';

import { motion, useMotionValue, useTransform, MotionConfig } from 'framer-motion';
import Button from './ui/Button';
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown } from 'lucide-react';
import TypingText from './ui/TypingText';
import DownloadCVButton from './ui/DownloadCVButton';
import { siteConfig } from '@/config/site';

// Load ParticleBackground in lazy mode to avoid blocking LCP
const ParticleBackground = dynamic(() => import('./ui/ParticleBackground'), {
  ssr: false,
  loading: () => null,
});

const STORY_STEPS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Esperienze' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Progetti' },
  { id: 'contacts', label: 'Contatti' },
] as const;

const STEP_DURATION = 4000;

const Hero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [spotlight, setSpotlight] = useState({ x: '50%', y: '50%' });
  const [isStoryRunning, setIsStoryRunning] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const [storyStepIndex, setStoryStepIndex] = useState(0);
  const [storyCompleted, setStoryCompleted] = useState(false);
  const storyTimeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const storyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const xTransform = useTransform(x, [-100, 100], [-20, 20]);
  const yTransform = useTransform(y, [-100, 100], [-20, 20]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.width / 2);
    y.set(event.clientY - rect.height / 2);
    const posX = ((event.clientX - rect.left) / rect.width) * 100;
    const posY = ((event.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x: `${posX}%`, y: `${posY}%` });
  };

  const scrollToSection = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const clearStoryTimers = useCallback(() => {
    storyTimeoutsRef.current.forEach((timer) => clearTimeout(timer));
    storyTimeoutsRef.current = [];

    if (storyIntervalRef.current) {
      clearInterval(storyIntervalRef.current);
      storyIntervalRef.current = null;
    }
  }, []);

  const stopStoryMode = useCallback(() => {
    clearStoryTimers();
    setIsStoryRunning(false);
    setStoryProgress(0);
    setStoryStepIndex(0);
    setStoryCompleted(false);
  }, [clearStoryTimers]);

  const startStoryMode = () => {
    clearStoryTimers();

    setStoryCompleted(false);
    setIsStoryRunning(true);
    setStoryProgress(0);
    setStoryStepIndex(0);

    const totalDuration = STORY_STEPS.length * STEP_DURATION;
    const startedAt = Date.now();

    scrollToSection(STORY_STEPS[0].id);

    STORY_STEPS.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setStoryStepIndex(index);
        scrollToSection(step.id);
      }, index * STEP_DURATION);

      storyTimeoutsRef.current.push(timeout);
    });

    const completeTimeout = setTimeout(() => {
      if (storyIntervalRef.current) {
        clearInterval(storyIntervalRef.current);
        storyIntervalRef.current = null;
      }
      setIsStoryRunning(false);
      setStoryCompleted(true);
      setStoryProgress(100);
    }, totalDuration);
    storyTimeoutsRef.current.push(completeTimeout);

    storyIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const progress = Math.min((elapsed / totalDuration) * 100, 100);
      setStoryProgress(progress);
    }, 80);
  };

  useEffect(() => {
    return () => {
      clearStoryTimers();
    };
  }, [clearStoryTimers]);

  return (
    <MotionConfig reducedMotion="user">
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
          <motion.div 
            className="absolute top-0 left-0 w-full h-full z-0"
            style={{ x: xTransform, y: yTransform }}
          >
              <Suspense fallback={null}>
                <ParticleBackground />
              </Suspense>
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-blob"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
          </motion.div>

          <div className="container mx-auto px-4 text-center z-10">
              <motion.div 
                className="relative group bg-secondary-background/50 backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-xl border border-secondary-text/20 hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onMouseLeave={() => setSpotlight({ x: '50%', y: '50%' })}
              >
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(450px circle at ${spotlight.x} ${spotlight.y}, rgba(6, 182, 212, 0.15), transparent 50%)`,
                  }}
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-2xl pointer-events-none"></div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Title */}
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative z-10 text-4xl sm:text-5xl md:text-7xl font-extrabold text-primary-text leading-tight mb-6"
                >
                    Ciao, sono <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">{siteConfig.personal.fullName}</span>
                </motion.h1>
                
                {/* Description with rotating roles */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative z-10 text-lg sm:text-xl md:text-2xl text-primary-text max-w-3xl mx-auto mb-8 leading-relaxed"
                >
                    Un <span className="text-accent font-semibold">
                      <TypingText roles={[...siteConfig.personal.titles]} />
                    </span> {siteConfig.personal.tagline}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.58 }}
                  className="relative z-10 mb-8 flex flex-wrap justify-center gap-3"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Disponibile a nuove opportunita
                  </span>
                  <span className="inline-flex items-center rounded-full border border-secondary-text/25 bg-primary-background/50 px-4 py-2 text-sm font-semibold text-secondary-text">
                    Risposta media: 24-48h
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.63 }}
                  className="relative z-10 mb-8 max-w-xl mx-auto rounded-2xl border border-secondary-text/20 bg-primary-background/45 backdrop-blur-md p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-primary-text">Story Mode: Tour rapido in 20 secondi</p>
                    {isStoryRunning ? (
                      <button
                        type="button"
                        onClick={stopStoryMode}
                        className="px-3 py-1.5 text-sm font-semibold rounded-lg border border-secondary-text/30 text-secondary-text hover:text-primary-text hover:border-accent/50 transition-colors"
                      >
                        Stop tour
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={startStoryMode}
                        className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-colors"
                      >
                        Avvia tour
                      </button>
                    )}
                  </div>

                  <div className="mt-3 h-2 rounded-full bg-secondary-text/20 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                      animate={{ width: `${storyProgress}%` }}
                      transition={{ duration: 0.1, ease: 'linear' }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 text-xs text-secondary-text">
                    <span>
                      {isStoryRunning
                        ? `Ora: ${STORY_STEPS[storyStepIndex]?.label}`
                        : 'Il tour porta il recruiter nelle sezioni principali in automatico.'}
                    </span>
                    <span>{Math.round(storyProgress)}%</span>
                  </div>

                  {storyCompleted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3"
                    >
                      <Button href="#contacts" variant="primary" size="sm" className="w-full">
                        Tour completato: parliamone ora
                      </Button>
                    </motion.div>
                  )}
                </motion.div>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative z-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-8 max-w-md mx-auto"
                ></motion.div>
                
                {/* Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="relative z-10 flex flex-col sm:flex-row justify-center gap-4"
                >
                  <Button href="#projects" variant="primary" size="lg">
                      I miei Progetti
                  </Button>
                  <Button href="#contacts" variant="secondary" size="lg">
                      Contattami
                  </Button>
                  <DownloadCVButton variant="secondary" size="lg" />
                </motion.div>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 0.5 }}
                className="mt-12"
              >
                <a 
                  href="#about"
                  className="inline-flex flex-col items-center gap-2 text-primary-text hover:text-accent transition-colors duration-300"
                  aria-label="Scorri verso il basso"
                >
                  <span className="text-sm font-medium">Scopri di più</span>
                  <ArrowDown className="w-5 h-5" />
                </a>
              </motion.div>
          </div>
      </section>
    </MotionConfig>
  );
};

export default Hero;
