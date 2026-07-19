import { projectsData } from '@/data/projects';
import type { Project } from '@/types';

export function getAllProjectSlugs(): string[] {
  return projectsData.map((p) => p.slug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((p) => p.slug === slug);
}

/** Wraps around, so the last case study points back at the first. */
export function getNextProject(slug: string): Project | undefined {
  const index = projectsData.findIndex((p) => p.slug === slug);
  if (index === -1 || projectsData.length < 2) return undefined;
  return projectsData[(index + 1) % projectsData.length];
}
