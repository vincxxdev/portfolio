"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import dynamic from "next/dynamic";

// Lazy load the animation component
const Animation = dynamic(() => import("./Animation"), {
  ssr: false,
});

export default function Loader({ children }: { children: React.ReactNode }) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasLoaded = sessionStorage.getItem("hasLoaded");

      if (!hasLoaded) {
        document.body.style.overflow = 'hidden';
        setShowAnimation(true);

        const timer = setTimeout(() => {
          setShowAnimation(false);
          document.body.style.overflow = '';
          sessionStorage.setItem("hasLoaded", "true");
        }, 2500);

        return () => {
          clearTimeout(timer);
          document.body.style.overflow = '';
        };
      }
    }

    return undefined;
  }, []);

  return (
    <>
      {/* Animation - shown first on initial load */}
      {showAnimation && <Animation />}

      {/* Main content */}
      <div 
        className={`transition-opacity duration-500 ${
          showAnimation ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
