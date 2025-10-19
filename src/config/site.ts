/**
 * Centralized configuration for environment variables
 * All env variables are validated and typed here
 */

export const siteConfig = {
  // Basic info about the site
  name: 'vincxxdev',
  author: 'Vincenzo Buttari',
  description: 'Portfolio di Vincenzo Buttari - Software Engineer appassionato di creare soluzioni innovative e scalabili.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vincxx.dev',

  // Contact information
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'vincxxdev@gmail.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '',
    phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || '',
  },

  // Social media
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/zeltarave',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/vincenzo-buttari-331a35241/',
  },

  // Analytics (optional)
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  },
} as const;

// Type helper for autocomplete
export type SiteConfig = typeof siteConfig;
