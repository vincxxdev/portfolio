'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import { useSound } from '../hooks/useSound';
import { motion, type HTMLMotionProps, useReducedMotion } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium disabled:opacity-40 disabled:pointer-events-none aria-disabled:opacity-40 aria-disabled:pointer-events-none transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)]',
  {
    variants: {
      variant: {
        // Solid signal. The one place the accent is allowed to fill an area.
        primary:
          'rounded-sm bg-signal text-on-signal hover:bg-signal-hover shadow-raised',
        // Inverts on hover — a mechanical state flip, not a tint.
        secondary:
          'rounded-sm border border-ink bg-transparent text-ink hover:bg-ink hover:text-canvas',
        ghost:
          'rounded-sm text-ink-2 hover:bg-sunken hover:text-signal-ink',
        outline:
          'rounded-sm border border-hairline-strong bg-transparent text-ink hover:border-ink',
        nav:
          'font-mono uppercase tracking-[0.18em] text-ink-2 hover:text-signal-ink',
      },
      size: {
        default: 'px-5 py-2.5 text-sm',
        sm: 'px-3.5 py-2 text-xs',
        lg: 'px-7 py-3.5 text-base',
        nav: 'px-3 py-2 text-2xs',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

type MotionDivProps = HTMLMotionProps<'div'>;

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
  initial?: MotionDivProps['initial'];
  animate?: MotionDivProps['animate'];
  transition?: MotionDivProps['transition'];
}

const Button = ({
  className,
  variant,
  size,
  children,
  href,
  onClick,
  target,
  rel,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
  initial,
  animate,
  transition,
}: ButtonProps) => {
  const classes = clsx(buttonVariants({ variant, size, className }));
  const { playSound } = useSound();
  const shouldReduceMotion = useReducedMotion();
  const isNav = variant === 'nav';

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    playSound('click');
    onClick?.(event);
  };

  const handleHover = () => {
    if (disabled) return;
    playSound('hover');
  };

  // A key travelling in its housing, rather than a scale bounce.
  const suppressMotion = isNav || shouldReduceMotion || disabled;
  const hoverAnimation = suppressMotion ? undefined : { y: -1 };
  const tapAnimation = suppressMotion ? undefined : { y: 1 };
  const motionTransition = transition ?? { duration: 0.12, ease: [0.2, 0, 0, 1] };

  if (href) {
    return (
      <motion.a
        href={disabled ? undefined : href}
        onClick={handleClick}
        onMouseEnter={handleHover}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        role={disabled ? 'link' : undefined}
        tabIndex={disabled ? -1 : undefined}
        className={classes}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        initial={initial}
        animate={animate}
        transition={motionTransition}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={handleHover}
      aria-label={ariaLabel}
      className={classes}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      initial={initial}
      animate={animate}
      transition={motionTransition}
    >
      {children}
    </motion.button>
  );
};

export default Button;
