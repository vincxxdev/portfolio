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

    // Park it offscreen imperatively. Keeping this out of the style prop is
    // what stops a re-render from snapping the cursor back to the corner.
    if (cursorRef.current) {
      cursorRef.current.style.transform = 'translate3d(-100px, -100px, 0)';
    }

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
      className="fixed left-0 top-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ willChange: 'transform' }}
    >
      <div
        className="h-12 w-12 rounded-full"
        style={{
          transform: `translate(-50%, -50%) scale(${isHovering ? 1 : 0.5})`,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'var(--color-accent)',
          border: '2px solid var(--color-accent)',
          transition: 'transform 180ms cubic-bezier(0.2, 0, 0, 1), background-color 180ms cubic-bezier(0.2, 0, 0, 1)',
        }}
      />
    </div>
  );
};

export default CustomCursor;
