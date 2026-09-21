import { caseStudies } from '../caseStudies/it';
import type { Translations } from '../types';

export const it: Translations = {
  nav: {
    home: 'Home',
    work: 'Progetti',
    about: 'Percorso',
    contact: 'Contatti',
    openMenu: 'Apri menu di navigazione',
    closeMenu: 'Chiudi menu di navigazione',
    homeAria: 'torna alla home',
  },
  hero: {
    greeting: 'Ciao, sono',
    titles: ['Software Engineer', 'Full Stack Developer'],
    roleStatic: 'Software Engineer & Full Stack Developer',
    tagline: 'Lavoro su Power Platform in Deloitte. Nei progetti personali sviluppo applicazioni web con TypeScript, React e Node.js.',
    buttons: {
      projects: 'Guarda i progetti',
      contact: 'Contattami',
    },
    scrollDown: 'Scopri di più',
  },
  landing: {
    status: {
      label: 'In questo momento',
      roleLabel: 'Ruolo',
      roleValue: 'Sviluppatore junior · Deloitte NextHub Bari',
      studyLabel: 'Studi',
      studyValue: 'Informatica · Università di Bari · in corso',
      availabilityLabel: 'Disponibilità',
      availabilityValue: 'Aperto a nuove opportunità',
      locationLabel: 'Dove',
    },
    paths: {
      label: 'Continua a esplorare',
      work: {
        title: 'Guarda il lavoro',
        description: 'Progetti, stack e risultati.',
      },
      about: {
        title: 'Leggi il percorso',
        description: 'Esperienza, studi e competenze.',
      },
      contact: {
        title: 'Mettiti in contatto',
        description: 'Email, telefono e CV.',
      },
    },
    selectedWork: {
      label: 'Progetti',
      title: 'Progetti selezionati',
      description: 'Progetti personali e universitari.',
      viewAll: 'Vedi tutti i progetti',
    },
  },
  work: {
    title: 'Progetti',
    lead: 'Progetti personali e universitari, con stack e risultati.',
    index: {
      listHeading: 'Elenco dei progetti',
      filterLabel: 'Filtra per tecnologia',
      filterAll: 'Tutti',
      resetFilter: 'Rimuovi filtro',
      countOne: '{n} progetto',
      countMany: '{n} progetti',
      empty: 'Nessun progetto con questa tecnologia.',
    },
    card: {
      caseStudy: 'Leggi il case study',
      liveDemo: 'Live demo',
      github: 'GitHub',
      previewUnavailable: 'Anteprima non disponibile',
    },
    currentSite: {
      label: 'Questo sito',
      title: 'Sei già',
      emphasis: 'qui.',
      description: 'Il portfolio che stai esplorando.',
      home: 'Torna alla home',
    },
    caseStudy: {
      backToWork: 'Torna ai progetti',
      roleLabel: 'Ruolo',
      periodLabel: 'Periodo',
      stackLabel: 'Stack',
      diagram: {
        eyebrow: 'Dentro il progetto',
        title: 'Le scelte, collegate.',
        description: 'Segui ogni ramo dal vincolo all’effetto. Apri una scelta per approfondire il ragionamento e consultare le fonti.',
        objective: 'Punto di partenza',
        contribution: 'Il mio contributo',
        team: 'Lavoro di squadra',
        constraint: 'Vincolo',
        decision: 'Scelta',
        effect: 'Effetto',
        reason: 'Perché questa scelta',
        tradeoff: 'Il compromesso',
        evidence: 'Nel progetto',
        sources: 'Esplora le fonti',
        outcome: 'Dove portano le scelte',
        expand: 'Esplora la scelta',
        collapse: 'Chiudi il dettaglio',
        note: 'Sintesi ragionata di codice, documentazione e cronologia. Le motivazioni e i compromessi sono una lettura tecnica; le fonti collegano ogni scelta alla sua implementazione.',
      },
      previewLabel: 'Il progetto in pratica',
      linksLabel: 'Link',
      nextProject: 'Progetto successivo',
      notFound: {
        title: 'Progetto non trovato',
        description: 'Il progetto che cerchi non esiste o è stato rinominato.',
        cta: 'Vedi tutti i progetti',
      },
    },
  },
  about: {
    title: 'Percorso',
    lead: 'Sviluppatore junior in Deloitte e studente di Informatica a Bari.',
    profileLabel: 'Leggi il profilo completo',
    profileFacts: [
      { label: 'In Deloitte', value: 'Sviluppatore junior · Power Platform' },
      { label: 'Progetti personali', value: 'TypeScript · React · Node.js' },
      { label: 'Formazione', value: 'Informatica · Università di Bari' },
    ],
    bio: [
      'Sono Vincenzo, studente di Informatica all’Università degli Studi di Bari Aldo Moro. Ho una base solida in programmazione, algoritmi e strutture dati, costruita soprattutto su linguaggi orientati agli oggetti come Java.',
      'Nei miei progetti personali sviluppo applicazioni web con JavaScript, TypeScript, React e Node.js. Uso Git per il controllo di versione.',
      'Dal marzo 2026 lavoro in Deloitte NextHub Bari come sviluppatore junior su Microsoft Power Platform: Power Apps, Power Automate, Dataverse e plugin in C#. Il mio obiettivo è continuare ad ampliare le competenze tecniche su progetti reali.',
    ],
    index: { label: 'Indice' },
    experience: {
      title: 'Esperienza',
      description: 'Dal più recente.',
      current: 'In corso',
    },
    education: {
      title: 'Formazione',
      description: 'Studi e titoli.',
    },
    certifications: {
      title: 'Certificazioni',
      description: 'Corsi e certificazioni selezionati.',
      viewCert: 'Visualizza certificato',
    },
    skills: {
      title: 'Competenze tecniche',
      description: 'Tecnologie ordinate per frequenza d’uso e progetti pubblicati.',
      tiers: {
        core: 'Stack principale',
        regular: 'Uso frequente',
        occasional: 'Conoscenza di base',
      },
      tierDescriptions: {
        core: 'Uso quotidiano',
        regular: 'Uso frequente',
        occasional: 'Base / occasionale',
      },
      projectCount: {
        one: 'Usato in {n} progetto',
        many: 'Usato in {n} progetti',
      },
    },
    languages: {
      title: 'Lingue',
      description: 'Livelli QCER.',
    },
  },
  contact: {
    title: 'Contatti',
    lead: 'Disponibile per opportunità e collaborazioni.',
    email: {
      title: 'Email',
      subtitle: 'Scrivimi una mail',
    },
    phone: {
      title: 'Telefono',
      subtitle: 'Chiamami direttamente',
    },
    location: 'Località',
    availability: 'Disponibilità',
    availabilityValue: 'Aperto a opportunità',
    responseTime: 'Tempo di risposta',
    responseTimeValue: '24-48 ore',
    cta: {
      title: 'Parliamone',
      description: 'Scrivimi per lavoro, collaborazione o domande tecniche.',
      action: 'Scrivimi una mail',
    },
  },
  experience: {
    items: [
      {
        date: '30/03/2026 - Presente',
        title: 'Microsoft Power Platform',
        company: 'Deloitte NextHub Bari',
        description: 'Power Apps, Power Automate, Dataverse e plugin C# per soluzioni aziendali.',
      },
      {
        date: '26/11/2017 - 10/12/2017 - 10/02/2018',
        title: 'Cameriere',
        company: 'Bari',
        description: 'Servizio a buffet presso lo Stadio San Nicola.',
      },
    ],
  },
  certifications: {
    items: [
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
  projects: {
    items: {
      1: {
        title: 'Portfolio Personale',
        description:
          'Portfolio bilingue con percorsi dedicati ai progetti, CV generato nel browser e audit Lighthouse pubblicati. Costruito con Next.js e TypeScript.',
        tagline: 'Il sito che stai leggendo, costruito da zero senza template.',
        role: 'Progetto personale, sviluppo individuale',
        period: 'In evoluzione continua',
        caseStudy: caseStudies[1],
      },
      2: {
        title: 'Railway Simulator',
        description:
          'Una stazione ferroviaria collega Arduino e FlexSim attraverso API Express e PostgreSQL, condividendo posizioni dei treni, binari e passaggi a livello.',
        tagline: 'Una stazione ferroviaria simulata, con hardware reale collegato al software.',
        role: 'Backend, dati e test · progetto in coppia',
        period: 'Università degli Studi di Bari',
        caseStudy: caseStudies[2],
      },
      3: {
        title: 'Ataxx',
        description:
          'Ataxx da terminale in Java: regole organizzate con il pattern ECB, test JUnit e sviluppo in team attraverso tre sprint Scrum.',
        tagline: 'Il gioco da tavolo Ataxx in Java, sviluppato in team con metodo Scrum.',
        role: 'Logica delle mosse, CLI e test · lavoro in team',
        period: 'Corso di Ingegneria del Software, Università di Bari',
        caseStudy: caseStudies[3],
      },
    },
  },
  languages: {
    items: [
      { name: 'Italiano', level: 'Madrelingua' },
      { name: 'Inglese', level: 'B2', levelDescription: 'Intermedio-Avanzato' },
    ],
  },
  footer: {
    allRightsReserved: 'Tutti i diritti riservati',
    linkedinProfile: 'Profilo LinkedIn',
    githubProfile: 'Profilo GitHub',
    navLabel: 'Navigazione',
    lighthouse: {
      label: 'Lighthouse',
      caption: 'Audit locale',
      audited: 'Ultimo audit',
      metrics: {
        performance: 'Perf',
        accessibility: 'A11y',
        bestPractices: 'Best',
        seo: 'SEO',
      },
      formFactors: {
        desktop: 'Desktop',
        mobile: 'Mobile',
      },
    },
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
    readCaseStudy: 'Leggi il case study di',
    sendEmail: 'Invia una email a questo indirizzo',
    callPhone: 'Chiama questo numero',
    switchToEnglish: "Passa all'Inglese",
    switchToItalian: "Passa all'Italiano",
    skipToContent: 'Vai al contenuto principale',
  },
  cvData: {
    labels: {
      profile: 'PROFILO',
      education: 'ISTRUZIONE',
      workExperience: 'ESPERIENZA LAVORATIVA',
      projects: 'PROGETTI',
      certifications: 'CERTIFICAZIONI',
      availability: 'DISPONIBILITÀ',
      privacyClause:
        'Autorizzo il trattamento dei miei dati personali ai sensi del D.lgs. 196/2003 e del GDPR (Regolamento UE 2016/679).',
      info: 'INFORMAZIONI',
      contacts: 'CONTATTI',
      social: 'SOCIAL',
      languages: 'LINGUE',
      technicalSkills: 'COMPETENZE TECNICHE',
      softSkills: 'SOFT SKILLS',
      bornOn: 'Nato il',
      nationality: 'Nazionalità',
      maritalStatus: 'Stato civile',
      drivingLicense: 'Patente',
      withVehicle: ' (Automunito)',
      immediateStart: 'Disponibilità immediata',
      willingToTravel: 'Disponibile a trasferte',
      willingToRelocate: 'Disponibile al trasferimento',
    },
    personal: {
      nationality: 'Italiana',
      maritalStatus: 'Celibe',
      drivingLicense: 'Patente B',
      vehicleNote: ' (Automunito)',
    },
    profile:
      "Laureando in Informatica presso l'Università degli Studi di Bari con forte passione per lo sviluppo software e la risoluzione di problemi complessi. Motivato dall'apprendimento continuo e dalla curiosità verso le nuove tecnologie. Orientato alla creazione di soluzioni innovative, scalabili e ben strutturate.",
    education: [
      {
        title: 'Laurea in Informatica',
        institution: 'Università degli Studi di Bari Aldo Moro',
        location: 'Bari',
        period: 'In corso',
        description: 'Corso di laurea triennale in Informatica',
      },
      {
        title: 'Diploma di Istituto Alberghiero',
        institution: 'Istituto Alberghiero di Molfetta',
        location: 'Molfetta',
        period: '2016 - 2021',
        description: 'Diploma di scuola secondaria superiore',
      },
    ],
    languages: [
      { name: 'Italiano', level: 'Madrelingua', percentage: 100 },
      { name: 'Inglese', level: 'B2', percentage: 75 },
    ],
    softSkills: [
      'Problem Solving',
      'Team Working',
      'Comunicazione Efficace',
      'Apprendimento Continuo',
      'Gestione del Tempo',
      'Adattabilità',
    ],
    simplifiedCV: {
      title: 'Laureando in Informatica | Appassionato di Gestione Digitale e Organizzazione',
      profile:
        "Laureando in Informatica con eccellenti competenze informatiche e organizzative. Offro velocità nell'uso del PC, precisione nell'inserimento dati e capacità di problem solving apprese durante il percorso accademico. Cerco un impiego stabile che mi permetta di applicare la mia precisione e affidabilità in ambito amministrativo.",
      skills: [
        { name: 'Pacchetto Office (Excel, Word)', percentage: 95 },
        { name: 'Gestione Email & Calendario', percentage: 90 },
        { name: 'Navigazione Web & Ricerca', percentage: 95 },
        { name: 'Windows / Linux', percentage: 90 },
        { name: 'Hardware & Troubleshooting', percentage: 85 },
        { name: 'Inserimento Dati', percentage: 90 },
        { name: 'Gestione Documentale', percentage: 85 },
      ],
      projects: [
        {
          title: 'Portfolio Personale',
          description:
            'Progettazione e organizzazione autonoma di un progetto web completo. Gestione delle scadenze, pianificazione delle attività e documentazione del lavoro svolto.',
          technologies: ['Gestione Progetti', 'Organizzazione', 'Problem Solving'],
          githubLink: 'https://github.com/vincxxdev/portfolio',
        },
        {
          title: 'Railway Simulator',
          description:
            'Gestione di logiche complesse e organizzazione di flussi di dati simulati. Coordinamento del lavoro di gruppo e rispetto delle scadenze di progetto.',
          technologies: ['Lavoro di Gruppo', 'Coordinamento', 'Gestione Dati'],
          githubLink: 'https://github.com/vincxxdev/Railway-Simulator',
        },
        {
          title: 'Ataxx',
          description:
            'Progetto universitario in team con metodologia Agile. Gestione delle task, comunicazione efficace e rispetto delle milestone di progetto.',
          technologies: ['Team Working', 'Metodologia Agile', 'Gestione Task'],
          githubLink: 'https://github.com/softeng2324-inf-uniba/progetto-cocke',
        },
      ],
      experience: [
        {
          date: '2017 - 2018',
          title: 'Cameriere',
          company: 'Stadio San Nicola, Bari',
          description:
            "Servizio in tribuna d'onore presso lo Stadio San Nicola. Gestione dello stress in ambienti ad alta affluenza, puntualità rigorosa, attenzione al cliente e capacità di lavorare sotto pressione mantenendo professionalità e precisione nel servizio.",
        },
      ],
    },
  },
};
