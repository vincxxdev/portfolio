'use client';

import { MotionConfig } from 'framer-motion';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {/*
        Sitewide reduced-motion backstop.

        The global `prefers-reduced-motion` rule in globals.css only reaches CSS
        animations and transitions — Framer drives its values from JS, so that
        rule never touches them. Components that call `useReducedMotion` gate
        themselves, but any that forget would animate for users who asked not to
        be animated. `reducedMotion="user"` makes the default safe: transform
        and layout animations are suppressed at the source, while opacity ones
        still play, so the failure mode of forgetting is now inert.
      */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
