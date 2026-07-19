'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useSound } from '../hooks/useSound';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

// Damping ratio ~1.94 — overdamped, so it settles without overshooting.
const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Measured once on enter rather than on every move: getBoundingClientRect
  // forces a synchronous layout read, and doing that per mousemove is a reflow
  // on every frame of the effect.
  const rect = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const { playSound } = useSound();

  const shouldReduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  // Pointer-input gating, per the sitewide pattern: a magnetic pull has no
  // meaning without a hovering cursor, and the listeners are dead weight on
  // touch. The change listener covers hybrid devices.
  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)');
    const sync = () => setFinePointer(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // These are JS-driven Framer values. The global CSS prefers-reduced-motion
  // rule cannot reach them, so the gate has to live here.
  const active = finePointer && !shouldReduceMotion;

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!active || !rect.current) return;
      const { width, height, left, top } = rect.current;
      x.set((event.clientX - (left + width / 2)) * 0.15);
      y.set((event.clientY - (top + height / 2)) * 0.15);
    },
    [active, x, y],
  );

  const handleMouseEnter = useCallback(() => {
    playSound('hover');
    if (active) rect.current = ref.current?.getBoundingClientRect() ?? null;
  }, [active, playSound]);

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  // The motion.div and its style are rendered in *both* branches on purpose.
  // This component wraps arbitrary children, and a transform makes its subtree
  // a containing block — so dropping the style under reduced motion would give
  // positioned descendants a different reference frame in one branch than the
  // other. The gate decides whether the values ever change, never the layout.
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
