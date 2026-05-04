'use client';

import React, { useRef, useState, useEffect } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const hover = !!target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      if (hover !== isHoveringRef.current) {
        isHoveringRef.current = hover;
        setIsHovering(hover);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] mix-blend-difference rounded-full"
      style={{
        width: isHovering ? '3rem' : '1.5rem',
        height: isHovering ? '3rem' : '1.5rem',
        left: isHovering ? '-1.5rem' : '-0.75rem',
        top: isHovering ? '-1.5rem' : '-0.75rem',
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'var(--color-accent)',
        border: '2px solid var(--color-accent)',
        transition: 'width 0.2s ease-out, height 0.2s ease-out, left 0.2s ease-out, top 0.2s ease-out, background-color 0.2s ease-out',
        willChange: 'transform',
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    />
  );
};

export default CustomCursor;
