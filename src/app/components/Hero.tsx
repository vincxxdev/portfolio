'use client';

import { motion } from 'framer-motion';
import Button from './ui/Button';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-extrabold text-primary-text leading-tight mb-4"
            >
                Ciao, sono <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Vincenzo</span>
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-secondary-text max-w-3xl mx-auto mb-8"
            >
                Un Software Engineer appassionato di creare soluzioni innovative e scalabili e di esplorare nuove tecnologie.
            </motion.p>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex justify-center space-x-4"
            >
            
            <Button href="#projects" variant="primary" size="default">
                I miei Progetti
            </Button>
            </motion.div>
        </div>
    </section>
  );
};

export default Hero;