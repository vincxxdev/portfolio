'use client';

import React, { useRef } from 'react';
import {
  useMotionValue,
  useSpring,
  useReducedMotion,
  useMotionTemplate,
  MotionValue,
} from 'framer-motion';

interface UseSpotlightReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: () => void;
  background: MotionValue<string>;
  shouldReduceMotion: boolean | null;
}

export function useSpotlight(): UseSpotlightReturn {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25, mass: 0.5 });

  const background = useMotionTemplate`
    radial-gradient(600px circle at ${springX}px ${springY}px, rgba(34,211,238,0.10), transparent 40%)
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || shouldReduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return { ref, handleMouseMove, handleMouseLeave, background, shouldReduceMotion };
}
