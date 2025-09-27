import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

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

type BaseProps = VariantProps<typeof buttonVariants> & {
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const MotionLink = motion(Link);

const Button = (props: ButtonProps) => {
  const { className, variant, size, children } = props;
  const classes = clsx(buttonVariants({ variant, size, className }));

  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  } as const;

  if (props.href) {
    const { href, target, rel, download } = props;
    return (
      <MotionLink
        href={href}
        target={target}
        rel={rel}
        download={download as any}
        className={classes}
        {...motionProps}
      >
        {children}
      </MotionLink>
    );
  } else {
    const { type, disabled, onClick } = props as ButtonAsButton;
    return (
      <motion.button
        className={classes}
        type={type}
        disabled={disabled}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }
};


export default Button;