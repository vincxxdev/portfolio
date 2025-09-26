'use client';

import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const springConfig = { damping: 40, stiffness: 800 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'var(--accent)',
      border: '2px solid var(--accent)',
    },
    hover: {
      scale: 2.5,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '2px solid var(--accent)',
    },
  };

  return (
    <motion.div
      className="fixed w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        left: '-0.75rem',
        top: '-0.75rem',
      }}
      variants={cursorVariants}
      animate={isHovering ? 'hover' : 'default'}
      transition={{ type: 'spring', mass: 0.1 }}
    />
  );
};

export default CustomCursor;
