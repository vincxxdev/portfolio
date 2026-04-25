export type Locale = 'it' | 'en';

export interface Translations {
  nav: {
    about: string;
    experience: string;
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
    certTitle: string;
    certTitleHighlight: string;
    certSubtitle: string;
    viewCert: string;
    items: {
      date: string;
      title: string;
      company: string;
      description: string;
    }[];
    certifications: {
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
    levels: {
      expert: string;
      advanced: string;
      intermediate: string;
      beginner: string;
    };
    stats: {
      technologies: string;
      average: string;
      expert: string;
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
    privacyNote: string;
    privacyNoteSecond: string;
    linkedinProfile: string;
    githubProfile: string;
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
