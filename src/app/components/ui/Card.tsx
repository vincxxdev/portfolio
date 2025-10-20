'use client';

import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** Hover effects: lift, scale, or both */
  hoverEffect?: 'lift' | 'scale' | 'both' | 'none';
  /** Show gradient overlay on hover */
  gradientOverlay?: boolean;
  /** Show corner accent on hover */
  cornerAccent?: boolean;
  /** Intensity of shadow glow on hover */
  glowIntensity?: 'light' | 'medium' | 'strong' | 'none';
  /** Padding size */
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  /** Custom className for additional styling */
  className?: string;
  /** Optional badge configuration */
  badge?: {
    icon?: LucideIcon;
    text: string;
  };
  /** Optional icon in top area */
  icon?: {
    Icon: LucideIcon;
    className?: string;
  };
}

const paddingMap = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const glowMap = {
  none: '',
  light: 'hover:shadow-cyan-400/10',
  medium: 'hover:shadow-cyan-400/20',
  strong: 'hover:shadow-cyan-400/30',
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      hoverEffect = 'both',
      gradientOverlay = true,
      cornerAccent = true,
      glowIntensity = 'medium',
      padding = 'md',
      className = '',
      badge,
      icon,
      ...motionProps
    },
    ref
  ) => {
    const { playSound } = useSound();

    // Build hover animation
    const getHoverAnimation = () => {
      const animations: { scale?: number; y?: number } = {};
      if (hoverEffect === 'lift' || hoverEffect === 'both') {
        animations.y = -8;
      }
      if (hoverEffect === 'scale' || hoverEffect === 'both') {
        animations.scale = 1.02;
      }
      return hoverEffect === 'none' ? {} : animations;
    };

    const handleMouseEnter = () => {
      playSound('hover');
    };

    return (
      <motion.div
        ref={ref}
        whileHover={getHoverAnimation()}
        onMouseEnter={handleMouseEnter}
        className={`
          group relative flex flex-col
          ${paddingMap[padding]}
          rounded-2xl border border-secondary-text/20
          bg-secondary-background/50 backdrop-blur-lg
          shadow-xl hover:shadow-2xl ${glowMap[glowIntensity]}
          transition-all duration-500
          overflow-hidden
          ${className}
        `}
        {...motionProps}
      >
        {/* Gradient overlay on hover */}
        {gradientOverlay && (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-2xl pointer-events-none" />
        )}

        {/* Corner accent */}
        {cornerAccent && (
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Optional icon at the top */}
          {icon && (
            <div className="mb-4">
              <div className="inline-flex p-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-accent/20 group-hover:border-accent/40 transition-all duration-300">
                <icon.Icon className={`w-6 h-6 text-accent ${icon.className || ''}`} />
              </div>
            </div>
          )}

          {/* Optional badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-3 self-start">
              {badge.icon && <badge.icon className="w-3 h-3 text-accent" />}
              <span className="text-xs font-semibold text-accent">{badge.text}</span>
            </div>
          )}

          {/* Card content */}
          {children}
        </div>
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
