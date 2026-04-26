'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSpotlight } from '../hooks/useSpotlight';

interface SpotlightWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightWrapper = React.forwardRef<HTMLDivElement, SpotlightWrapperProps>(
  ({ children, className = '' }, ref) => {
    const { ref: trackRef, handleMouseMove, handleMouseLeave, background, shouldReduceMotion } =
      useSpotlight();

    return (
      <div
        ref={(node) => {
          trackRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative overflow-hidden ${className}`}
      >
        {!shouldReduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background }}
            aria-hidden="true"
          />
        )}
        {children}
      </div>
    );
  }
);

SpotlightWrapper.displayName = 'SpotlightWrapper';
export default SpotlightWrapper;
