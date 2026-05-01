'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

const CHAR_DELAY = 45;
const CHAR_DURATION = 400;
const HEAD_GAP = 6;
const SVG_W = 82;
const SVG_H = 108;
const TIP_Y = 104;

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
    className="overflow-visible"
    aria-hidden
  >
    {/* X-axis rail and cable hint */}
    <path d="M5 8H77" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent" opacity="0.18" />
    <path d="M10 13H72" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-accent" opacity="0.16" />
    <path
      d="M19 17C28 8 44 7 53 17"
      stroke="#cbd5e1"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.9"
    />

    {/* Carriage tower */}
    <rect
      x="25"
      y="10"
      width="32"
      height="18"
      rx="6"
      fill="#f8fafc"
      stroke="#cbd5e1"
      strokeWidth="1"
      opacity="0.96"
    />
    <path d="M29 28H53L59 36H23L29 28Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />

    {/* White printer-inspired front cover */}
    <rect
      x="15"
      y="30"
      width="56"
      height="58"
      rx="9"
      fill="#0f172a"
      opacity="0.16"
    />
    <rect
      x="13"
      y="26"
      width="56"
      height="58"
      rx="9"
      fill="#f8f4ec"
      stroke="#d7dce3"
      strokeWidth="1.4"
    />
    <path d="M18 32H64" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.74" />
    <circle cx="22" cy="32" r="2.2" fill="#d7dce3" />
    <circle cx="60" cy="32" r="2.2" fill="#d7dce3" />
    <circle cx="22" cy="78" r="2.2" fill="#cbd5e1" />
    <circle cx="60" cy="78" r="2.2" fill="#cbd5e1" />
    <path d="M25 72H57" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" opacity="0.42" />

    {/* Dark circular fan with warm orange details */}
    <g transform="translate(41 56)">
      <circle r="17" fill="#111827" />
      <circle r="14.2" fill="#1f2937" stroke="#020617" strokeWidth="1" />
      <g className="animate-printer-fan origin-center">
        <path d="M0 -10C5 -10 7 -6 4 -3C2 -1 -3 -2 -5 -5C-7 -8 -4 -10 0 -10Z" fill="#334155" />
        <path d="M9 4C7 8 2 9 1 5C0 2 4 -1 8 -1C11 -1 12 2 9 4Z" fill="#334155" />
        <path d="M-8 6C-11 3 -9 -2 -5 -2C-2 -2 0 3 -1 7C-2 10 -6 9 -8 6Z" fill="#334155" />
      </g>
      <circle r="4.2" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
      <path d="M-12 -1A12 12 0 0 1 -3 -12" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M4 12A12 12 0 0 1 12 3" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="-10" cy="-9" r="2.4" fill="#f59e0b" />
      <circle cx="11" cy="-8" r="2.4" fill="#fbbf24" />
      <circle cx="-11" cy="10" r="2.4" fill="#f59e0b" />
      <circle cx="10" cy="10" r="2.4" fill="#f59e0b" />
    </g>

    {/* Lower hotend and nozzle */}
    <path d="M24 84H58L53 96H29L24 84Z" fill="#334155" stroke="#475569" strokeWidth="1" />
    <rect
      x="31"
      y="83"
      width="20"
      height="14"
      rx="3"
      fill="#111827"
      stroke="#1f2937"
      strokeWidth="1"
    />
    <g className="animate-hotend-heat">
      <path d="M35 88C33 91 37 92 35 95" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M41 87C39 90 43 91 41 94" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M47 88C45 91 49 92 47 95" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <path d="M36 97H46L43 103.5H39L36 97Z" fill="#64748b" />
    <circle cx="41" cy={TIP_Y} r="1.7" fill="#f97316" />
    <circle
      cx="41"
      cy={TIP_Y}
      r="5.8"
      fill="#f97316"
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
    let hideTimeout = 0;

    head.style.display = 'block';
    head.style.opacity = '0';

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
        hideTimeout = window.setTimeout(() => {
          head.style.display = 'none';
        }, 180);
      }
    };

    animFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrame);
      window.clearTimeout(hideTimeout);
      head.style.opacity = '0';
      head.style.display = 'none';
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
        style={{
          contain: 'layout paint',
          display: 'none',
          opacity: 0,
          transition: 'transform 38ms linear, opacity 180ms ease-out',
          willChange: 'transform, opacity',
        }}
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
