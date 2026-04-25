'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import { useSound } from '../hooks/useSound';
import { motion, type HTMLMotionProps } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-700 shadow-lg hover:shadow-xl hover:shadow-cyan-400/50',
        secondary: 'rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 bg-secondary-background text-primary-text border-2 border-accent hover:bg-accent hover:text-white shadow-md hover:shadow-lg',
        ghost: 'rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 text-secondary-text hover:bg-secondary-background hover:text-accent',
        outline: 'rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 border-2 border-secondary-text/50 bg-transparent hover:bg-secondary-background text-primary-text',
        nav: 'text-secondary-text/75 hover:text-accent uppercase tracking-[0.22em]',
      },
      size: {
        default: 'px-6 py-3 text-base',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-8 py-4 text-lg',
        nav: 'px-3 py-2 text-xs',
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
  initial,
  animate,
  transition,
}: ButtonProps) => {
  const classes = clsx(buttonVariants({ variant, size, className }));
  const { playSound } = useSound();
  const isNav = variant === 'nav';

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    playSound('click');
    onClick?.(event);
  };

  const handleHover = () => {
    playSound('hover');
  };

  const hoverAnimation = isNav ? undefined : { scale: 1.05 };
  const tapAnimation = isNav ? undefined : { scale: 0.95 };

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={handleClick}
        onMouseEnter={handleHover}
        target={target}
        rel={rel}
        className={classes}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        initial={initial}
        animate={animate}
        transition={transition}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={handleHover}
      className={classes}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.button>
  );
};

export default Button;
