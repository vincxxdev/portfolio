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

/**
 * Language is client-side via LocaleProvider, so every hreflang points at the
 * same URL. Each route must call this: Next inherits the parent's `alternates`
 * when a child omits it, which would canonicalise every page to the home page.
 */
export function routeAlternates(path: string): Metadata['alternates'] {
  const url = `${siteConfig.url}${path}`;
  return {
    canonical: url,
    languages: {
      'it-IT': url,
      'en-US': url,
      'x-default': url,
    },
  };
}

interface RouteMetadataOptions {
  /** Root-relative, with a leading slash. Use '' for the home page. */
  path: string;
  title: string;
  description: string;
  /** Root-relative path to the OG image. Defaults to the site-wide one. */
  image?: string;
}

/** Per-route metadata for the landing, work, about and contact pages. */
export function buildRouteMetadata({
  path,
  title,
  description,
  image = '/images/og-image.png',
}: RouteMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const imageUrl = `${siteConfig.url}${image}`;

  return {
    title,
    description,
    alternates: routeAlternates(path),
    openGraph: {
      title,
      description,
      url,
      siteName: `${siteConfig.author} Portfolio`,
      locale: 'it_IT',
      alternateLocale: ['en_US'],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
