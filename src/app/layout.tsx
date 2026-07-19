import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { LocaleProvider } from "@/i18n";
import { AdminProvider } from "./components/providers/AdminProvider";
import Loader from "./components/Loader";
import CursorProvider from "./components/ui/CursorProvider";
import { ThemeTransition } from "./components/ThemeTransition";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: 'swap',
  preload: true,
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: 'swap',
  preload: true,
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: 'swap',
  preload: false,
});

import { defaultMetadata } from '@/lib/metadata';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = defaultMetadata;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.author,
  alternateName: ['Vincenzo Buttari', 'vincxxdev', 'vincxx', 'vincxx.dev'],
  url: siteConfig.url,
  image: `${siteConfig.url}/images/og-image.png`,
  jobTitle: ['Software Engineer', 'Full Stack Developer'],
  description: siteConfig.description,
  email: siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : undefined,
  nationality: 'Italian',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Università degli Studi di Bari Aldo Moro',
    sameAs: 'https://www.uniba.it/',
  },
  knowsAbout: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Java',
    'Web Development',
    'Software Engineering',
    'Full Stack Development',
  ],
  sameAs: [siteConfig.social.github, siteConfig.social.linkedin].filter(Boolean),
  worksFor: {
    '@type': 'Organization',
    name: 'Deloitte',
  },
  address: siteConfig.personal.location
    ? {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.personal.location,
        addressCountry: 'IT',
      }
    : undefined,
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${siteConfig.author} Portfolio`,
  alternateName: ['vincxxdev', 'vincxx.dev'],
  url: siteConfig.url,
  inLanguage: ['it-IT', 'en-US'],
  author: {
    '@type': 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
  },
};

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
              background-color: #e7e8e4;
              color: #17191a;
            }
            @media (prefers-color-scheme: dark) {
              body {
                background-color: #131416;
                color: #edeeea;
              }
            }
          `
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} font-sans`}>
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