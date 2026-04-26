'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

const CHAR_DELAY = 45;
const CHAR_DURATION = 400;
const HEAD_GAP = 3;
const SVG_W = 26;
const SVG_H = 34;
const TIP_Y = 32.5;

interface Printer3DTextProps {
  text: string;
  highlightText?: string;
  className?: string;
}

function lerpColor(i: number, total: number): string {
  if (total <= 1) return 'rgb(34, 211, 238)';
  const t = i / (total - 1);
  return `rgb(${Math.round(34 + t * 3)}, ${Math.round(211 - t * 112)}, ${Math.round(238 - t * 3)})`;
}

const PrinterHead = () => (
  <svg
    viewBox={`0 0 ${SVG_W} ${SVG_H}`}
    width={SVG_W}
    height={SVG_H}
    fill="none"
    className="text-accent"
    aria-hidden
  >
    {/* Filament inlet tube */}
    <rect x="11" y="0" width="4" height="4" rx="1" fill="currentColor" opacity="0.2" />

    {/* Stepper motor / carriage body */}
    <rect
      x="3"
      y="3"
      width="20"
      height="9"
      rx="2"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.55"
      fill="currentColor"
      fillOpacity="0.07"
    />
    {/* Fan circle on body */}
    <circle cx="13" cy="7.5" r="3" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

    {/* Heat-sink fins */}
    <line x1="5" y1="14.5" x2="21" y2="14.5" stroke="currentColor" strokeWidth="1.2" opacity="0.35" strokeLinecap="round" />
    <line x1="4" y1="17" x2="22" y2="17" stroke="currentColor" strokeWidth="1.4" opacity="0.38" strokeLinecap="round" />
    <line x1="5" y1="19.5" x2="21" y2="19.5" stroke="currentColor" strokeWidth="1.2" opacity="0.35" strokeLinecap="round" />

    {/* Heat block */}
    <rect
      x="6"
      y="22"
      width="14"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth="0.7"
      opacity="0.45"
      fill="currentColor"
      fillOpacity="0.07"
    />

    {/* Nozzle taper */}
    <path d="M9.5 27 L16.5 27 L14.5 31.5 L11.5 31.5 Z" fill="currentColor" opacity="0.6" />

    {/* Nozzle tip dot */}
    <circle cx="13" cy={TIP_Y} r="1.2" fill="currentColor" opacity="0.9" />

    {/* Glow halo (pulses via CSS) */}
    <circle
      cx="13"
      cy={TIP_Y}
      r="4"
      fill="currentColor"
      className="animate-nozzle-glow origin-center"
    />
  </svg>
);

const Printer3DText = ({ text, highlightText, className = '' }: Printer3DTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const headTimersRef = useRef<number[]>([]);
  const [triggered, setTriggered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const chars = useMemo(() => {
    const result: { char: string; isHighlight: boolean; hIdx: number; hTotal: number }[] = [];
    for (const c of text) {
      result.push({ char: c, isHighlight: false, hIdx: 0, hTotal: 0 });
    }
    if (highlightText) {
      result.push({ char: ' ', isHighlight: false, hIdx: 0, hTotal: 0 });
      for (let i = 0; i < highlightText.length; i++) {
        result.push({
          char: highlightText[i],
          isHighlight: true,
          hIdx: i,
          hTotal: highlightText.length,
        });
      }
    }
    return result;
  }, [text, highlightText]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setTriggered(true);
      return;
    }
    const el = containerRef.current;
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

  useEffect(() => {
    if (!triggered || shouldReduceMotion || !containerRef.current || !headRef.current) return;

    const charEls = containerRef.current.querySelectorAll<HTMLSpanElement>('[data-char]');
    const head = headRef.current;
    head.style.opacity = '0';

    const positions = Array.from(charEls).map((el) => ({
      x: el.offsetLeft + el.offsetWidth / 2,
      y: el.offsetTop,
    }));

    const timers: number[] = [];

    positions.forEach((pos, i) => {
      timers.push(
        window.setTimeout(() => {
          head.style.opacity = '1';
          const headY = pos.y - TIP_Y - HEAD_GAP;
          head.style.transform = `translate(${pos.x}px, ${headY}px) translateX(-50%)`;
        }, i * CHAR_DELAY),
      );
    });

    timers.push(
      window.setTimeout(
        () => {
          head.style.opacity = '0';
        },
        positions.length * CHAR_DELAY + CHAR_DURATION * 0.6,
      ),
    );

    headTimersRef.current = timers;
    return () => {
      headTimersRef.current.forEach(clearTimeout);
      headTimersRef.current = [];
    };
  }, [triggered, shouldReduceMotion, chars.length]);

  if (shouldReduceMotion) {
    return (
      <span className={className}>
        {text}
        {highlightText && (
          <>
            {' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              {highlightText}
            </span>
          </>
        )}
      </span>
    );
  }

  return (
    <span ref={containerRef} className={`relative inline-flex flex-wrap ${className}`}>
      {/* Print head */}
      <span
        ref={headRef}
        className="absolute top-0 left-0 pointer-events-none z-10"
        style={{ opacity: 0, transition: 'transform 38ms linear, opacity 180ms ease-out' }}
      >
        <PrinterHead />
      </span>

      {/* Characters */}
      {chars.map((item, i) => (
        <span
          key={i}
          data-char
          className="inline-block origin-bottom"
          style={{
            opacity: 0,
            color: item.isHighlight ? lerpColor(item.hIdx, item.hTotal) : undefined,
            animation: triggered
              ? `print3d-build ${CHAR_DURATION}ms cubic-bezier(0.22,1,0.36,1) ${i * CHAR_DELAY}ms both`
              : 'none',
          }}
        >
          {item.char === ' ' ? ' ' : item.char}
        </span>
      ))}
    </span>
  );
};

export { CHAR_DELAY, CHAR_DURATION };
export default Printer3DText;
