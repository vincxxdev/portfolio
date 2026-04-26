'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import Card, { CardProps } from './Card';

const TiltCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, ...cardProps }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const rotateX = useTransform(
      y,
      [0, 1],
      shouldReduceMotion ? [0, 0] : [8, -8]
    );
    const rotateY = useTransform(
      x,
      [0, 1],
      shouldReduceMotion ? [0, 0] : [-8, 8]
    );

    const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
    const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || shouldReduceMotion) return;
      const rect = cardRef.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
      x.set(0.5);
      y.set(0.5);
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1000 }}
        className="relative"
      >
        <motion.div
          ref={ref}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          <Card {...cardProps} hoverEffect="none">
            {children}
          </Card>
        </motion.div>
      </div>
    );
  }
);

TiltCard.displayName = 'TiltCard';
export default TiltCard;
