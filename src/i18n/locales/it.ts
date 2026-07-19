import type { Translations } from '../types';

export const it: Translations = {
  nav: {
    home: 'Home',
    work: 'Progetti',
    about: 'Percorso',
    contact: 'Contatti',
    openMenu: 'Apri menu di navigazione',
    closeMenu: 'Chiudi menu di navigazione',
    homeAria: 'Torna alla home',
  },
  hero: {
    greeting: 'Ciao, sono',
    titles: ['Software Engineer', 'Full Stack Developer'],
    roleStatic: 'Software Engineer & Full Stack Developer',
    tagline:
      'Sviluppo software su Microsoft Power Platform in Deloitte e costruisco applicazioni web con TypeScript, React e Node.js. Studio Informatica a Bari.',
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
      roleValue: 'Sviluppatore junior, Deloitte NextHub Bari',
      studyLabel: 'Studi',
      studyValue: 'Laurea in Informatica, Università di Bari — in corso',
      availabilityLabel: 'Disponibilità',
      availabilityValue: 'Aperto a nuove opportunità',
      locationLabel: 'Dove',
    },
    paths: {
      label: 'Da dove vuoi cominciare',
      work: {
        title: 'Guarda il lavoro',
        description: 'Progetti con il contesto, le scelte tecniche e cosa ho imparato.',
      },
      about: {
        title: 'Leggi il percorso',
        description: 'Esperienza, studi, certificazioni e competenze tecniche.',
      },
      contact: {
        title: 'Mettiti in contatto',
        description: 'Email diretta, telefono e CV scaricabile in PDF.',
      },
    },
    selectedWork: {
      label: 'Progetti',
      title: 'Una selezione del mio lavoro',
      description:
        'Tre progetti che raccontano come lavoro: due nati all’università in gruppo, uno il sito che stai leggendo.',
      viewAll: 'Vedi tutti i progetti',
    },
  },
  work: {
    title: 'Progetti',
    lead:
      'Ogni progetto ha una pagina dedicata con il contesto in cui è nato, le scelte tecniche che ho preso e cosa mi ha lasciato.',
    index: {
      filterLabel: 'Filtra per tecnologia',
      filterAll: 'Tutti',
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
    caseStudy: {
      backToWork: 'Torna ai progetti',
      roleLabel: 'Ruolo',
      periodLabel: 'Periodo',
      stackLabel: 'Stack',
      contextLabel: 'Contesto',
      approachLabel: 'Approccio',
      outcomeLabel: 'Risultato',
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
    lead:
      'Studente di Informatica all’Università di Bari, oggi sviluppatore junior in Deloitte. Qui trovi il percorso completo: esperienza, studi, certificazioni e competenze.',
    bio: [
      'Sono Vincenzo, studente di Informatica all’Università degli Studi di Bari Aldo Moro. Ho una base solida in programmazione, algoritmi e strutture dati, costruita soprattutto su linguaggi orientati agli oggetti come Java.',
      'La curiosità mi ha portato allo sviluppo web, dove lavoro con JavaScript, TypeScript e React, e uso Node.js per la logica lato server. Git fa parte del mio flusso quotidiano.',
      'Dal marzo 2026 lavoro in Deloitte NextHub Bari come sviluppatore junior su Microsoft Power Platform: Power Apps, Power Automate, Dataverse e plugin in C#. Il mio obiettivo è continuare ad ampliare le competenze tecniche su progetti reali.',
    ],
    experience: {
      title: 'Esperienza',
      description: 'Il percorso professionale, dal più recente.',
      current: 'In corso',
    },
    education: {
      title: 'Formazione',
      description: 'Studi e titoli conseguiti.',
    },
    certifications: {
      title: 'Certificazioni',
      description: 'Corsi completati e certificati ottenuti.',
      viewCert: 'Visualizza certificato',
    },
    skills: {
      title: 'Competenze tecniche',
      description:
        'Raggruppate per quanto le uso davvero, non per quanto suonano bene. Il numero di progetti accanto a ciascuna è calcolato dai progetti pubblicati qui.',
      tiers: {
        core: 'Stack principale',
        regular: 'Uso frequente',
        occasional: 'Conoscenza di base',
      },
      tierDescriptions: {
        core: 'Strumenti quotidiani — esperienza approfondita',
        regular: 'Usati con scioltezza in progetti reali',
        occasional: 'Studiati all’università o usati sporadicamente',
      },
      projectCount: {
        one: 'Usato in {n} progetto',
        many: 'Usato in {n} progetti',
      },
    },
    languages: {
      title: 'Lingue',
      description: 'Livelli secondo il quadro comune europeo (QCER).',
    },
  },
  contact: {
    title: 'Contatti',
    lead: 'Sono aperto a nuove opportunità e collaborazioni. Il modo più veloce per raggiungermi è l’email.',
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
      description: 'Che sia un’opportunità di lavoro, una collaborazione o una domanda tecnica, scrivimi pure.',
      action: 'Scrivimi una mail',
    },
  },
  experience: {
    items: [
      {
        date: '30/03/2026 - Presente',
        title: 'Microsoft Power Platform',
        company: 'Deloitte NextHub Bari',
        description:
          'Sviluppatore junior per soluzioni su Microsoft Power Platform, inclusi Power Apps, Power Automate, Dataverse e sviluppo di plugin in C#, per ottimizzare i processi aziendali e supportare la digitalizzazione dei servizi.',
      },
      {
        date: '26/11/2017 - 10/12/2017 - 10/02/2018',
        title: 'Cameriere',
        company: 'Bari',
        description:
          'Cameriere presso lo Stadio San Nicola tramite Scuola Alberghiera Molfetta, servizio a buffet presso la tribuna d\'onore.',
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
          'Portfolio personale moderno e responsivo costruito con Next.js 15, TypeScript e Tailwind CSS. Include animazioni fluide, tema dark/light, e architettura scalabile.',
        tagline: 'Il sito che stai leggendo, costruito da zero senza template.',
        role: 'Progetto personale, sviluppo individuale',
        period: 'In evoluzione continua',
        caseStudy: {
          context: {
            title: 'Contesto',
            paragraphs: [
              'Volevo un portfolio che fosse esso stesso un progetto tecnico, non un template compilato. L’obiettivo era avere un posto dove mostrare il mio lavoro e allo stesso tempo un banco di prova su cui sperimentare Next.js, TypeScript e le tecniche di performance sul campo.',
              'Il vincolo che mi sono dato è che il sito dovesse essere bilingue (italiano e inglese) e generare il mio CV in PDF direttamente dal browser, così da avere una sola fonte di verità per i contenuti invece di un curriculum separato da tenere aggiornato a mano.',
            ],
          },
          approach: {
            title: 'Approccio',
            paragraphs: [
              'Ho costruito il sito su Next.js 15 con App Router e React, in TypeScript, con Tailwind CSS per lo stile. I contenuti non sono scritti dentro i componenti: vivono in file di dati separati, così aggiornare un progetto o un’esperienza non richiede toccare la UI.',
              'Per la traduzione ho scritto un sistema i18n interno invece di aggiungere una libreria: un context React che espone le stringhe tipizzate, con i testi in due file di locale. Bastava per due lingue e mi ha evitato una dipendenza in più.',
              'Il CV in PDF è generato lato client con jsPDF, in due varianti (tecnica e semplificata), leggendo gli stessi contenuti tradotti del sito. Il lato performance è stato lavorato in modo esplicito: caricamento dinamico dei componenti pesanti, font gestiti da next/font, animazioni limitate a trasformazioni e opacità, effetti disattivati quando escono dalla viewport o quando il sistema richiede meno animazioni.',
            ],
          },
          outcome: {
            title: 'Risultato',
            paragraphs: [
              'Il sito è online su vincxx.dev, distribuito su Vercel, e i punteggi Lighthouse sono misurati e pubblicati nel footer invece di essere dichiarati a parole.',
              'Il valore più concreto per me è stato imparare quanto costano davvero certe scelte di rendering e di animazione, e come misurarle invece di intuirle. È anche il progetto su cui continuo a lavorare: essendo il mio, è il posto dove provo per primo le cose nuove.',
            ],
          },
        },
      },
      2: {
        title: 'Railway Simulator',
        description:
          'Progetto realizzato in gruppo con un collega universitario. Backend in Node.js (Express) e frontend in FlexSim. Simula una stazione ferroviaria interagendo via Arduino.',
        tagline: 'Una stazione ferroviaria simulata, con hardware reale collegato al software.',
        role: 'Progetto universitario in coppia',
        period: 'Università degli Studi di Bari',
        caseStudy: {
          context: {
            title: 'Contesto',
            paragraphs: [
              'Progetto universitario sviluppato in gruppo con un collega di corso. L’obiettivo era simulare il funzionamento di una stazione ferroviaria, mettendo in comunicazione un modello di simulazione con componenti hardware reali.',
              'La parte interessante non era il singolo pezzo, ma il fatto che tre mondi diversi dovessero parlarsi: un ambiente di simulazione, un server applicativo e una board fisica.',
            ],
          },
          approach: {
            title: 'Approccio',
            paragraphs: [
              'Abbiamo separato le responsabilità: la simulazione della stazione è stata realizzata in FlexSim, mentre la logica applicativa è stata affidata a un backend in Node.js con Express, che fa da punto di coordinamento tra le parti.',
              'L’interazione fisica passa da Arduino, collegato al sistema in modo che gli eventi hardware si riflettano nella simulazione. Il lavoro è stato diviso tra me e il mio collega e coordinato con Git e GitHub.',
            ],
          },
          outcome: {
            title: 'Risultato',
            paragraphs: [
              'Il simulatore funziona come progetto integrato: la stazione modellata in FlexSim risponde agli input che arrivano dal lato hardware attraverso il backend Node.js.',
              'La lezione che mi è rimasta riguarda l’integrazione più che il codice. Far dialogare sistemi che non sono nati per stare insieme richiede di definire bene i confini tra i componenti, ed è la prima volta che ho toccato con mano quanto quel lavoro di interfaccia pesi rispetto all’implementazione delle singole parti.',
            ],
          },
        },
      },
      3: {
        title: 'Ataxx',
        description:
          'Progetto universitario in gruppo per la realizzazione del gioco Ataxx in Java usando la tecnica di sviluppo Agile Scrum.',
        tagline: 'Il gioco da tavolo Ataxx in Java, sviluppato in team con metodo Scrum.',
        role: 'Progetto universitario in gruppo',
        period: 'Corso di Ingegneria del Software, Università di Bari',
        caseStudy: {
          context: {
            title: 'Contesto',
            paragraphs: [
              'Progetto del corso di Ingegneria del Software: realizzare in gruppo il gioco da tavolo Ataxx in Java. Il punto del corso non era solo consegnare un gioco funzionante, ma farlo seguendo un processo di sviluppo strutturato.',
              'Per questo il vincolo era di lavorare con Agile Scrum, organizzando l’avanzamento in iterazioni invece di procedere in modo estemporaneo.',
            ],
          },
          approach: {
            title: 'Approccio',
            paragraphs: [
              'Il gioco è stato implementato in Java, con la logica di gioco separata dall’interfaccia in modo da poterla verificare in isolamento. La correttezza delle regole è coperta da test scritti con JUnit.',
              'Il lavoro di squadra è stato gestito con Scrum: suddivisione delle attività, iterazioni e revisione periodica dell’avanzamento. Il codice è stato versionato su GitHub nel repository del corso, con il contributo distribuito tra i membri del gruppo.',
            ],
          },
          outcome: {
            title: 'Risultato',
            paragraphs: [
              'Il gioco è stato completato e consegnato con le regole di Ataxx implementate e verificate dai test.',
              'È il progetto che mi ha fatto capire la differenza tra scrivere codice che funziona e lavorare in un team che deve consegnare. Scrivere test su una logica di gioco con regole precise, e tenere il passo di un gruppo su un repository condiviso, sono state le due cose che mi sono portato dietro dopo il corso.',
            ],
          },
        },
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
      caption: 'Audit reale del sito in produzione locale',
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
    viewDemo: 'Visualizza la demo live di',
    viewSource: 'Visualizza il codice sorgente di',
    readCaseStudy: 'Leggi il case study di',
    sendEmail: 'Invia email a',
    callPhone: 'Chiama il numero',
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
