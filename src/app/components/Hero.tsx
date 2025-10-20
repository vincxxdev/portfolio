'use client';

import { motion, useMotionValue, useTransform, MotionConfig } from 'framer-motion';
import Button from './ui/Button';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown } from 'lucide-react';
import TypingText from './ui/TypingText';

// Load ParticleBackground in lazy mode to avoid blocking LCP
const ParticleBackground = dynamic(() => import('./ui/ParticleBackground'), {
  ssr: false,
  loading: () => null,
});

const Hero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xTransform = useTransform(x, [-100, 100], [-20, 20]);
  const yTransform = useTransform(y, [-100, 100], [-20, 20]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.width / 2);
    y.set(event.clientY - rect.height / 2);
  };

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
                className="relative group bg-secondary-background/50 backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-xl border border-secondary-text/20 hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500 max-w-5xl mx-auto overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
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
                    Ciao, sono <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Vincenzo Buttari</span>
                </motion.h1>
                
                {/* Description with rotating roles */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative z-10 text-lg sm:text-xl md:text-2xl text-primary-text max-w-3xl mx-auto mb-8 leading-relaxed"
                >
                    Un <span className="text-accent font-semibold">
                      <TypingText roles={['Software Engineer', 'Full Stack Developer']} />
                    </span> appassionato di creare soluzioni innovative e scalabili e di esplorare nuove tecnologie.
                </motion.p>

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