'use client';

import { skillsData } from '@/data/skills';
import SkillIcon from './ui/SkillIcon';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Code2, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SkillCardProps {
  name: string;
  percentage: number;
  iconName: string;
  color: string;
  index: number;
}

const SkillCard = ({ name, percentage, iconName, color, index }: SkillCardProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Add a slight random variation to make it more realistic (±1-2%)
  const [targetPercentage] = useState(() => {
    const variation = (Math.random() - 0.5) * 2; // Random between -1 and 1
    return Math.min(100, Math.max(0, percentage + variation));
  });
  
  // Animated counter for percentage
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayValue, setDisplayValue] = useState(0);

  // Trigger animation on mount/view
  const handleViewportEnter = () => {
    if (!hasAnimated) {
      setHasAnimated(true);
      animate(count, targetPercentage, {
        duration: 2,
        ease: "easeOut",
      });
    }
  };

  // Update display value
  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [rounded]);

  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (displayValue / 100) * circumference;

  const getSkillLevel = (percentage: number) => {
    if (percentage >= 80) return { label: 'Expert', color: 'from-green-500 to-emerald-500' };
    if (percentage >= 60) return { label: 'Advanced', color: 'from-blue-500 to-cyan-500' };
    if (percentage >= 40) return { label: 'Intermediate', color: 'from-yellow-500 to-orange-500' };
    return { label: 'Beginner', color: 'from-orange-500 to-red-500' };
  };

  const skillLevel = getSkillLevel(percentage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onViewportEnter={handleViewportEnter}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col items-center justify-center bg-secondary-background/50 backdrop-blur-lg p-6 rounded-2xl border border-secondary-text/20 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/20 hover:border-accent/40 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-2xl"></div>

      {/* Top corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Skill level badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className={`px-2 py-1 bg-gradient-to-r ${skillLevel.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <span className="text-[10px] font-bold text-white">{skillLevel.label}</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
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
            <circle
              className="text-accent transition-all duration-1000"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
              style={{
                filter: 'drop-shadow(0 0 8px currentColor)',
              }}
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
            <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              {displayValue}%
            </span>
          </div>
        </div>

        {/* Skill name */}
        <h3 className="text-base font-bold text-primary-text group-hover:text-accent transition-colors duration-300 text-center">
          {name}
        </h3>

        {/* Progress bar */}
        <div className="w-full mt-3 h-1.5 bg-secondary-text/20 rounded-full overflow-hidden">
          <motion.div
            style={{ width: `${displayValue}%` }}
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transition-all duration-300"
          />
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-text mb-4">
            Le mie <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Competenze</span>
          </h2>
          <p className="text-secondary-text text-lg max-w-2xl mx-auto">
            Tecnologie e linguaggi che utilizzo per creare soluzioni innovative
          </p>
        </motion.div>

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
            />
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="flex items-center justify-center gap-3 p-6 bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-accent/20 shadow-lg">
            <Code2 className="w-8 h-8 text-accent" />
            <div>
              <p className="text-2xl font-bold text-primary-text">{sortedSkills.length}+</p>
              <p className="text-sm text-secondary-text">Tecnologie</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 p-6 bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-accent/20 shadow-lg">
            <Zap className="w-8 h-8 text-accent" />
            <div>
              <p className="text-2xl font-bold text-primary-text">
                {Math.round(sortedSkills.reduce((acc, skill) => acc + skill.percentage, 0) / sortedSkills.length)}%
              </p>
              <p className="text-sm text-secondary-text">Media Competenze</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 p-6 bg-secondary-background/50 backdrop-blur-lg rounded-2xl border border-accent/20 shadow-lg">
            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg">
              <span className="text-white font-bold text-sm">★</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-text">
                {sortedSkills.filter(s => s.percentage >= 80).length}
              </p>
              <p className="text-sm text-secondary-text">Skill Esperte</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;