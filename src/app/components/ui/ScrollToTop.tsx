'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setIsLaunching(true);
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Reset animation after scroll
    setTimeout(() => {
      setIsLaunching(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            rotate: isLaunching ? -45 : 0,
          }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          whileHover={{ scale: 1.1, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full shadow-2xl shadow-cyan-500/50 backdrop-blur-lg border-2 border-white/20 group"
          aria-label="Torna in cima"
        >
          <motion.div
            animate={isLaunching ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Rocket className="w-6 h-6 group-hover:animate-bounce" />
          </motion.div>

          {/* Flame effect when launching */}
          {isLaunching && (
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-2xl">🔥</div>
            </motion.div>
          )}

          {/* Sparkle trail */}
          <AnimatePresence>
            {isLaunching && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-xl"
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: (Math.random() - 0.5) * 40,
                      y: 20 + i * 15,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{ left: '50%', top: '100%' }}
                  >
                    ✨
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
