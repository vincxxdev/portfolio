import type { Translations } from '../types';

export const en: Translations = {
  nav: {
    home: 'Home',
    work: 'Work',
    about: 'Background',
    contact: 'Contact',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    homeAria: 'back to home',
  },
  hero: {
    greeting: "Hi, I'm",
    titles: ['Software Engineer', 'Full Stack Developer'],
    roleStatic: 'Software Engineer & Full Stack Developer',
    tagline: 'I work on Power Platform at Deloitte. My personal web projects use TypeScript, React and Node.js.',
    buttons: {
      projects: 'See the work',
      contact: 'Get in touch',
    },
    scrollDown: 'Find out more',
  },
  landing: {
    status: {
      label: 'Right now',
      roleLabel: 'Role',
      roleValue: 'Junior developer · Deloitte NextHub Bari',
      studyLabel: 'Studies',
      studyValue: 'Computer Science · University of Bari · in progress',
      availabilityLabel: 'Availability',
      availabilityValue: 'Open to new opportunities',
      locationLabel: 'Based in',
    },
    paths: {
      label: 'Keep exploring',
      work: {
        title: 'See the work',
        description: 'Projects, stack and outcomes.',
      },
      about: {
        title: 'Read the background',
        description: 'Experience, education and skills.',
      },
      contact: {
        title: 'Get in touch',
        description: 'Email, phone and CV.',
      },
    },
    selectedWork: {
      label: 'Work',
      title: 'Selected projects',
      description: 'Personal and university projects.',
      viewAll: 'See all projects',
    },
  },
  work: {
    title: 'Work',
    lead: 'Personal and university projects, with stack and outcomes.',
    index: {
      listHeading: 'Project index',
      filterLabel: 'Filter by technology',
      filterAll: 'All',
      resetFilter: 'Clear filter',
      countOne: '{n} project',
      countMany: '{n} projects',
      empty: 'No projects using this technology.',
    },
    card: {
      caseStudy: 'Read the case study',
      liveDemo: 'Live demo',
      github: 'GitHub',
      previewUnavailable: 'Preview unavailable',
    },
    currentSite: {
      label: 'This site',
      title: 'You’re',
      emphasis: 'here.',
      description: 'The portfolio you’re exploring.',
      home: 'Back to home',
    },
    caseStudy: {
      backToWork: 'Back to work',
      roleLabel: 'Role',
      periodLabel: 'Period',
      stackLabel: 'Stack',
      contextLabel: 'Context',
      approachLabel: 'Approach',
      outcomeLabel: 'Outcome',
      linksLabel: 'Links',
      nextProject: 'Next project',
      notFound: {
        title: 'Project not found',
        description: 'The project you are looking for does not exist or has been renamed.',
        cta: 'See all projects',
      },
    },
  },
  about: {
    title: 'Background',
    lead: 'Junior developer at Deloitte and Computer Science student in Bari.',
    profileLabel: 'Read the full profile',
    profileFacts: [
      { label: 'At Deloitte', value: 'Junior developer · Power Platform' },
      { label: 'Personal projects', value: 'TypeScript · React · Node.js' },
      { label: 'Education', value: 'Computer Science · University of Bari' },
    ],
    bio: [
      "I'm Vincenzo, a Computer Science student at the University of Bari Aldo Moro. I have a solid foundation in programming, algorithms and data structures, built mostly on object-oriented languages like Java.",
      'In my personal projects, I build web applications with JavaScript, TypeScript, React and Node.js. I use Git for version control.',
      'Since March 2026 I have been working at Deloitte NextHub Bari as a junior developer on Microsoft Power Platform: Power Apps, Power Automate, Dataverse and plugins in C#. My goal is to keep growing my technical skills on real projects.',
    ],
    index: { label: 'Index' },
    experience: {
      title: 'Experience',
      description: 'Most recent first.',
      current: 'Current',
    },
    education: {
      title: 'Education',
      description: 'Studies and qualifications.',
    },
    certifications: {
      title: 'Certifications',
      description: 'Selected courses and certifications.',
      viewCert: 'View certificate',
    },
    skills: {
      title: 'Technical skills',
      description: 'Technologies ordered by frequency of use and published projects.',
      tiers: {
        core: 'Core stack',
        regular: 'Frequent use',
        occasional: 'Working knowledge',
      },
      tierDescriptions: {
        core: 'Daily use',
        regular: 'Frequent use',
        occasional: 'Working knowledge',
      },
      projectCount: {
        one: 'Used in {n} project',
        many: 'Used in {n} projects',
      },
    },
    languages: {
      title: 'Languages',
      description: 'CEFR levels.',
    },
  },
  contact: {
    title: 'Contact',
    lead: 'Available for opportunities and collaborations.',
    email: {
      title: 'Email',
      subtitle: 'Send me an email',
    },
    phone: {
      title: 'Phone',
      subtitle: 'Call me directly',
    },
    location: 'Location',
    availability: 'Availability',
    availabilityValue: 'Open to opportunities',
    responseTime: 'Response time',
    responseTimeValue: '24-48 hours',
    cta: {
      title: "Let's talk",
      description: 'Write for a role, collaboration or technical question.',
      action: 'Send me an email',
    },
  },
  experience: {
    items: [
      {
        date: '30/03/2026 - Present',
        title: 'Microsoft Power Platform',
        company: 'Deloitte NextHub Bari',
        description: 'Power Apps, Power Automate, Dataverse and C# plugins for business solutions.',
      },
      {
        date: '26/11/2017 - 10/12/2017 - 10/02/2018',
        title: 'Waiter',
        company: 'Bari',
        description: 'Buffet service at San Nicola Stadium.',
      },
    ],
  },
  certifications: {
    items: [
      {
        id: '100-days-web-development',
        title: '100 Days Of Code - 2022 Web Development Bootcamp',
        issuer: 'Udemy',
        date: 'March 2022',
        sortDate: '2022-03',
      },
      {
        id: 'mega-responsive-websites',
        title: '10 Mega Responsive Websites with HTML, CSS, and JavaScript',
        issuer: 'Udemy',
        date: 'January 2022',
        sortDate: '2022-01',
      },
      {
        id: 'networking-101',
        title: 'Networking 101: Networking Course from Scratch',
        issuer: 'Udemy',
        date: 'January 2025',
        sortDate: '2025-01',
      },
      {
        id: 'web-developer-bootcamp-2022',
        title: 'The Web Developer Bootcamp 2022',
        issuer: 'Udemy',
        date: 'December 2021',
        sortDate: '2021-12',
      },
    ],
  },
  projects: {
    items: {
      1: {
        title: 'Personal Portfolio',
        description:
          'Modern, responsive personal portfolio built with Next.js 15, TypeScript and Tailwind CSS. Features smooth animations, dark/light theme and a scalable architecture.',
        tagline: 'The site you are reading, built from scratch without a template.',
        role: 'Personal project, solo build',
        period: 'Continuously evolving',
        caseStudy: {
          context: {
            title: 'Context',
            paragraphs: [
              'I wanted a portfolio that was itself a technical project rather than a filled-in template. The goal was a place to show my work that doubled as a testing ground for Next.js, TypeScript and performance techniques in practice.',
              'The constraint I set myself was that the site had to be bilingual (Italian and English) and generate my CV as a PDF straight from the browser, so content would have a single source of truth instead of a separate résumé to keep in sync by hand.',
            ],
          },
          approach: {
            title: 'Approach',
            paragraphs: [
              'The site runs on Next.js 15 with the App Router and React, written in TypeScript, styled with Tailwind CSS. Content is not written inside the components: it lives in separate data files, so updating a project or a role never means touching the UI.',
              'For translation I wrote a small in-house i18n system instead of pulling in a library: a React context exposing typed strings, with the copy held in two locale files. It was enough for two languages and saved a dependency.',
              'The PDF CV is generated client-side with jsPDF in two variants (technical and simplified), reading the same translated content as the site. Performance was worked on deliberately: dynamic imports for heavy components, fonts handled by next/font, animations restricted to transforms and opacity, and effects switched off when they scroll out of view or when the system asks for reduced motion.',
            ],
          },
          outcome: {
            title: 'Outcome',
            paragraphs: [
              'The site is live at vincxx.dev, deployed on Vercel, and the Lighthouse scores are measured and published in the footer rather than claimed in words.',
              'The most concrete value for me was learning what certain rendering and animation choices actually cost, and how to measure that instead of guessing. It is also the project I keep working on: being mine, it is where I try new things first.',
            ],
          },
        },
      },
      2: {
        title: 'Railway Simulator',
        description:
          'Team project built with a fellow university student. Node.js (Express) backend and FlexSim frontend. Simulates a railway station interacting via Arduino.',
        tagline: 'A simulated railway station, with real hardware wired into the software.',
        role: 'University project, pair work',
        period: 'University of Bari',
        caseStudy: {
          context: {
            title: 'Context',
            paragraphs: [
              'A university project built in a team with a fellow student. The goal was to simulate the operation of a railway station, connecting a simulation model with real hardware components.',
              'The interesting part was not any single piece but the fact that three different worlds had to talk to each other: a simulation environment, an application server and a physical board.',
            ],
          },
          approach: {
            title: 'Approach',
            paragraphs: [
              'We separated responsibilities: the station simulation was built in FlexSim, while the application logic went into a Node.js backend with Express, acting as the coordination point between the parts.',
              'Physical interaction runs through Arduino, wired into the system so that hardware events are reflected in the simulation. The work was split between me and my teammate and coordinated with Git and GitHub.',
            ],
          },
          outcome: {
            title: 'Outcome',
            paragraphs: [
              'The simulator works as an integrated project: the station modelled in FlexSim responds to inputs arriving from the hardware side through the Node.js backend.',
              'What stayed with me was about integration more than code. Making systems talk when they were never designed to work together forces you to define the boundaries between components properly, and it was the first time I saw first-hand how much that interface work weighs compared to implementing the individual parts.',
            ],
          },
        },
      },
      3: {
        title: 'Ataxx',
        description:
          'University team project building the Ataxx board game in Java using the Agile Scrum development method.',
        tagline: 'The Ataxx board game in Java, built as a team using Scrum.',
        role: 'University project, team work',
        period: 'Software Engineering course, University of Bari',
        caseStudy: {
          context: {
            title: 'Context',
            paragraphs: [
              'A Software Engineering course project: build the Ataxx board game in Java as a team. The point of the course was not only shipping a working game but doing it through a structured development process.',
              'That is why the constraint was to work with Agile Scrum, organising progress into iterations rather than working ad hoc.',
            ],
          },
          approach: {
            title: 'Approach',
            paragraphs: [
              'The game was implemented in Java, with the game logic kept separate from the interface so it could be verified in isolation. Correctness of the rules is covered by tests written with JUnit.',
              'Team work was run with Scrum: splitting up the tasks, working in iterations and reviewing progress regularly. The code was versioned on GitHub in the course repository, with contributions spread across the group members.',
            ],
          },
          outcome: {
            title: 'Outcome',
            paragraphs: [
              'The game was completed and delivered, with the Ataxx rules implemented and verified by the tests.',
              'This is the project that showed me the difference between writing code that works and working in a team that has to deliver. Writing tests against game logic with precise rules, and keeping pace with a group on a shared repository, were the two things I carried away from the course.',
            ],
          },
        },
      },
    },
  },
  languages: {
    items: [
      { name: 'Italian', level: 'Native' },
      { name: 'English', level: 'B2', levelDescription: 'Upper-Intermediate' },
    ],
  },
  footer: {
    allRightsReserved: 'All rights reserved',
    linkedinProfile: 'LinkedIn Profile',
    githubProfile: 'GitHub Profile',
    navLabel: 'Navigation',
    lighthouse: {
      label: 'Lighthouse',
      caption: 'Real audit of the site in local production',
      audited: 'Last audit',
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
    download: 'Download CV',
    generating: 'Generating...',
    downloadSimplified: 'Download Simplified CV',
    technicalCV: 'Full technical CV',
    administrativeCV: 'For administrative positions',
    generatingSimplified: 'Generating Simplified...',
    error: 'An error occurred while generating the CV. Please try again.',
  },
  accessibility: {
    toggleSound: 'Sound effects',
    soundOn: 'Turn off sound effects',
    soundOff: 'Turn on sound effects',
    toggleTheme: 'Change theme',
    scrollToTop: 'Back to top',
    projectPreview: 'Project preview',
    readCaseStudy: 'Read the case study for',
    sendEmail: 'Send an email to this address',
    callPhone: 'Call this number',
    switchToEnglish: 'Switch to English',
    switchToItalian: 'Switch to Italian',
    skipToContent: 'Skip to main content',
  },
  cvData: {
    labels: {
      profile: 'PROFILE',
      education: 'EDUCATION',
      workExperience: 'WORK EXPERIENCE',
      projects: 'PROJECTS',
      certifications: 'CERTIFICATIONS',
      availability: 'AVAILABILITY',
      privacyClause:
        'I authorize the processing of my personal data in accordance with Legislative Decree 196/2003 and GDPR (EU Regulation 2016/679).',
      info: 'INFORMATION',
      contacts: 'CONTACTS',
      social: 'SOCIAL',
      languages: 'LANGUAGES',
      technicalSkills: 'TECHNICAL SKILLS',
      softSkills: 'SOFT SKILLS',
      bornOn: 'Born on',
      nationality: 'Nationality',
      maritalStatus: 'Marital status',
      drivingLicense: 'Driving license',
      withVehicle: ' (With vehicle)',
      immediateStart: 'Immediate availability',
      willingToTravel: 'Willing to travel',
      willingToRelocate: 'Willing to relocate',
    },
    personal: {
      nationality: 'Italian',
      maritalStatus: 'Single',
      drivingLicense: 'Category B',
      vehicleNote: ' (With vehicle)',
    },
    profile:
      'Computer Science student at the University of Bari with a strong passion for software development and solving complex problems. Motivated by continuous learning and curiosity about new technologies. Focused on creating innovative, scalable and well-structured solutions.',
    education: [
      {
        title: 'Bachelor Degree in Computer Science',
        institution: 'University of Bari Aldo Moro',
        location: 'Bari',
        period: 'In progress',
        description: "Bachelor's degree course in Computer Science",
      },
      {
        title: 'Hospitality Institute Diploma',
        institution: 'Hospitality Institute of Molfetta',
        location: 'Molfetta',
        period: '2016 - 2021',
        description: 'High school diploma',
      },
    ],
    languages: [
      { name: 'Italian', level: 'Native', percentage: 100 },
      { name: 'English', level: 'B2', percentage: 75 },
    ],
    softSkills: [
      'Problem Solving',
      'Team Working',
      'Effective Communication',
      'Continuous Learning',
      'Time Management',
      'Adaptability',
    ],
    simplifiedCV: {
      title: 'Computer Science Student | Passionate about Digital Management and Organization',
      profile:
        'Computer Science student with excellent IT and organizational skills. I offer speed in using a PC, precision in data entry and problem-solving skills learned during my academic path. I am looking for stable employment that allows me to apply my precision and reliability in an administrative context.',
      skills: [
        { name: 'Office Suite (Excel, Word)', percentage: 95 },
        { name: 'Email & Calendar Management', percentage: 90 },
        { name: 'Web Browsing & Research', percentage: 95 },
        { name: 'Windows / Linux', percentage: 90 },
        { name: 'Hardware & Troubleshooting', percentage: 85 },
        { name: 'Data Entry', percentage: 90 },
        { name: 'Document Management', percentage: 85 },
      ],
      projects: [
        {
          title: 'Personal Portfolio',
          description:
            'Independent design and organization of a complete web project. Deadline management, activity planning and documentation of the work carried out.',
          technologies: ['Project Management', 'Organization', 'Problem Solving'],
          githubLink: 'https://github.com/vincxxdev/portfolio',
        },
        {
          title: 'Railway Simulator',
          description:
            'Management of complex logic and organization of simulated data flows. Coordination of group work and compliance with project deadlines.',
          technologies: ['Team Working', 'Coordination', 'Data Management'],
          githubLink: 'https://github.com/vincxxdev/Railway-Simulator',
        },
        {
          title: 'Ataxx',
          description:
            'University team project with Agile methodology. Task management, effective communication and compliance with project milestones.',
          technologies: ['Team Working', 'Agile Methodology', 'Task Management'],
          githubLink: 'https://github.com/softeng2324-inf-uniba/progetto-cocke',
        },
      ],
      experience: [
        {
          date: '2017 - 2018',
          title: 'Waiter',
          company: 'San Nicola Stadium, Bari',
          description:
            'Service in the VIP stand at the San Nicola Stadium. Stress management in high-attendance environments, strict punctuality, customer focus and the ability to work under pressure while maintaining professionalism and precision in service.',
        },
      ],
    },
  },
};
