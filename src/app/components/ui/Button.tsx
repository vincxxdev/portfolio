'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import { useSound } from '../hooks/useSound';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-lg font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-accent-text hover:bg-accent-hover',
        secondary: 'border-2 border-secondary-text text-primary-text hover:bg-secondary-background',
        ghost: 'text-secondary-text hover:bg-secondary-background hover:text-accent',
        outline: 'border border-secondary-text/50 bg-transparent hover:bg-secondary-background text-primary-text',
      },
      size: {
        default: 'px-8 py-3',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
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
      <a
        href={href}
        onClick={handleClick}
        onMouseEnter={handleHover}
        target={target}
        rel={rel}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleHover}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;