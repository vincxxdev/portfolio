import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { it } from '@/i18n/locales/it';
import { siteConfig } from '@/config/site';
import { getAllProjectSlugs, getProjectBySlug } from '@/lib/projects';
import CaseStudyView from './CaseStudyView';

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const localized = it.projects.items[project.id];
  const title = localized?.title ?? project.title;
  const description = localized?.description ?? project.description;
  const url = `${siteConfig.url}/projects/${slug}`;
  const imageUrl = `${siteConfig.url}${project.previewImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'it-IT': url,
        'en-US': url,
        'x-default': url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProjectCaseStudyPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <CaseStudyView project={project} />;
}
