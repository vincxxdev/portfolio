import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { AdminProvider } from "./components/providers/AdminProvider";
import Loader from "./components/Loader";
import CursorProvider from "./components/ui/CursorProvider";
import { ThemeTransition } from "./components/ThemeTransition";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: 'swap',
  preload: true,
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
      <body className={`${manrope.variable} ${sora.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <AdminProvider>
            <CursorProvider />
            <ThemeTransition />
            <Loader>{children}</Loader>
            <Analytics />
            <SpeedInsights />
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
