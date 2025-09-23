import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-accent-text hover:bg-accent-hover',
        secondary: 'border-2 border-secondary-text text-primary-text hover:bg-secondary-background',
        ghost: 'text-secondary-text hover:bg-secondary-background hover:text-accent',
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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof buttonVariants> {
  href: string;
  target?: string;
}

const Button = ({ className, variant, size, href, children, ...props }: ButtonProps) => {
  return (
    <Link href={href} className={clsx(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </Link>
  );
};

export default Button;