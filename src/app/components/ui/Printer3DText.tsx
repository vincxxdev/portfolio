'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

const CHAR_DELAY = 45;
const CHAR_DURATION = 400;
const HEAD_GAP = 4;
const SVG_W = 64;
const SVG_H = 80;
const TIP_Y = 76;

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
    {/* X-axis linear rail */}
    <line x1="0" y1="5" x2="64" y2="5" stroke="currentColor" strokeWidth="2.5" opacity="0.22" strokeLinecap="round" />
    <line x1="0" y1="8" x2="64" y2="8" stroke="currentColor" strokeWidth="1.2" opacity="0.12" strokeLinecap="round" />

    {/* Carriage block riding the rail */}
    <rect
      x="14"
      y="9"
      width="36"
      height="14"
      rx="4"
      stroke="currentColor"
      strokeWidth="0.9"
      opacity="0.5"
      fill="currentColor"
      fillOpacity="0.06"
    />
    {/* Carriage wheels / bearings */}
    <circle cx="21" cy="23" r="3" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
    <circle cx="43" cy="23" r="3" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />

    {/* Extruder motor body */}
    <rect
      x="19"
      y="26"
      width="26"
      height="18"
      rx="4"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.45"
      fill="currentColor"
      fillOpacity="0.05"
    />
    {/* Fan grille */}
    <circle cx="32" cy="35" r="6" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <line x1="26.5" y1="35" x2="37.5" y2="35" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
    <line x1="32" y1="29.5" x2="32" y2="40.5" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />

    {/* Heatsink fins */}
    <line x1="21" y1="46.5" x2="43" y2="46.5" stroke="currentColor" strokeWidth="1.3" opacity="0.32" strokeLinecap="round" />
    <line x1="20" y1="49.5" x2="44" y2="49.5" stroke="currentColor" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
    <line x1="21" y1="52.5" x2="43" y2="52.5" stroke="currentColor" strokeWidth="1.3" opacity="0.32" strokeLinecap="round" />

    {/* Heat block (silicone sock area) */}
    <rect
      x="23"
      y="55"
      width="18"
      height="10"
      rx="2"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.55"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <line x1="23" y1="58.5" x2="41" y2="58.5" stroke="currentColor" strokeWidth="0.6" opacity="0.25" strokeLinecap="round" />
    <line x1="23" y1="61.5" x2="41" y2="61.5" stroke="currentColor" strokeWidth="0.6" opacity="0.25" strokeLinecap="round" />

    {/* Nozzle taper */}
    <path d="M27 65 L37 65 L34.5 72.5 L29.5 72.5 Z" fill="currentColor" opacity="0.65" />

    {/* Nozzle tip */}
    <circle cx="32" cy={TIP_Y} r="1.6" fill="currentColor" opacity="0.95" />

    {/* Glow halo (pulses via CSS) */}
    <circle
      cx="32"
      cy={TIP_Y}
      r="5.5"
      fill="currentColor"
      className="animate-nozzle-glow origin-center"
    />
  </svg>
);

const Printer3DText = ({ text, highlightText, className = '' }: Printer3DTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
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
    if (charEls.length === 0) return;
    const head = headRef.current;
    const startTime = performance.now();
    let animFrame = 0;
    let ended = false;

    const animate = (time: number) => {
      if (ended) return;
      const elapsed = time - startTime;
      const hideAfter = charEls.length * CHAR_DELAY + CHAR_DURATION * 0.6;

      if (elapsed < hideAfter) {
        const activeIndex = Math.min(Math.floor(elapsed / CHAR_DELAY), charEls.length - 1);
        const el = charEls[activeIndex];
        if (!el) { animFrame = requestAnimationFrame(animate); return; }
        const posX = el.offsetLeft + el.offsetWidth / 2;
        const posY = el.offsetTop;
        head.style.opacity = '1';
        head.style.transform = `translate(${posX}px, ${posY - TIP_Y - HEAD_GAP}px) translateX(-50%)`;
        animFrame = requestAnimationFrame(animate);
      } else {
        head.style.opacity = '0';
        ended = true;
      }
    };

    animFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrame);
      head.style.opacity = '0';
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
