'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiProps {
  trigger: boolean;
}

export const Confetti: React.FC<ConfettiProps> = ({ trigger }) => {
  const [pieces, setPieces] = useState<number[]>([]);

  useEffect(() => {
    if (trigger) {
      setPieces(Array.from({ length: 50 }, (_, i) => i));
      setTimeout(() => setPieces([]), 3000);
    }
  }, [trigger]);

  const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

  return (
    <AnimatePresence>
      {pieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {pieces.map((i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: colors[i % colors.length],
                left: `${Math.random() * 100}%`,
                top: '-10px',
              }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [1, 1, 0],
                rotate: Math.random() * 360,
                x: (Math.random() - 0.5) * 200,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2 + Math.random() * 2,
                ease: 'easeIn',
                delay: i * 0.02,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};
