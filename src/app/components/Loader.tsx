"use client";

import { useState, useEffect } from "react";
import Animation from "./Animation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Loader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");

    if (hasLoaded) {
      setLoading(false);
    } else {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {loading === null ? null : loading ? (
        <Animation />
      ) : (
        <div className="animate-content-fade-in">
          <Navbar />
          {children}
          <Footer />
        </div>
      )}
    </>
  );
}
