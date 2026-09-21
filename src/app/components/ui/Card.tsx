'use client';

import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps, useReducedMotion } from 'framer-motion';
import { useSound } from '../hooks/useSound';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** flush sits in the page, raised lifts off it, stark carries a hard offset */
  elevation?: 'flush' | 'raised' | 'stark';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Hover draws a signal trace along the top and left edges, and lifts 2px */
  interactive?: boolean;
  /** Cut corner with its hairline. On by default — it is the identity mark. */
  notch?: boolean;
  className?: string;
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const surfaceMap = {
  flush: 'bg-raised/50',
  raised: 'bg-raised',
  stark: 'bg-raised',
};

// clip-path clips box-shadow along with the element, so notched cards carry no
// blur shadow at all — they read as raised through the canvas/raised tonal step
// and their hairline. Rounded cards can use the shadow tokens normally.
const shadowMap = {
  flush: '',
  raised: 'shadow-raised',
  stark: 'shadow-stark',
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      elevation = 'raised',
      padding = 'md',
      interactive = false,
      notch = true,
      className = '',
      ...motionProps
    },
    ref
  ) => {
    const { playSound } = useSound();
    const shouldReduceMotion = useReducedMotion();

    const handleMouseEnter = () => {
      if (interactive) playSound('hover');
    };

    const lift =
      interactive && !shouldReduceMotion && elevation !== 'stark' ? { y: -2 } : undefined;

    const shape = notch ? 'notch' : 'rounded-lg';
    const shadow = notch ? '' : shadowMap[elevation];

    return (
      <motion.div
        ref={ref}
        whileHover={lift}
        transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
        onMouseEnter={handleMouseEnter}
        className={`group relative isolate flex flex-col ${className}`}
        {...motionProps}
      >
        {/* Stark's offset plate. A real element rather than a box-shadow so it
            follows the cut corner instead of being clipped square by it. */}
        {elevation === 'stark' && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-plate ${shape}`}
          />
        )}

        <div
          className={`
            relative flex flex-1 flex-col
            ${paddingMap[padding]}
            ${surfaceMap[elevation]}
            ${shape}
            ${shadow}
            border border-hairline
            ${interactive ? 'hover:border-hairline-strong focus-within:border-hairline-strong' : ''}
            transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.2,0,0,1)]
          `}
        >
          {/* Cut-corner hairline. Spans the 14px diagonal the notch clips out. */}
          {notch && (
            <span
              aria-hidden="true"
              className={`
                pointer-events-none absolute right-[-3px] top-[6px] z-20 h-px w-5 rotate-45 origin-center
                bg-hairline transition-colors duration-200
                ${interactive ? 'group-hover:bg-signal group-focus-within:bg-signal' : ''}
              `}
            />
          )}

          {/* Signal trace: hairlines index in along the top and left edges.
              scaleX/scaleY only — no paint work per frame. */}
          {interactive && (
            <>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 bg-signal transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-x-100 group-focus-within:scale-x-100"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 z-20 w-px origin-top scale-y-0 bg-signal transition-transform delay-75 duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-y-100 group-focus-within:scale-y-100"
              />
            </>
          )}

          {/* Flex item, so z-10 stacks over the traces without position:relative.
              Leaving it static lets absolutely-positioned children (spotlight
              overlays) bleed to the card edge instead of stopping at padding. */}
          <div className="z-10 flex h-full flex-col">{children}</div>
        </div>
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
