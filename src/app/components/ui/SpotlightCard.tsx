'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card, { CardProps } from './Card';
import { useSpotlight } from '../hooks/useSpotlight';

const SpotlightCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', ...cardProps }, ref) => {
    const { ref: trackRef, handleMouseMove, handleMouseLeave, background, shouldReduceMotion } =
      useSpotlight();

    return (
      <div
        ref={trackRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative"
      >
        <Card
          ref={ref}
          {...cardProps}
          hoverEffect="none"
          gradientOverlay={false}
          cornerAccent={false}
          className={`relative overflow-hidden ${className}`}
        >
          {!shouldReduceMotion && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background }}
              aria-hidden="true"
            />
          )}
          <div className="relative z-10">{children}</div>
        </Card>
      </div>
    );
  }
);

SpotlightCard.displayName = 'SpotlightCard';
export default SpotlightCard;
