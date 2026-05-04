'use client';

import { useEffect, useRef } from 'react';

interface FieldPoint {
  anchorX: number;
  anchorY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  depth: number;
  size: number;
}

function parseRGB(color: string): [number, number, number] {
  const s = color.trim();
  if (s.startsWith('#')) {
    let hex = s.slice(1);
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    const v = Number.parseInt(hex, 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }
  const m = s.match(/\d+(\.\d+)?/g);
  if (m && m.length >= 3) return [Number(m[0]), Number(m[1]), Number(m[2])];
  return [0, 0, 0];
}

function rgbaString(rgb: [number, number, number], alpha: number): string {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
}

const HeroSignalField = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;

    if (!wrapper || !canvas) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: 0, y: 0, active: false };
    const size = { width: 0, height: 0, dpr: 1 };
    let paletteRGB = readPaletteRGB();
    let points: FieldPoint[] = [];
    let animationFrame = 0;
    let isVisible = true;

    function readPaletteRGB() {
      const styles = getComputedStyle(document.documentElement);
      return {
        accent: parseRGB(styles.getPropertyValue('--color-accent').trim() || '#22d3ee'),
        text: parseRGB(styles.getPropertyValue('--color-secondary-text').trim() || '#1e293b'),
        background: parseRGB(styles.getPropertyValue('--color-primary-background').trim() || '#0f172a'),
      };
    }

    const initializePoints = () => {
      const count = Math.min(110, Math.max(52, Math.floor((size.width * size.height) / 22000)));

      points = Array.from({ length: count }, () => {
        const anchorX = Math.random() * size.width;
        const anchorY = Math.random() * size.height;

        return {
          anchorX,
          anchorY,
          x: anchorX,
          y: anchorY,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.22,
          phase: Math.random() * Math.PI * 2,
          depth: 0.35 + Math.random() * 0.95,
          size: 0.8 + Math.random() * 2.2,
        };
      });
    };

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      size.width = rect.width;
      size.height = rect.height;
      size.dpr = dpr;

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      initializePoints();
    };

    const drawFrame = (time: number) => {
      const t = time * 0.001;
      const centerX = size.width / 2;
      const centerY = size.height / 2;
      const influenceRadius = Math.min(size.width, size.height) * 0.24;
      const influenceRadiusSq = influenceRadius * influenceRadius;
      const scanX = ((t * 150) % (size.width + 280)) - 140;

      context.clearRect(0, 0, size.width, size.height);
      context.fillStyle = rgbaString(paletteRGB.background, 0.08);
      context.fillRect(0, 0, size.width, size.height);

      context.save();
      context.fillStyle = rgbaString(paletteRGB.accent, 0.06);
      context.beginPath();
      context.ellipse(centerX, centerY, size.width * 0.22, size.height * 0.12, 0, 0, Math.PI * 2);
      context.fill();
      context.restore();

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        point.anchorX += point.vx * point.depth;
        point.anchorY += point.vy * point.depth;

        if (point.anchorX < -40) point.anchorX = size.width + 40;
        else if (point.anchorX > size.width + 40) point.anchorX = -40;

        if (point.anchorY < -40) point.anchorY = size.height + 40;
        else if (point.anchorY > size.height + 40) point.anchorY = -40;

        point.x = point.anchorX + Math.sin(t * 0.6 + point.phase) * 10 * point.depth;
        point.y = point.anchorY + Math.cos(t * 0.4 + point.phase * 1.2) * 8 * point.depth;

        if (pointer.active) {
          const dx = point.x - pointer.x;
          const dy = point.y - pointer.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < influenceRadiusSq && distSq > 0) {
            const distance = Math.sqrt(distSq);
            const force = (influenceRadius - distance) / influenceRadius;
            point.x += (dx / distance) * force * 26 * point.depth;
            point.y += (dy / distance) * force * 22 * point.depth;
          }
        }
      }

      const linkDistance = Math.min(180, size.width * 0.14);
      const linkDistSq = linkDistance * linkDistance;
      const accentR = paletteRGB.accent[0];
      const accentG = paletteRGB.accent[1];
      const accentB = paletteRGB.accent[2];

      context.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        const first = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const second = points[j];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distSq = dx * dx + dy * dy;

          if (distSq > linkDistSq) continue;

          const distance = Math.sqrt(distSq);
          const opacity = (1 - distance / linkDistance) * 0.17 * Math.min(first.depth, second.depth);
          context.strokeStyle = `rgba(${accentR},${accentG},${accentB},${opacity})`;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.stroke();
        }
      }

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const glow = 0.12 + point.depth * 0.15;
        context.fillStyle = `rgba(${accentR},${accentG},${accentB},${glow})`;
        context.beginPath();
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        context.fill();
      }

      const scanGradient = context.createLinearGradient(scanX - 150, 0, scanX + 150, 0);
      scanGradient.addColorStop(0, 'transparent');
      scanGradient.addColorStop(0.5, `rgba(${accentR},${accentG},${accentB},0.16)`);
      scanGradient.addColorStop(1, 'transparent');
      context.fillStyle = scanGradient;
      context.fillRect(scanX - 150, 0, 300, size.height);

      const textR = paletteRGB.text[0];
      const textG = paletteRGB.text[1];
      const textB = paletteRGB.text[2];
      context.lineWidth = 1;
      for (let ring = 0; ring < 3; ring++) {
        const pulse = Math.sin(t * 1.7 + ring * 0.8) * 10;
        context.strokeStyle = `rgba(${textR},${textG},${textB},${0.07 - ring * 0.01})`;
        context.beginPath();
        context.ellipse(
          centerX,
          centerY,
          size.width * (0.16 + ring * 0.055) + pulse,
          size.height * (0.08 + ring * 0.03) + pulse * 0.5,
          0,
          0,
          Math.PI * 2,
        );
        context.stroke();
      }
    };

    const render = (time: number) => {
      drawFrame(time);

      if (!prefersReducedMotion.matches && isVisible) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        animationFrame = 0;
      }
    };

    const startLoop = () => {
      if (animationFrame !== 0 || prefersReducedMotion.matches || !isVisible) return;
      animationFrame = window.requestAnimationFrame(render);
    };

    const stopLoop = () => {
      if (animationFrame === 0) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        pointer.active = false;
        return;
      }

      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleMotionPreference = () => {
      stopLoop();
      drawFrame(performance.now());
      startLoop();
    };

    const handlePaletteChange = () => {
      paletteRGB = readPaletteRGB();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        stopLoop();
      } else {
        isVisible = true;
        startLoop();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(handlePaletteChange);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting && !document.hidden;
        if (isVisible) startLoop();
        else stopLoop();
      },
      { threshold: 0 },
    );

    resizeObserver.observe(wrapper);
    intersectionObserver.observe(wrapper);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (hasFinePointer) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerleave', handlePointerLeave);
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);
    prefersReducedMotion.addEventListener('change', handleMotionPreference);

    resize();
    drawFrame(performance.now());
    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      if (hasFinePointer) {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerleave', handlePointerLeave);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      prefersReducedMotion.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default HeroSignalField;
