'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import { useSound } from '../hooks/useSound';
import { motion } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-700 shadow-lg hover:shadow-xl hover:shadow-cyan-400/50',
        secondary: 'bg-secondary-background text-primary-text border-2 border-accent hover:bg-accent hover:text-white shadow-md hover:shadow-lg',
        ghost: 'text-secondary-text hover:bg-secondary-background hover:text-accent',
        outline: 'border-2 border-secondary-text/50 bg-transparent hover:bg-secondary-background text-primary-text',
      },
      size: {
        default: 'px-6 py-3 text-base',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  target?: string;
  rel?: string;
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
}: ButtonProps) => {
  const classes = clsx(buttonVariants({ variant, size, className }));
  const { playSound } = useSound();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    playSound('click');
    onClick?.(event);
  };

  const handleHover = () => {
    playSound('hover');
  };

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={handleClick}
        onMouseEnter={handleHover}
        target={target}
        rel={rel}
        className={classes}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;