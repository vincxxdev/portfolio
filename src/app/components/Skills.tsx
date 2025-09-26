'use client';

import { motion, Variants } from 'framer-motion';
import { skillsData } from '@/data/skills';
import SkillIcon from './ui/SkillIcon';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const SkillCard = ({ name, percentage, iconName, color }: { name: string, percentage: number, iconName: string, color: string }) => {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (percentage / 100) * circumference;

    return (
    <div className="flex flex-col items-center justify-center bg-secondary-background backdrop-blur-sm p-6 rounded-xl border border-secondary-text/20 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/20">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="absolute w-full h-full" viewBox="0 0 120 120">
          <circle
            className="text-secondary-text/50"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
          />
          <circle
            className="text-accent"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
            <SkillIcon name={iconName} className={color} />
            <span className="text-2xl font-bold text-primary-text mt-1">{percentage}%</span>
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold text-secondary-text">{name}</p>
    </div>
  );
};

const Skills = () => {
  return (
    <motion.section 
      id="skills" 
      className="py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary-text mb-12">
          Le mie Competenze
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {[...skillsData].sort((a, b) => b.percentage - a.percentage).map((skill) => (
            <SkillCard key={skill.name} name={skill.name} percentage={skill.percentage} iconName={skill.iconName} color={skill.color} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;