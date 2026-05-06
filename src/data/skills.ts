import type { Skill } from '@/types';

export const skillsData: Skill[] = [
  { name: 'TypeScript', tier: 'core', iconName: 'SiTypescript', color: 'text-blue-500' },
  { name: 'JavaScript', tier: 'core', iconName: 'FaJs', color: 'text-yellow-400' },
  { name: 'React', tier: 'core', iconName: 'FaReact', color: 'text-cyan-400' },
  { name: 'Node.js', tier: 'core', iconName: 'FaNodeJs', color: 'text-green-500', aliases: ['Express'] },
  { name: 'HTML', tier: 'core', iconName: 'FaHtml5', color: 'text-orange-500' },
  { name: 'CSS', tier: 'core', iconName: 'FaCss3', color: 'text-blue-500', aliases: ['Tailwind CSS'] },
  { name: 'Git', tier: 'core', iconName: 'FaGit', color: 'text-red-500', aliases: ['GitHub'] },
  { name: 'Java', tier: 'regular', iconName: 'FaJava', color: 'text-orange-500' },
  { name: 'Python', tier: 'regular', iconName: 'FaPython', color: 'text-blue-400' },
  { name: 'MySQL', tier: 'regular', iconName: 'SiMysql', color: 'text-purple-500' },
  { name: 'C', tier: 'occasional', iconName: 'SiC', color: 'text-blue-600' },
  { name: 'C++', tier: 'occasional', iconName: 'SiCplusplus', color: 'text-blue-700' },
];
