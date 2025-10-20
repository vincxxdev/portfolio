import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Loader from "./components/Loader";
import CursorProvider from "./components/ui/CursorProvider";
import { ThemeTransition } from "./components/ThemeTransition";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
  display: 'swap',
  preload: true,
});

import { defaultMetadata } from '@/lib/metadata';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Inline critical CSS for instant rendering */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body { 
              margin: 0;
              background-color: #ffffff;
              color: #0f172a;
            }
            @media (prefers-color-scheme: dark) {
              body {
                background-color: #0A192F;
                color: #F8FAFC;
              }
            }
          `
        }} />
      </head>
      <body className={`${inter.variable} ${jakarta.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <CursorProvider />
          <ThemeTransition />
          <Loader>{children}</Loader>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}