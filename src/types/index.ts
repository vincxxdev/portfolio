// Project type definition
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  animationType: 'railway' | 'ataxx';
  previewImage: string;
}

// Skill type definition
export interface Skill {
  name: string;
  percentage: number;
  iconName: string;
  color: string;
}

// Experience type definition
export interface Experience {
  date: string;
  title: string;
  company: string;
  description: string;
}

// Certification type definition
export interface Certification {
  title: string;
  issuer: string;
  date: string;
  url: string;
}

// Type definition for button variants
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'default' | 'sm' | 'lg';
