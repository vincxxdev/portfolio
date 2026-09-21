'use client';

import React, { memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import SkillIcon from './ui/SkillIcon';
import { skillsData } from '@/data/skills';
import { projectsData } from '@/data/projects';
import { useLocale } from '@/i18n';
import { registerIn } from './motion';
import { GROUP_RANK, type SkillTier } from '@/types';

const TIER_ORDER: SkillTier[] = ['core', 'regular', 'occasional'];

// Emphasis is carried by icon scale and ink weight only — no glow, no tint.
const TIER_VISUAL: Record<SkillTier, { iconSize: number; dot: string; icon: string }> = {
  core: { iconSize: 22, dot: 'bg-signal', icon: 'text-ink' },
  regular: { iconSize: 20, dot: 'bg-ink-3', icon: 'text-ink-2' },
  occasional: { iconSize: 18, dot: 'border border-hairline-strong', icon: 'text-ink-3' },
};

interface SkillTileProps {
  name: string;
  tier: SkillTier;
  iconName: string;
  countText: string | null;
}

const SkillTile = memo(({ name, tier, iconName, countText }: SkillTileProps) => {
  const visual = TIER_VISUAL[tier];

  return (
    <div className="flex items-center gap-3 border border-hairline bg-raised p-3.5">
      <SkillIcon name={iconName} className={visual.icon} size={visual.iconSize} />
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-ink">{name}</span>
        {countText && <span className="mt-0.5 block text-xs text-ink-3">{countText}</span>}
      </span>
    </div>
  );
});
SkillTile.displayName = 'SkillTile';

const Skills = () => {
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  const groupedSkills = useMemo(() => {
    const groups: Record<SkillTier, typeof skillsData> = { core: [], regular: [], occasional: [] };
    const indexOf = new Map(skillsData.map((s, i) => [s.name, i]));
    for (const skill of skillsData) groups[skill.tier].push(skill);
    for (const tier of TIER_ORDER) {
      groups[tier].sort((a, b) => {
        const groupDiff = GROUP_RANK[a.group] - GROUP_RANK[b.group];
        if (groupDiff !== 0) return groupDiff;
        return (indexOf.get(a.name) ?? 0) - (indexOf.get(b.name) ?? 0);
      });
    }
    return groups;
  }, []);

  const projectCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const skill of skillsData) {
      const tokens = new Set([skill.name, ...(skill.aliases ?? [])].map((s) => s.toLowerCase()));
      const n = projectsData.reduce(
        (acc, project) =>
          acc + (project.technologies.some((tech) => tokens.has(tech.toLowerCase())) ? 1 : 0),
        0
      );
      counts.set(skill.name, n);
    }
    return counts;
  }, []);

  const formatCount = (n: number) =>
    (n === 1 ? t.about.skills.projectCount.one : t.about.skills.projectCount.many).replace(
      '{n}',
      String(n)
    );

  return (
    <div>
      <h2 className="text-2xl text-ink sm:text-3xl">{t.about.skills.title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-ink-2 sm:text-base">
        {t.about.skills.description}
      </p>

      <div className="mt-10 space-y-10">
        {TIER_ORDER.map((tier, tierIndex) => {
          const skills = groupedSkills[tier];
          if (skills.length === 0) return null;

          return (
            <motion.div
              key={tier}
              {...registerIn(!!shouldReduceMotion, 12, tierIndex * 0.06)}
            >
              <div className="flex flex-col gap-1.5 border-b border-hairline pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="label-mono flex items-center gap-2.5 text-ink">
                  <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 ${TIER_VISUAL[tier].dot}`} />
                  {t.about.skills.tiers[tier]}
                  <span className="text-ink-3">{skills.length}</span>
                </h3>
                <p className="text-xs text-ink-3">{t.about.skills.tierDescriptions[tier]}</p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                {skills.map((skill) => {
                  const count = projectCounts.get(skill.name) ?? 0;
                  return (
                    <SkillTile
                      key={skill.name}
                      name={skill.name}
                      tier={skill.tier}
                      iconName={skill.iconName}
                      countText={count > 0 ? formatCount(count) : null}
                    />
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
