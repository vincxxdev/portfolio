'use client';

import { forwardRef, type CSSProperties } from 'react';
import { siteConfig } from '@/config/site';

// One duration drives both the CSS timeline and Loader's fallback cleanup.
export const INTRO_DURATION_MS = 1100;

interface AnimationProps {
  onComplete: () => void;
}

/** Three print registers become one signature, then the page opens at the seam.
 * All motion is CSS transform/opacity; clipping is static, with no frame loop.
 */
const Animation = forwardRef<HTMLDivElement, AnimationProps>(({ onComplete }, ref) => (
  <div
    ref={ref}
    aria-hidden="true"
    className="site-intro pointer-events-none fixed inset-0 z-50 overflow-clip"
    style={{ '--intro-duration': `${INTRO_DURATION_MS}ms` } as CSSProperties}
    onAnimationEnd={(event) => {
      if (event.target === event.currentTarget && event.animationName === 'intro-finish') {
        onComplete();
      }
    }}
  >
    <div className="intro-panel intro-panel-top absolute inset-x-0 top-0 h-1/2 bg-canvas">
      <div className="bg-section-grid absolute inset-0" />
    </div>
    <div className="intro-panel intro-panel-bottom absolute inset-x-0 bottom-0 h-1/2 bg-canvas">
      <div className="bg-section-grid absolute inset-0" />
    </div>

    <div className="intro-seam absolute inset-x-0 top-1/2 h-px origin-center bg-signal" />

    <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-8">
      <div className="intro-signature relative pb-8 pt-7 sm:pb-12 sm:pt-10">
        <span className="intro-bracket intro-bracket-start absolute -left-3 top-0 h-4 w-4 border-l border-t border-signal sm:-left-6 sm:h-6 sm:w-6" />
        <span className="intro-bracket intro-bracket-end absolute -right-3 bottom-0 h-4 w-4 border-b border-r border-signal sm:-right-6 sm:h-6 sm:w-6" />

        {/* Repeated slices are decorative; the page underneath owns its h1. */}
        <div className="grid font-display text-intro font-extrabold text-ink">
          <span className="intro-slice intro-slice-top col-start-1 row-start-1">{siteConfig.name}</span>
          <span className="intro-slice intro-slice-middle col-start-1 row-start-1">{siteConfig.name}</span>
          <span className="intro-slice intro-slice-bottom col-start-1 row-start-1">{siteConfig.name}</span>
        </div>
        <p className="intro-caption label-mono absolute inset-x-0 bottom-0 text-center text-ink-2">
          {siteConfig.personal.fullName || siteConfig.author}
        </p>
      </div>
    </div>
  </div>
));

Animation.displayName = 'Animation';

export default Animation;
