import { projectsData } from '@/data/projects';
import type { Project } from '@/types';

export function getAllProjectSlugs(): string[] {
  return projectsData.map((p) => p.slug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((p) => p.slug === slug);
}
