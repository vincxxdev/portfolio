'use client';

import React from 'react';

interface CardDividerProps {
  className?: string;
}

export const CardDivider: React.FC<CardDividerProps> = ({ className = '' }) => {
  return <div className={`h-px bg-hairline ${className}`} />;
};
