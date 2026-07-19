'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardDividerProps {
  className?: string;
}

export const CardDivider: React.FC<CardDividerProps> = ({ className = '' }) => {
  return <div className={`h-px bg-hairline ${className}`} />;
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  hoverColor?: boolean;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = '',
  hoverColor = true,
}) => {
  return (
    <h3
      className={`
        font-display text-xl font-bold text-ink
        ${hoverColor ? 'group-hover:text-signal-ink' : ''}
        transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)]
        ${className}
      `}
    >
      {children}
    </h3>
  );
};

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = '',
}) => {
  return <p className={`text-sm text-ink-2 ${className}`}>{children}</p>;
};

interface SectionHeaderProps {
  badge?: {
    icon: React.ReactNode;
    text: string;
  };
  title: React.ReactNode;
  description?: string;
  descriptionDelay?: number;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  description,
  descriptionDelay,
  align = 'center',
  className = '',
}) => {
  const isLeft = align === 'left';

  return (
    <div className={`${isLeft ? 'text-left' : 'text-center'} mb-16 ${className}`}>
      {badge && (
        <div
          className={`
            inline-flex items-center gap-2 mb-5 text-signal-ink
            ${isLeft ? '' : 'justify-center'}
          `}
        >
          <span aria-hidden="true" className="h-px w-6 bg-signal" />
          {badge.icon}
          <span className="label-mono">{badge.text}</span>
        </div>
      )}

      <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink">
        {title}
      </h2>

      {/* Measure mark: a signal segment butted against a hairline run. */}
      <div className={`mt-5 flex items-center gap-0 ${isLeft ? '' : 'justify-center'}`}>
        <span className="h-0.5 w-10 bg-signal" />
        <span className="h-px w-24 bg-hairline" />
      </div>

      {description &&
        (descriptionDelay != null ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.38, ease: [0.2, 0, 0, 1], delay: descriptionDelay }}
            className={`text-lg text-ink-2 max-w-2xl mt-5 ${isLeft ? '' : 'mx-auto'}`}
          >
            {description}
          </motion.p>
        ) : (
          <p className={`text-lg text-ink-2 max-w-2xl mt-5 ${isLeft ? '' : 'mx-auto'}`}>
            {description}
          </p>
        ))}
    </div>
  );
};
