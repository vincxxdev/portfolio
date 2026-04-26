'use client';

import React from 'react';
import Card, { CardProps } from './Card';
import GradientBorderWrapper from './GradientBorderWrapper';

const GradientBorderCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', ...cardProps }, ref) => {
    const {
      hoverEffect,
      gradientOverlay,
      cornerAccent,
      glowIntensity,
      padding,
      disableBlur,
      badge,
      icon,
      ...motionProps
    } = cardProps;

    return (
      <GradientBorderWrapper ref={ref} className={className} {...motionProps}>
        <Card
          hoverEffect={hoverEffect}
          gradientOverlay={gradientOverlay}
          cornerAccent={cornerAccent}
          glowIntensity={glowIntensity}
          padding={padding}
          disableBlur={disableBlur}
          badge={badge}
          icon={icon}
          className="border-0 shadow-none h-full"
        >
          {children}
        </Card>
      </GradientBorderWrapper>
    );
  }
);

GradientBorderCard.displayName = 'GradientBorderCard';
export default GradientBorderCard;
