import type { Translations } from '../types';

export const en: Translations = {
  nav: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    contacts: 'Contact',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
  },
  hero: {
    greeting: "Hi, I'm",
    titles: ['Software Engineer', 'Full Stack Developer'],
    tagline: 'passionate about building innovative, scalable solutions and exploring new technologies.',
    buttons: {
      projects: 'My Projects',
      contact: 'Contact Me',
    },
    scrollDown: 'Learn More',
  },
  about: {
    title: 'About',
    titleHighlight: 'Me',
    subtitle: 'Learn more about my journey and passions',
    terminalCommand: 'cat ./about.txt',
    terminalUser: 'vincxsh@portfolio',
    bio: "Hi! I'm Vincenzo, a Computer Science undergraduate at the University of Bari Aldo Moro. " +
      "My main goal is to continuously expand my technical skills. " +
      "I have a solid foundation in programming, algorithms, and data structures — especially in OOP languages like Java. " +
      "My curiosity led me to web development, where I now experiment with JavaScript, TypeScript, React, and related tools. " +
      "I use Node.js for server-side logic and Git for flawless version control.",
  },
  experience: {
    title: 'My',
    titleHighlight: 'Experience',
    subtitle: 'My professional journey and acquired skills',
    certTitle: 'My',
    certTitleHighlight: 'Certifications',
    certSubtitle: 'Completed courses and obtained certifications',
    viewCert: 'View Certificate',
    items: [
      {
        date: '26/11/2017 - 10/12/2017 - 10/02/2018',
        title: 'Waiter',
        company: 'Bari',
        description: 'Waiter at San Nicola Stadium through Molfetta Hotel School, buffet service in the VIP stand.',
      },
    ],
    certifications: [
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
        title: 'Networking 101: Networking from Scratch',
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
  skills: {
    title: 'My',
    titleHighlight: 'Skills',
    subtitle: 'Technologies and languages I use to build innovative solutions',
    levels: {
      expert: 'Expert',
      advanced: 'Advanced',
      intermediate: 'Intermediate',
      beginner: 'Beginner',
    },
    stats: {
      technologies: 'Technologies',
      average: 'Average',
      expert: 'Expert',
    },
  },
  projects: {
    title: 'My',
    titleHighlight: 'Projects',
    subtitle: 'Explore a selection of my most significant projects',
    liveDemo: 'Live Demo',
    github: 'GitHub',
    previewUnavailable: 'Preview not available',
    items: {
      1: {
        title: 'Personal Portfolio',
        description: 'Modern and responsive personal portfolio built with Next.js 15, TypeScript, and Tailwind CSS. Features smooth animations, dark/light theme, and scalable architecture.',
      },
      2: {
        title: 'Railway Simulator',
        description: 'Group project built with a university colleague. Node.js (Express) backend and FlexSim frontend. Simulates a railway station with Arduino interaction.',
      },
      3: {
        title: 'Ataxx',
        description: 'University group project for developing the Ataxx board game in Java using Agile Scrum methodology.',
      },
    },
  },
  contacts: {
    title: 'My',
    titleHighlight: 'Contacts',
    subtitle: "I'm always open to new opportunities and collaborations. Feel free to reach out!",
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
    availabilityValue: 'Open to Opportunities',
    responseTime: 'Response Time',
    responseTimeValue: '24-48 hours',
  },
  footer: {
    allRightsReserved: 'All rights reserved',
    privacyNote: 'This site uses anonymized analytics to improve user experience.',
    privacyNoteSecond: 'No personal data is collected or shared with third parties.',
    linkedinProfile: 'LinkedIn Profile',
    githubProfile: 'GitHub Profile',
  },
  cv: {
    download: 'Download CV',
    generating: 'Generating...',
    downloadSimplified: 'Download Simplified CV',
    technicalCV: 'Complete technical CV',
    administrativeCV: 'For administrative positions',
    generatingSimplified: 'Generating Simplified...',
    error: 'An error occurred while generating the CV. Please try again.',
  },
  accessibility: {
    toggleSound: 'Sound effects',
    soundOn: 'Disable sound effects',
    soundOff: 'Enable sound effects',
    toggleTheme: 'Toggle theme',
    scrollToTop: 'Back to top',
    projectPreview: 'Preview of project',
    viewDemo: 'View live demo of',
    viewSource: 'View source code of',
    sendEmail: 'Send email to',
    callPhone: 'Call',
    switchToEnglish: 'Switch to English',
    switchToItalian: 'Switch to Italian',
  },
};
