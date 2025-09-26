'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';

const Animation = () => {
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
    <div
      style={{ backgroundColor: 'var(--secondary-background)' }}
      className="h-screen w-full flex justify-center items-center overflow-hidden  absolute z-20 animate-fade-out-bck"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-full -z-10"
        style={{ x: xTransform, y: yTransform }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </motion.div>

      <div className="z-10">
        <h1 className="text-6xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent overflow-hidden whitespace-nowrap border-r-4 border-r-transparent animate-typewriter">
          vincxxdev
        </h1>
      </div>
    </div>
  );
};

export default Animation;
