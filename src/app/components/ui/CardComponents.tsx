'use client';

import React from 'react';

interface CardDividerProps {
  className?: string;
}

export const CardDivider: React.FC<CardDividerProps> = ({ className = '' }) => {
  return (
    <div className={`h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent ${className}`} />
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  hoverColor?: boolean;
}

export const CardTitle: React.FC<CardTitleProps> = ({ 
  children, 
  className = '',
  hoverColor = true 
}) => {
  return (
    <h3 className={`
      text-xl font-bold text-primary-text 
      ${hoverColor ? 'group-hover:text-accent' : ''} 
      transition-colors duration-300 
      ${className}
    `}>
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
  className = '' 
}) => {
  return (
    <p className={`text-sm text-secondary-text leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

interface SectionHeaderProps {
  badge?: {
    icon: React.ReactNode;
    text: string;
  };
  title: React.ReactNode;
  description?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  description,
  className = ''
}) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-4">
          {badge.icon}
          <span className="text-sm font-semibold text-accent">{badge.text}</span>
        </div>
      )}
      <h2 className="text-4xl sm:text-5xl font-bold text-primary-text mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-secondary-text max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
