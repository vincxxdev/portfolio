import type { Skill } from '@/types';

export const skillsData: Skill[] = [
  { name: 'HTML', tier: 'core', group: 'web-markup', iconName: 'FaHtml5', color: 'text-orange-500' },
  { name: 'CSS', tier: 'core', group: 'web-markup', iconName: 'FaCss3', color: 'text-blue-500', aliases: ['Tailwind CSS'] },
  { name: 'JavaScript', tier: 'core', group: 'js-stack', iconName: 'FaJs', color: 'text-yellow-400' },
  { name: 'TypeScript', tier: 'core', group: 'js-stack', iconName: 'SiTypescript', color: 'text-blue-500' },
  { name: 'React', tier: 'core', group: 'js-stack', iconName: 'FaReact', color: 'text-cyan-400' },
  { name: 'Node.js', tier: 'core', group: 'js-stack', iconName: 'FaNodeJs', color: 'text-green-500', aliases: ['Express'] },
  { name: 'Git', tier: 'core', group: 'tools', iconName: 'FaGit', color: 'text-red-500', aliases: ['GitHub'] },
  { name: 'Java', tier: 'regular', group: 'languages', iconName: 'FaJava', color: 'text-orange-500' },
  { name: 'Python', tier: 'regular', group: 'languages', iconName: 'FaPython', color: 'text-blue-400' },
  { name: 'MySQL', tier: 'regular', group: 'database', iconName: 'SiMysql', color: 'text-purple-500' },
  { name: 'C', tier: 'occasional', group: 'languages', iconName: 'SiC', color: 'text-blue-600' },
  { name: 'C++', tier: 'occasional', group: 'languages', iconName: 'SiCplusplus', color: 'text-blue-700' },
];
