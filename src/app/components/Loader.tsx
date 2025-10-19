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
    // Check if the animation has already been shown in this session
    if (typeof window !== 'undefined') {
      const hasLoaded = sessionStorage.getItem("hasLoaded");
      
      if (!hasLoaded) {
        // Show the animation only if it hasn't been seen yet
        setShowAnimation(true);
        
        const timer = setTimeout(() => {
          setShowAnimation(false);
          sessionStorage.setItem("hasLoaded", "true");
        }, 2500);
        
        return () => clearTimeout(timer);
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
