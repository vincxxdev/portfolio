'use client';

import { skillsData } from '@/data/skills';
import { projectsData } from '@/data/projects';
import SkillIcon from './ui/SkillIcon';
import { FolderGit2 } from 'lucide-react';
import { memo, useMemo } from 'react';
import Card from './ui/Card';
import { SectionHeader } from './ui/CardComponents';
import Printer3DText, { CHAR_DELAY } from './ui/Printer3DText';
import { useLocale } from '@/i18n';
import { TIER_RANK, type SkillTier } from '@/types';

const TIER_VISUAL: Record<SkillTier, {
  iconSize: number;
  ring: string;
  iconWrap: string;
  glow: string;
  opacity: string;
}> = {
  core: {
    iconSize: 52,
    ring: 'border-accent/40',
    iconWrap: 'bg-accent/10 shadow-[0_0_28px_rgba(56,189,248,0.18)]',
    glow: 'group-hover:shadow-[0_0_36px_rgba(56,189,248,0.35)]',
    opacity: 'opacity-100',
  },
  regular: {
    iconSize: 40,
    ring: 'border-secondary-text/20',
    iconWrap: 'bg-primary-background/40',
    glow: 'group-hover:shadow-[0_0_24px_rgba(56,189,248,0.18)]',
    opacity: 'opacity-95',
  },
  occasional: {
    iconSize: 32,
    ring: 'border-secondary-text/15',
    iconWrap: 'bg-primary-background/30',
    glow: '',
    opacity: 'opacity-70 group-hover:opacity-100',
  },
};

interface SkillCardProps {
  name: string;
  tier: SkillTier;
  iconName: string;
  color: string;
  index: number;
  projectCount: number;
  tierLabel: string;
  countText: string;
}

const SkillCard = memo(({
  name,
  tier,
  iconName,
  color,
  index,
  projectCount,
  tierLabel,
  countText,
}: SkillCardProps) => {
  const visual = TIER_VISUAL[tier];

  return (
    <Card
      hoverEffect="lift"
      padding="md"
      disableBlur
      cornerAccent={false}
      className="items-center justify-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      title={tierLabel}
    >
      {projectCount > 0 && (
        <div
          className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full border border-secondary-text/15 bg-primary-background/70 px-2 py-0.5 text-[0.65rem] font-semibold text-secondary-text"
          title={countText}
        >
          <FolderGit2 className="h-3 w-3 text-accent" aria-hidden="true" />
          <span aria-label={countText}>{projectCount}</span>
        </div>
      )}

      <div className={`flex flex-col items-center gap-3 transition-opacity duration-300 ${visual.opacity}`}>
        <div
          className={`relative flex items-center justify-center rounded-2xl border ${visual.ring} ${visual.iconWrap} ${visual.glow} transition-all duration-300 group-hover:scale-105`}
          style={{ width: visual.iconSize + 24, height: visual.iconSize + 24 }}
        >
          <SkillIcon name={iconName} className={color} size={visual.iconSize} />
        </div>

        <h3 className="text-sm font-bold text-primary-text group-hover:text-accent transition-colors duration-300">
          {name}
        </h3>
      </div>
    </Card>
  );
});
SkillCard.displayName = 'SkillCard';

const Skills = () => {
  const { t } = useLocale();

  const sortedSkills = useMemo(
    () =>
      [...skillsData].sort((a, b) => {
        const tierDiff = TIER_RANK[b.tier] - TIER_RANK[a.tier];
        if (tierDiff !== 0) return tierDiff;
        return a.name.localeCompare(b.name);
      }),
    [],
  );

  const projectCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const skill of skillsData) {
      const tokens = new Set(
        [skill.name, ...(skill.aliases ?? [])].map((s) => s.toLowerCase()),
      );
      const n = projectsData.reduce(
        (acc, project) =>
          acc + (project.technologies.some((tech) => tokens.has(tech.toLowerCase())) ? 1 : 0),
        0,
      );
      counts.set(skill.name, n);
    }
    return counts;
  }, []);

  const formatCount = (n: number) =>
    (n === 1 ? t.skills.projectCount.one : t.skills.projectCount.many).replace('{n}', String(n));

  const totalChars = t.skills.title.length + 1 + t.skills.titleHighlight.length;
  const descDelay = (totalChars * CHAR_DELAY + 200) / 1000;

  return (
    <section
      id="skills"
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(to right, rgba(100, 116, 139, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.18) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)' } as React.CSSProperties} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_25%,transparent_72%,rgba(15,23,42,0.12)_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.12)_0%,transparent_22%,transparent_74%,rgba(10,25,47,0.32)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent opacity-70" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <SectionHeader
          title={<Printer3DText text={t.skills.title} highlightText={t.skills.titleHighlight} />}
          description={t.skills.subtitle}
          descriptionDelay={descDelay}
        />

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {sortedSkills.map((skill, index) => {
            const count = projectCounts.get(skill.name) ?? 0;
            return (
              <SkillCard
                key={skill.name}
                name={skill.name}
                tier={skill.tier}
                iconName={skill.iconName}
                color={skill.color}
                index={index}
                projectCount={count}
                tierLabel={t.skills.tiers[skill.tier]}
                countText={formatCount(count)}
              />
            );
          })}
        </div>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-secondary-background z-[5] pointer-events-none" />
    </section>
  );
};

export default Skills;
