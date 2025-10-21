/**
 * Centralized configuration for environment variables and personal data
 * All env variables and personal information are validated and typed here
 * These values are used across the entire site and in CV generation
 */

export const siteConfig = {
  // Basic info about the site
  name: 'vincxxdev',
  author: 'Vincenzo Buttari',
  description: 'Portfolio di Vincenzo Buttari - Software Engineer appassionato di creare soluzioni innovative e scalabili.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // Personal information
  personal: {
    firstName: process.env.NEXT_PUBLIC_FIRST_NAME || '',
    lastName: process.env.NEXT_PUBLIC_LAST_NAME || '',
    fullName: process.env.NEXT_PUBLIC_FULL_NAME || '',
    location: process.env.NEXT_PUBLIC_LOCATION || '',
    
    // Professional titles (used in Hero section and CV)
    titles: ['Software Engineer', 'Full Stack Developer'],
  },

  // Contact information
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '',
    phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || '',
  },

  // Social media
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || '',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
  },
  
} as const;

// Type helper for autocomplete
export type SiteConfig = typeof siteConfig;
