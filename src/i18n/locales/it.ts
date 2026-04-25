import type { Translations } from '../types';

export const it: Translations = {
  nav: {
    about: 'About',
    experience: 'Esperienze',
    skills: 'Skills',
    projects: 'Progetti',
    contacts: 'Contatti',
    openMenu: 'Apri menu di navigazione',
    closeMenu: 'Chiudi menu di navigazione',
  },
  hero: {
    greeting: 'Ciao, sono',
    titles: ['Software Engineer', 'Full Stack Developer'],
    tagline: 'appassionato di creare soluzioni innovative e scalabili e di esplorare nuove tecnologie.',
    buttons: {
      projects: 'I miei Progetti',
      contact: 'Contattami',
    },
    scrollDown: 'Scopri di più',
  },
  about: {
    title: 'About',
    titleHighlight: 'Me',
    subtitle: 'Scopri di più sul mio percorso e le mie passioni',
    terminalCommand: 'cat ./about.txt',
    terminalUser: 'vincxsh@portfolio',
    bio: "Ciao! Sono Vincenzo, un laureando nella facoltà di Informatica all'Università degli Studi di Bari Aldo Moro. " +
      "Il mio principale obiettivo è quello di espandere le mie competenze tecniche continuamente. " +
      "Ho una solida base in programmazione, algoritmi e strutture dati soprattutto in linguaggi OOP come Java. " +
      "La mia curiosità mi ha spinto verso lo sviluppo web, dove oggi sperimento con JavaScript, TypeScript, React e strumenti affini. " +
      "Utilizzo Node.js per la logica server-side e Git per un controllo di versione impeccabile.",
  },
  experience: {
    title: 'Le mie',
    titleHighlight: 'Esperienze',
    subtitle: 'Il mio percorso professionale e le competenze acquisite',
    certTitle: 'Le mie',
    certTitleHighlight: 'Certificazioni',
    certSubtitle: 'Corsi completati e certificazioni ottenute',
    viewCert: 'Visualizza Certificato',
    items: [
      {
        date: '26/11/2017 - 10/12/2017 - 10/02/2018',
        title: 'Cameriere',
        company: 'Bari',
        description: 'Cameriere presso lo Stadio San Nicola tramite Scuola Alberghiera Molfetta, servizio a buffet presso la tribuna d\'onore.',
      },
    ],
    certifications: [
      {
        id: '100-days-web-development',
        title: '100 Days Of Code - 2022 Web Development Bootcamp',
        issuer: 'Udemy',
        date: 'Marzo 2022',
        sortDate: '2022-03',
      },
      {
        id: 'mega-responsive-websites',
        title: '10 Mega Responsive Websites with HTML, CSS, and JavaScript',
        issuer: 'Udemy',
        date: 'Gennaio 2022',
        sortDate: '2022-01',
      },
      {
        id: 'networking-101',
        title: 'Networking 101: Corso di Reti da zero',
        issuer: 'Udemy',
        date: 'Gennaio 2025',
        sortDate: '2025-01',
      },
      {
        id: 'web-developer-bootcamp-2022',
        title: 'The Web Developer Bootcamp 2022',
        issuer: 'Udemy',
        date: 'Dicembre 2021',
        sortDate: '2021-12',
      },
    ],
  },
  skills: {
    title: 'Le mie',
    titleHighlight: 'Competenze',
    subtitle: 'Tecnologie e linguaggi che utilizzo per creare soluzioni innovative',
    levels: {
      expert: 'Esperto',
      advanced: 'Avanzato',
      intermediate: 'Intermedio',
      beginner: 'Principiante',
    },
    stats: {
      technologies: 'Tecnologie',
      average: 'Media',
      expert: 'Esperte',
    },
  },
  projects: {
    title: 'I Miei',
    titleHighlight: 'Progetti',
    subtitle: 'Esplora una selezione dei miei progetti più significativi',
    liveDemo: 'Live Demo',
    github: 'GitHub',
    previewUnavailable: 'Anteprima non disponibile',
    items: {
      1: {
        title: 'Portfolio Personale',
        description: 'Portfolio personale moderno e responsivo costruito con Next.js 15, TypeScript e Tailwind CSS. Include animazioni fluide, tema dark/light, e architettura scalabile.',
      },
      2: {
        title: 'Railway Simulator',
        description: 'Progetto realizzato in gruppo con un collega universitario. Backend in Node.js (Express) e frontend in FlexSim. Simula una stazione ferroviaria interagendo via Arduino.',
      },
      3: {
        title: 'Ataxx',
        description: 'Progetto universitario in gruppo per la realizzazione del gioco Ataxx in Java usando la tecnica di sviluppo Agile Scrum.',
      },
    },
  },
  contacts: {
    title: 'I miei',
    titleHighlight: 'Contatti',
    subtitle: 'Sono sempre aperto a nuove opportunità e collaborazioni. Sentiti libero di contattarmi!',
    email: {
      title: 'Email',
      subtitle: 'Scrivimi una mail',
    },
    phone: {
      title: 'Telefono',
      subtitle: 'Chiamami direttamente',
    },
    location: 'Location',
    availability: 'Disponibilità',
    availabilityValue: 'Aperto a Opportunità',
    responseTime: 'Tempo di Risposta',
    responseTimeValue: '24-48 ore',
  },
  footer: {
    allRightsReserved: 'Tutti i diritti riservati',
    privacyNote: 'Questo sito utilizza analytics anonimizzate per migliorare l\'esperienza utente.',
    privacyNoteSecond: 'Nessun dato personale viene raccolto o condiviso con terze parti.',
    linkedinProfile: 'Profilo LinkedIn',
    githubProfile: 'Profilo GitHub',
  },
  cv: {
    download: 'Scarica CV',
    generating: 'Generazione...',
    downloadSimplified: 'Scarica CV Semplificato',
    technicalCV: 'CV tecnico completo',
    administrativeCV: 'Per posizioni amministrative',
    generatingSimplified: 'Generazione Semplificato...',
    error: 'Si è verificato un errore durante la generazione del CV. Riprova.',
  },
  accessibility: {
    toggleSound: 'Effetti sonori',
    soundOn: 'Disattiva effetti sonori',
    soundOff: 'Attiva effetti sonori',
    toggleTheme: 'Cambia tema',
    scrollToTop: 'Torna in cima',
    projectPreview: 'Anteprima del progetto',
    viewDemo: 'Visualizza la demo live di',
    viewSource: 'Visualizza il codice sorgente di',
    sendEmail: 'Invia email a',
    callPhone: 'Chiama il numero',
    switchToEnglish: 'Switch to English',
    switchToItalian: "Passa all'Italiano",
  },
};
