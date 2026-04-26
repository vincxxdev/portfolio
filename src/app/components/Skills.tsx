'use client';

import { skillsData } from '@/data/skills';
import SkillIcon from './ui/SkillIcon';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Code2, Zap } from 'lucide-react';
import { useRef, useState, memo } from 'react';
import Card from './ui/Card';
import { SectionHeader } from './ui/CardComponents';
import Printer3DText, { CHAR_DELAY } from './ui/Printer3DText';
import { useLocale } from '@/i18n';

interface SkillCardProps {
  name: string;
  percentage: number;
  iconName: string;
  color: string;
  index: number;
  levelLabels: {
    expert: string;
    advanced: string;
    intermediate: string;
    beginner: string;
  };
}

const CIRCUMFERENCE = 2 * Math.PI * 52;

const SkillCard = memo(({ name, percentage, iconName, color, index, levelLabels }: SkillCardProps) => {
  const hasAnimated = useRef(false);

  const [targetPercentage] = useState(() => {
    const variation = (Math.random() - 0.5) * 2;
    return Math.min(100, Math.max(0, percentage + variation));
  });

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const percentageText = useTransform(rounded, (v) => `${v}%`);
  const progressWidth = useTransform(count, (v) => `${v}%`);
  const dashOffset = useTransform(count, (v) => CIRCUMFERENCE - (v / 100) * CIRCUMFERENCE);

  const handleViewportEnter = () => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      animate(count, targetPercentage, {
        duration: 2,
        ease: "easeOut",
      });
    }
  };

  const getSkillLevel = (percentage: number) => {
    if (percentage >= 80) return { label: levelLabels.expert, color: 'from-green-500 to-emerald-500' };
    if (percentage >= 60) return { label: levelLabels.advanced, color: 'from-blue-500 to-cyan-500' };
    if (percentage >= 40) return { label: levelLabels.intermediate, color: 'from-yellow-500 to-orange-500' };
    return { label: levelLabels.beginner, color: 'from-orange-500 to-red-500' };
  };

  const skillLevel = getSkillLevel(percentage);

  return (
    <Card
      hoverEffect="lift"
      padding="md"
      disableBlur
      className="items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onViewportEnter={handleViewportEnter}
    >
      {/* Skill level badge */}
      <div className="absolute top-3 right-3 z-20">
        <div className={`min-w-[85px] px-2.5 py-1 bg-gradient-to-r ${skillLevel.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center shadow-lg`}>
          <span className="text-xs font-bold text-white whitespace-nowrap antialiased">{skillLevel.label}</span>
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        {/* Circular progress */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-4">
          {/* Outer glow effect */}
          <div className="absolute inset-0 rounded-full bg-accent/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              className="text-secondary-text/20"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
            {/* Progress circle */}
            <motion.circle
              className="text-accent"
              strokeWidth="6"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset: dashOffset }}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
          </svg>

          {/* Center content */}
          <div className="absolute flex flex-col items-center">
            <div className="transform transition-transform duration-300 group-hover:scale-110">
              <SkillIcon name={iconName} className={color} size={36} />
            </div>
          </div>

          {/* Percentage badge */}
          <div className="absolute -bottom-2 bg-primary-background border-2 border-accent/30 rounded-full px-3 py-1 shadow-lg">
            <motion.span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              {percentageText}
            </motion.span>
          </div>
        </div>

        {/* Skill name */}
        <h3 className="text-base font-bold text-primary-text group-hover:text-accent transition-colors duration-300 text-center">
          {name}
        </h3>

        {/* Progress bar */}
        <div className="w-full mt-3 h-1.5 bg-secondary-text/20 rounded-full overflow-hidden">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
          />
        </div>
      </div>
    </Card>
  );
});
SkillCard.displayName = 'SkillCard';

const Skills = () => {
  const { t } = useLocale();
  const sortedSkills = [...skillsData].sort((a, b) => b.percentage - a.percentage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const totalChars = t.skills.title.length + 1 + t.skills.titleHighlight.length;
  const descDelay = (totalChars * CHAR_DELAY + 200) / 1000;

  return (
    <section
      id="skills"
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <SectionHeader
          title={<Printer3DText text={t.skills.title} highlightText={t.skills.titleHighlight} />}
          description={t.skills.subtitle}
          descriptionDelay={descDelay}
        />

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {sortedSkills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
              iconName={skill.iconName}
              color={skill.color}
              index={index}
              levelLabels={t.skills.levels}
            />
          ))}
        </motion.div>

        {/* Stats section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            hoverEffect="scale"
            padding="lg"
            glowIntensity="light"
            className="flex-row items-center justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors duration-300">
                <Code2 className="w-7 h-7 text-accent" />
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  {sortedSkills.length}+
                </p>
                <p className="text-sm text-secondary-text font-medium">{t.skills.stats.technologies}</p>
              </div>
            </div>
          </Card>

          <Card
            hoverEffect="scale"
            padding="lg"
            glowIntensity="light"
            className="flex-row items-center justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors duration-300">
                <Zap className="w-7 h-7 text-accent" />
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  {Math.round(sortedSkills.reduce((acc, skill) => acc + skill.percentage, 0) / sortedSkills.length)}%
                </p>
                <p className="text-sm text-secondary-text font-medium">{t.skills.stats.average}</p>
              </div>
            </div>
          </Card>

          <Card
            hoverEffect="scale"
            padding="lg"
            glowIntensity="light"
            className="flex-row items-center justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
                <span className="text-white font-bold text-xl">&#9733;</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  {sortedSkills.filter(s => s.percentage >= 80).length}
                </p>
                <p className="text-sm text-secondary-text font-medium">{t.skills.stats.expert}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
