import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

const titleDefault = `${siteConfig.author} · Software Engineer & Full Stack Developer`;
const titleTemplate = `%s | ${siteConfig.author}`;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: titleDefault,
    template: titleTemplate,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.author} Portfolio`,
  keywords: [
    'Vincenzo Buttari',
    'vincxxdev',
    'vincxx dev',
    'vincxx.dev',
    'Software Engineer Bari',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Web Developer Bari',
    'Portfolio Vincenzo Buttari',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Java',
    'Università di Bari',
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    type: 'profile',
    locale: 'it_IT',
    alternateLocale: ['en_US'],
    url: siteConfig.url,
    title: titleDefault,
    description: siteConfig.description,
    siteName: `${siteConfig.author} Portfolio`,
    images: [
      {
        url: `${siteConfig.url}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Portfolio di ${siteConfig.author} - Software Engineer & Full Stack Developer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: titleDefault,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og-image.png`],
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'it-IT': siteConfig.url,
      'en-US': siteConfig.url,
      'x-default': siteConfig.url,
    },
  },
  category: 'technology',
};
