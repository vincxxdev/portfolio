"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Animation from "./Animation";

export default function Loader({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<'intro' | 'ready' | null>(null);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");

    if (!hasLoaded) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setPhase('intro');

      const timer = setTimeout(() => {
        setPhase('ready');
        document.body.style.overflow = prevOverflow;
        sessionStorage.setItem("hasLoaded", "true");
      }, 2500);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = prevOverflow;
      };
    }

    setPhase('ready');
    return undefined;
  }, []);

  return (
    <>
      {phase === 'intro' && <Animation />}
      <div
        style={phase === 'ready' ? undefined : {
          position: 'relative',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
