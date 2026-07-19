export type Locale = 'it' | 'en';

export interface NarrativeBlock {
  title: string;
  paragraphs: string[];
}

export interface ProjectContent {
  title: string;
  description: string;
  tagline: string;
  role: string;
  period: string;
  caseStudy?: {
    context: NarrativeBlock;
    approach: NarrativeBlock;
    outcome: NarrativeBlock;
  };
}

export interface Translations {
  nav: {
    home: string;
    work: string;
    about: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    homeAria: string;
  };
  hero: {
    greeting: string;
    titles: string[];
    roleStatic: string;
    tagline: string;
    buttons: {
      projects: string;
      contact: string;
    };
    scrollDown: string;
  };
  landing: {
    status: {
      label: string;
      roleLabel: string;
      roleValue: string;
      studyLabel: string;
      studyValue: string;
      availabilityLabel: string;
      availabilityValue: string;
      locationLabel: string;
    };
    paths: {
      label: string;
      work: { title: string; description: string };
      about: { title: string; description: string };
      contact: { title: string; description: string };
    };
    selectedWork: {
      label: string;
      title: string;
      description: string;
      viewAll: string;
    };
  };
  work: {
    title: string;
    lead: string;
    index: {
      filterLabel: string;
      filterAll: string;
      countOne: string;
      countMany: string;
      empty: string;
    };
    card: {
      caseStudy: string;
      liveDemo: string;
      github: string;
      previewUnavailable: string;
    };
    caseStudy: {
      backToWork: string;
      roleLabel: string;
      periodLabel: string;
      stackLabel: string;
      contextLabel: string;
      approachLabel: string;
      outcomeLabel: string;
      linksLabel: string;
      nextProject: string;
      notFound: {
        title: string;
        description: string;
        cta: string;
      };
    };
  };
  about: {
    title: string;
    lead: string;
    bio: string[];
    experience: { title: string; description: string; current: string };
    education: { title: string; description: string };
    certifications: { title: string; description: string; viewCert: string };
    skills: {
      title: string;
      description: string;
      tiers: {
        core: string;
        regular: string;
        occasional: string;
      };
      tierDescriptions: {
        core: string;
        regular: string;
        occasional: string;
      };
      projectCount: {
        one: string;
        many: string;
      };
    };
    languages: { title: string; description: string };
  };
  contact: {
    title: string;
    lead: string;
    email: {
      title: string;
      subtitle: string;
    };
    phone: {
      title: string;
      subtitle: string;
    };
    location: string;
    availability: string;
    availabilityValue: string;
    responseTime: string;
    responseTimeValue: string;
    cta: {
      title: string;
      description: string;
      action: string;
    };
  };
  experience: {
    items: {
      date: string;
      title: string;
      company: string;
      description: string;
    }[];
  };
  certifications: {
    items: {
      id: string;
      title: string;
      issuer: string;
      date: string;
      sortDate: string;
    }[];
  };
  projects: {
    items: Record<number, ProjectContent>;
  };
  languages: {
    items: {
      name: string;
      level: string;
      levelDescription?: string;
    }[];
  };
  footer: {
    allRightsReserved: string;
    linkedinProfile: string;
    githubProfile: string;
    navLabel: string;
    lighthouse: {
      label: string;
      caption: string;
      audited: string;
      metrics: {
        performance: string;
        accessibility: string;
        bestPractices: string;
        seo: string;
      };
      formFactors: {
        desktop: string;
        mobile: string;
      };
    };
  };
  cv: {
    download: string;
    generating: string;
    downloadSimplified: string;
    technicalCV: string;
    administrativeCV: string;
    generatingSimplified: string;
    error: string;
  };
  accessibility: {
    toggleSound: string;
    soundOn: string;
    soundOff: string;
    toggleTheme: string;
    scrollToTop: string;
    projectPreview: string;
    viewDemo: string;
    viewSource: string;
    readCaseStudy: string;
    sendEmail: string;
    callPhone: string;
    switchToEnglish: string;
    switchToItalian: string;
    skipToContent: string;
  };
  cvData: {
    labels: {
      profile: string;
      education: string;
      workExperience: string;
      projects: string;
      certifications: string;
      availability: string;
      privacyClause: string;
      info: string;
      contacts: string;
      social: string;
      languages: string;
      technicalSkills: string;
      softSkills: string;
      bornOn: string;
      nationality: string;
      maritalStatus: string;
      drivingLicense: string;
      withVehicle: string;
      immediateStart: string;
      willingToTravel: string;
      willingToRelocate: string;
    };
    personal: {
      nationality: string;
      maritalStatus: string;
      drivingLicense: string;
      vehicleNote: string;
    };
    profile: string;
    education: {
      title: string;
      institution: string;
      location: string;
      period: string;
      description: string;
    }[];
    languages: {
      name: string;
      level: string;
      percentage: number;
    }[];
    softSkills: string[];
    simplifiedCV: {
      title: string;
      profile: string;
      skills: {
        name: string;
        percentage: number;
      }[];
      projects: {
        title: string;
        description: string;
        technologies: string[];
        githubLink: string;
      }[];
      experience: {
        date: string;
        title: string;
        company: string;
        description: string;
      }[];
    };
  };
}
