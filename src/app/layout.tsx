"use client";
import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import Animation from "./components/Animation";

const onest = Onest({ subsets: ['latin'], variable: '--font-onest' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="it" suppressHydrationWarning>
      <body className={`${onest.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {loading === null ? null : loading ? (
            <Animation />
          ) : (
            <div className="animate-content-fade-in">
              <Navbar />
              {children}
              <Footer />
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}