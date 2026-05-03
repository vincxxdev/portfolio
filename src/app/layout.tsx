import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { LocaleProvider } from "@/i18n";
import { AdminProvider } from "./components/providers/AdminProvider";
import Loader from "./components/Loader";
import CursorProvider from "./components/ui/CursorProvider";
import { ThemeTransition } from "./components/ThemeTransition";
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: 'swap',
  preload: true,
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
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
      <body className={`${geist.variable} ${bricolage.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <LocaleProvider>
          <AdminProvider>
            <CursorProvider />
            <ThemeTransition />
            <Loader>{children}</Loader>
          </AdminProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}