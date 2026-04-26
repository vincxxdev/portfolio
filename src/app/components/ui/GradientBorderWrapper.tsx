'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GradientBorderWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const GradientBorderWrapper = React.forwardRef<
  HTMLDivElement,
  GradientBorderWrapperProps
>(({ children, className = '' }, ref) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl p-[1px] overflow-hidden ${className}`}
    >
      <div
        className={`absolute inset-[-50%] rounded-none ${shouldReduceMotion ? '' : 'animate-gradient-spin'}`}
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(6,182,212,0.5) 60deg, transparent 120deg, transparent 240deg, rgba(6,182,212,0.5) 300deg, transparent 360deg)',
        }}
        aria-hidden="true"
      />
      <div className="relative rounded-[15px] overflow-hidden h-full">
        {children}
      </div>
    </motion.div>
  );
});

GradientBorderWrapper.displayName = 'GradientBorderWrapper';
export default GradientBorderWrapper;
