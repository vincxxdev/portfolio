"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Animation from "./Animation";

const INTRO_DURATION_MS = 600;
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export default function Loader({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useIsomorphicLayoutEffect(() => {
    setShowIntro(!sessionStorage.getItem("hasLoaded"));
  }, []);

  useEffect(() => {
    if (!showIntro) {
      return undefined;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = prevOverflow;
      sessionStorage.setItem("hasLoaded", "true");
    }, INTRO_DURATION_MS);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
    };
  }, [showIntro]);

  return (
    <>
      {showIntro && <Animation />}
      <div style={{ pointerEvents: showIntro ? 'none' : 'auto' }}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
