"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import dynamic from "next/dynamic";

const Animation = dynamic(() => import("./Animation"), {
  ssr: false,
});

export default function Loader({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");

    if (!hasLoaded) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setShowIntro(true);

      const timer = setTimeout(() => {
        setShowIntro(false);
        document.body.style.overflow = prevOverflow;
        sessionStorage.setItem("hasLoaded", "true");
      }, 2500);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = prevOverflow;
      };
    }

    return undefined;
  }, []);

  return (
    <>
      {showIntro && <Animation />}
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
