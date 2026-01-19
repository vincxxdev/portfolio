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
    
    // Additional personal info (for CV)
    birthDate: process.env.NEXT_PUBLIC_BIRTH_DATE || '', // Format: "01/01/2000"
    nationality: 'Italiana',
    maritalStatus: 'Celibe',
    
    // Driving license and mobility
    drivingLicense: 'Patente B',
    hasVehicle: true, // Automunito
    
    // Professional titles (used in Hero section and CV)
    titles: ['Software Engineer', 'Full Stack Developer'],
    
    // Short bio (used in Hero and CV)
    tagline: 'appassionato di creare soluzioni innovative e scalabili e di esplorare nuove tecnologie.',
    
    // Extended bio (used in About section and CV profile)
    bio: "Ciao! Sono Vincenzo, un laureando nella facoltà di Informatica all'Università degli Studi di Bari Aldo Moro. " +
         "Il mio principale obiettivo è quello di espandere le mie competenze tecniche continuamente. " +
         "Ho una solida base in programmazione, algoritmi e strutture dati soprattutto in linguaggi OOP come Java. " +
         "La mia curiosità mi ha spinto verso lo sviluppo web, dove oggi sperimento con JavaScript, TypeScript, React e strumenti affini. " +
         "Utilizzo Node.js per la logica server-side e Git per un controllo di versione impeccabile.",
    
    // CV-specific profile (concise version for PDF)
    cvProfile: "Laureando in Informatica presso l'Università degli Studi di Bari con forte passione per lo sviluppo software e la risoluzione di problemi complessi. " +
               "Motivato dall'apprendimento continuo e dalla curiosità verso le nuove tecnologie. " +
               "Orientato alla creazione di soluzioni innovative, scalabili e ben strutturate.",
    
    // Availability
    availability: {
      immediateStart: true,      // Disponibilità immediata
      willingToTravel: true,     // Disponibile a trasferte
      willingToRelocate: false,  // Disponibile a trasferimento
    },
    
    // Privacy authorization (GDPR)
    privacyClause: "Autorizzo il trattamento dei miei dati personali ai sensi del D.lgs. 196/2003 e del GDPR (Regolamento UE 2016/679).",
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
