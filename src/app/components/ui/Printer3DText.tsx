'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const CHAR_DELAY = 40;
const CHAR_DURATION = 380;

interface Printer3DTextProps {
  text: string;
  highlight?: boolean;
  startDelay?: number;
  className?: string;
}

const Printer3DText = ({
  text,
  highlight = false,
  startDelay = 0,
  className = '',
}: Printer3DTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [triggered, setTriggered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setTriggered(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <span
        className={
          highlight
            ? 'bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent'
            : className
        }
      >
        {text}
      </span>
    );
  }

  if (highlight) {
    const totalDuration = text.length * CHAR_DELAY;
    return (
      <span
        ref={ref}
        className={`inline-block bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent ${className}`}
        style={{
          clipPath: 'inset(0 100% 0 0)',
          animation: triggered
            ? `print3d-reveal ${totalDuration}ms steps(${text.length}, end) ${startDelay}ms both`
            : 'none',
        }}
      >
        {text}
      </span>
    );
  }

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block origin-bottom"
          style={{
            opacity: 0,
            animation: triggered
              ? `print3d-build ${CHAR_DURATION}ms cubic-bezier(0.22,1,0.36,1) ${startDelay + i * CHAR_DELAY}ms both`
              : 'none',
          }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
};

export { CHAR_DELAY };
export default Printer3DText;
