'use client';

import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useMotionTemplate,
} from 'framer-motion';
import Card, { CardProps } from './Card';

const SpotlightCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', ...cardProps }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const cardRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    const springX = useSpring(mouseX, { stiffness: 120, damping: 25, mass: 0.5 });
    const springY = useSpring(mouseY, { stiffness: 120, damping: 25, mass: 0.5 });

    const background = useMotionTemplate`
      radial-gradient(600px circle at ${springX}px ${springY}px, rgba(34,211,238,0.10), transparent 40%)
    `;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || shouldReduceMotion) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
      mouseX.set(-1000);
      mouseY.set(-1000);
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative"
      >
        <Card
          ref={ref}
          {...cardProps}
          hoverEffect="none"
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
