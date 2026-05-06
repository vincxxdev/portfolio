// Project type definition
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveDemo?: string; // Optional live demo URL
  animationType: 'railway' | 'ataxx' | 'portfolio' | 'default';
  previewImage: string;
}

// Skill type definition
export type SkillTier = 'core' | 'regular' | 'occasional';

export interface Skill {
  name: string;
  tier: SkillTier;
  iconName: string;
  color: string;
  aliases?: string[];
}

export const TIER_RANK: Record<SkillTier, number> = { core: 3, regular: 2, occasional: 1 };
export const TIER_DOTS: Record<SkillTier, number> = { core: 5, regular: 3, occasional: 2 };

// Experience type definition
export interface Experience {
  date: string;
  title: string;
  company: string;
  description: string;
}

// Certification type definition
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  sortDate: string;
  url: string;
}

// Type definition for button variants
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'default' | 'sm' | 'lg';
