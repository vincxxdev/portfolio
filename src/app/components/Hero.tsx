'use client';

import { motion, useMotionValue, useTransform, MotionConfig } from 'framer-motion';
import Button from './ui/Button';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

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
                className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20"
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-7xl font-extrabold text-primary-text leading-tight mb-4">
                    Ciao, sono <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Vincenzo Buttari</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-secondary-text max-w-3xl mx-auto mb-8">
                    Un Software Engineer appassionato di creare soluzioni innovative e scalabili e di esplorare nuove tecnologie.
                </p>
                
                <div className="flex justify-center space-x-4">
                  <Button href="#projects" variant="primary" size="lg">
                      I miei Progetti
                  </Button>
                </div>
              </motion.div>
          </div>
      </section>
    </MotionConfig>
  );
};

export default Hero;