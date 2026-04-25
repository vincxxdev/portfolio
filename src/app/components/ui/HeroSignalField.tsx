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

const withAlpha = (color: string, alpha: number) => {
  const normalized = color.trim();

  if (normalized.startsWith('#')) {
    let hex = normalized.slice(1);

    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }

    const value = Number.parseInt(hex, 16);

    if (Number.isNaN(value)) {
      return normalized;
    }

    const red = (value >> 16) & 255;
    const green = (value >> 8) & 255;
    const blue = value & 255;

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  const rgbValues = normalized.match(/\d+(\.\d+)?/g);

  if (rgbValues && rgbValues.length >= 3) {
    return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${alpha})`;
  }

  return normalized;
};

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
    let palette = readPalette();
    let points: FieldPoint[] = [];
    let animationFrame = 0;

    function readPalette() {
      const styles = getComputedStyle(document.documentElement);

      return {
        accent: styles.getPropertyValue('--color-accent').trim() || '#22d3ee',
        text: styles.getPropertyValue('--color-secondary-text').trim() || '#1e293b',
        background: styles.getPropertyValue('--color-primary-background').trim() || '#0f172a',
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
      const scanX = ((t * 150) % (size.width + 280)) - 140;

      context.clearRect(0, 0, size.width, size.height);
      context.fillStyle = withAlpha(palette.background, 0.08);
      context.fillRect(0, 0, size.width, size.height);

      context.save();
      context.fillStyle = withAlpha(palette.accent, 0.06);
      context.beginPath();
      context.ellipse(centerX, centerY, size.width * 0.22, size.height * 0.12, 0, 0, Math.PI * 2);
      context.fill();
      context.restore();

      points.forEach((point) => {
        point.anchorX += point.vx * point.depth;
        point.anchorY += point.vy * point.depth;

        if (point.anchorX < -40) {
          point.anchorX = size.width + 40;
        } else if (point.anchorX > size.width + 40) {
          point.anchorX = -40;
        }

        if (point.anchorY < -40) {
          point.anchorY = size.height + 40;
        } else if (point.anchorY > size.height + 40) {
          point.anchorY = -40;
        }

        point.x = point.anchorX + Math.sin(t * 0.6 + point.phase) * 10 * point.depth;
        point.y = point.anchorY + Math.cos(t * 0.4 + point.phase * 1.2) * 8 * point.depth;

        if (pointer.active) {
          const dx = point.x - pointer.x;
          const dy = point.y - pointer.y;
          const distance = Math.hypot(dx, dy);

          if (distance < influenceRadius && distance > 0) {
            const force = (influenceRadius - distance) / influenceRadius;
            point.x += (dx / distance) * force * 26 * point.depth;
            point.y += (dy / distance) * force * 22 * point.depth;
          }
        }
      });

      const linkDistance = Math.min(180, size.width * 0.14);

      for (let index = 0; index < points.length; index += 1) {
        for (let innerIndex = index + 1; innerIndex < points.length; innerIndex += 1) {
          const first = points[index];
          const second = points[innerIndex];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.hypot(dx, dy);

          if (distance > linkDistance) {
            continue;
          }

          const opacity = (1 - distance / linkDistance) * 0.17 * Math.min(first.depth, second.depth);
          context.strokeStyle = withAlpha(palette.accent, opacity);
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.stroke();
        }
      }

      points.forEach((point) => {
        const glow = 0.12 + point.depth * 0.15;
        context.fillStyle = withAlpha(palette.accent, glow);
        context.beginPath();
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        context.fill();
      });

      const scanGradient = context.createLinearGradient(scanX - 150, 0, scanX + 150, 0);
      scanGradient.addColorStop(0, 'transparent');
      scanGradient.addColorStop(0.5, withAlpha(palette.accent, 0.16));
      scanGradient.addColorStop(1, 'transparent');
      context.fillStyle = scanGradient;
      context.fillRect(scanX - 150, 0, 300, size.height);

      for (let ring = 0; ring < 3; ring += 1) {
        const pulse = Math.sin(t * 1.7 + ring * 0.8) * 10;
        context.strokeStyle = withAlpha(palette.text, 0.07 - ring * 0.01);
        context.lineWidth = 1;
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

      if (!prefersReducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(render);
      }
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
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      drawFrame(performance.now());

      if (!prefersReducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const handlePaletteChange = () => {
      palette = readPalette();
    };

    const resizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(handlePaletteChange);

    resizeObserver.observe(wrapper);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    prefersReducedMotion.addEventListener('change', handleMotionPreference);

    resize();
    drawFrame(performance.now());

    if (!prefersReducedMotion.matches) {
      animationFrame = window.requestAnimationFrame(render);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
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
