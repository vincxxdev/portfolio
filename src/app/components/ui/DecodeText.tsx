'use client';

import { useEffect, useRef, memo } from 'react';
import { useReducedMotion } from 'framer-motion';

interface DecodeTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]#@';
const NBSP = ' ';

const DecodeText = memo(({ text, className = '', delay = 400, duration = 1600 }: DecodeTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const spans = containerRef.current?.querySelectorAll<HTMLSpanElement>('[data-decode]');
    if (!spans?.length) return;

    const finalChars = text.split('');
    const resolved = new Set<number>();
    let animFrame = 0;
    let lastScramble = 0;

    spans.forEach((span, i) => {
      span.textContent = finalChars[i] === ' ' ? NBSP : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      span.style.opacity = '0';
    });

    const fadeTimers = Array.from(spans).map((span, i) =>
      setTimeout(() => {
        span.style.opacity = '1';
      }, delay + i * 35),
    );

    const resolveStart = delay + spans.length * 35 + 200;

    const indices = finalChars.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const resolveTimers = indices.map((charIndex, order) =>
      setTimeout(() => {
        resolved.add(charIndex);
        spans[charIndex].textContent =
          finalChars[charIndex] === ' ' ? NBSP : finalChars[charIndex];
      }, resolveStart + order * (duration / finalChars.length)),
    );

    const scramble = (time: number) => {
      if (resolved.size >= finalChars.length) return;
      if (time - lastScramble > 50) {
        for (let i = 0; i < spans.length; i++) {
          if (!resolved.has(i) && finalChars[i] !== ' ') {
            spans[i].textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        lastScramble = time;
      }
      animFrame = requestAnimationFrame(scramble);
    };

    const scrambleTimer = setTimeout(() => {
      animFrame = requestAnimationFrame(scramble);
    }, resolveStart);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(scrambleTimer);
      fadeTimers.forEach(clearTimeout);
      resolveTimers.forEach(clearTimeout);
    };
  }, [text, shouldReduceMotion, delay, duration]);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          data-decode
          className="inline-block transition-colors duration-150"
          style={{ opacity: shouldReduceMotion ? 1 : 0 }}
          aria-hidden
        >
          {char === ' ' ? NBSP : char}
        </span>
      ))}
    </span>
  );
});

DecodeText.displayName = 'DecodeText';

export default DecodeText;
