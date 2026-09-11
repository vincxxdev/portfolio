'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import { useSound } from '../hooks/useSound';
import { motion, type HTMLMotionProps, useReducedMotion } from 'framer-motion';

const MotionLink = motion.create(Link);

const buttonVariants = cva(
  'inline-flex max-w-full items-center justify-center gap-2 border text-center font-medium disabled:opacity-40 disabled:pointer-events-none aria-disabled:opacity-40 aria-disabled:pointer-events-none transition-colors duration-(--dur-2) ease-snap [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Solid signal. The one place the accent is allowed to fill an area.
        primary:
          'rounded-sm border-signal bg-signal text-on-signal hover:bg-signal-hover shadow-raised',
        // Inverts on hover — a mechanical state flip, not a tint.
        secondary:
          'rounded-sm border-ink bg-transparent text-ink hover:bg-ink hover:text-canvas',
        ghost:
          'rounded-sm border-transparent text-ink-2 hover:bg-sunken hover:text-signal-ink',
        outline:
          'rounded-sm border-hairline-strong bg-transparent text-ink hover:border-ink',
        nav:
          'border-transparent font-mono uppercase tracking-[0.18em] text-ink-2 hover:text-signal-ink',
      },
      size: {
        default: 'min-h-11 px-5 py-2.5 text-sm leading-5',
        sm: 'min-h-10 px-3.5 py-2 text-xs leading-5',
        lg: 'min-h-13 gap-2.5 px-7 py-3 text-base leading-6',
        nav: 'min-h-9 px-3 py-2 text-2xs leading-4',
        icon: 'h-9 w-9 shrink-0 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

type MotionDivProps = HTMLMotionProps<'div'>;

interface ButtonProps extends VariantProps<typeof buttonVariants>, React.AriaAttributes {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  title?: string;
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
  title,
  initial,
  animate,
  transition,
  ...ariaProps
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
    const linkProps: HTMLMotionProps<'a'> = {
      onClick: handleClick,
      onMouseEnter: handleHover,
      target,
      rel,
      ...ariaProps,
      title,
      'aria-disabled': disabled || undefined,
      role: disabled ? 'link' : undefined,
      tabIndex: disabled ? -1 : undefined,
      className: classes,
      whileHover: hoverAnimation,
      whileTap: tapAnimation,
      initial,
      animate,
      transition: motionTransition,
    };

    // Keep internal CTAs in the App Router, preserving providers and avoiding
    // a full document reload. Disabled and external links remain plain anchors.
    if (!disabled && href.startsWith('/') && !href.startsWith('//')) {
      return <MotionLink {...linkProps} href={href}>{children}</MotionLink>;
    }

    return (
      <motion.a {...linkProps} href={disabled ? undefined : href}>
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
      {...ariaProps}
      title={title}
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
