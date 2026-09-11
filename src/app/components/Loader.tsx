'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Animation, { INTRO_DURATION_MS } from './Animation';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default function Loader({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [introActive, setIntroActive] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);

  const finishIntro = useCallback(() => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('hasLoaded', 'true');
    } catch {
      // Storage may be unavailable; it must never prevent access to the page.
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!showIntro) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let hasLoaded = false;
    try {
      hasLoaded = !!sessionStorage.getItem('hasLoaded');
    } catch {
      // Play once for this mounted layout even without session storage.
    }

    // CSS starts before hydration. Never replay a completed timeline when JS
    // arrives late, or show it to repeat visitors or users reducing motion.
    const elapsed = Number(introRef.current?.getAnimations()[0]?.currentTime ?? 0);
    if (hasLoaded || reducedMotion.matches || elapsed >= INTRO_DURATION_MS || document.hidden) {
      finishIntro();
      return;
    }

    setIntroActive(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // animationend is primary; this fallback covers cancellation or missing CSS.
    const timer = window.setTimeout(finishIntro, INTRO_DURATION_MS - elapsed + 100);
    const skipOnReducedMotion = () => {
      if (reducedMotion.matches) finishIntro();
    };
    const skipOnHidden = () => {
      if (document.hidden) finishIntro();
    };
    const inputs = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const;
    for (const event of inputs) {
      window.addEventListener(event, finishIntro, { capture: true, passive: true });
    }
    reducedMotion.addEventListener('change', skipOnReducedMotion);
    document.addEventListener('visibilitychange', skipOnHidden);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      for (const event of inputs) window.removeEventListener(event, finishIntro, true);
      reducedMotion.removeEventListener('change', skipOnReducedMotion);
      document.removeEventListener('visibilitychange', skipOnHidden);
    };
  }, [showIntro, finishIntro]);

  return (
    <>
      {showIntro && <Animation ref={introRef} onComplete={finishIntro} />}
      {/* Content always mounts immediately. Without JS the CSS intro finishes
          on its own and these links remain usable. */}
      <div style={{ pointerEvents: showIntro && introActive ? 'none' : 'auto' }}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
