export type Locale = 'it' | 'en';

export interface Translations {
  nav: {
    about: string;
    experience: string;
    certifications: string;
    skills: string;
    projects: string;
    contacts: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    greeting: string;
    titles: string[];
    tagline: string;
    buttons: {
      projects: string;
      contact: string;
    };
    scrollDown: string;
  };
  about: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    terminalCommand: string;
    terminalUser: string;
    bio: string;
  };
  experience: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: {
      date: string;
      title: string;
      company: string;
      description: string;
    }[];
  };
  certifications: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    viewCert: string;
    items: {
      id: string;
      title: string;
      issuer: string;
      date: string;
      sortDate: string;
    }[];
  };
  skills: {
    title: string;
    titleHighlight: string;
    subtitle: string;
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
  projects: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    liveDemo: string;
    github: string;
    previewUnavailable: string;
    items: Record<number, {
      title: string;
      description: string;
    }>;
  };
  contacts: {
    title: string;
    titleHighlight: string;
    subtitle: string;
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
  };
  footer: {
    allRightsReserved: string;
    linkedinProfile: string;
    githubProfile: string;
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
    sendEmail: string;
    callPhone: string;
    switchToEnglish: string;
    switchToItalian: string;
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
