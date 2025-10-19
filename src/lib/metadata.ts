import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'vincxxdev - Portfolio',
    template: '%s | vincxxdev',
  },
  description: siteConfig.description,
  keywords: [
    'Vincenzo Buttari',
    'Software Engineer',
    'Portfolio',
    'Web Developer',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Java',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
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
    type: 'website',
    locale: 'it_IT',
    url: siteConfig.url,
    title: `${siteConfig.name} - Portfolio`,
    description: siteConfig.description,
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: `${siteConfig.url}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Portfolio di ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - Portfolio`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og-image.png`],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};
