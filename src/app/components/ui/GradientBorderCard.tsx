'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Card, { CardProps } from './Card';

const GradientBorderCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', ...cardProps }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    const {
      hoverEffect,
      gradientOverlay,
      cornerAccent,
      glowIntensity,
      padding,
      disableBlur,
      badge,
      icon,
      ...motionProps
    } = cardProps;

    return (
      <motion.div
        ref={ref}
        {...motionProps}
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
        <div className="relative rounded-[15px] overflow-hidden">
          <Card
            hoverEffect={hoverEffect}
            gradientOverlay={gradientOverlay}
            cornerAccent={cornerAccent}
            glowIntensity={glowIntensity}
            padding={padding}
            disableBlur={disableBlur}
            badge={badge}
            icon={icon}
            className="border-0 shadow-none"
          >
            {children}
          </Card>
        </div>
      </motion.div>
    );
  }
);

GradientBorderCard.displayName = 'GradientBorderCard';
export default GradientBorderCard;
