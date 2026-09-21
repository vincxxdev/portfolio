import type { Skill } from '@/types';

export const skillsData: Skill[] = [
  { name: 'HTML', tier: 'core', group: 'web-markup', iconName: 'FaHtml5' },
  { name: 'CSS', tier: 'core', group: 'web-markup', iconName: 'FaCss3', aliases: ['Tailwind CSS'] },
  { name: 'JavaScript', tier: 'core', group: 'js-stack', iconName: 'FaJs' },
  { name: 'TypeScript', tier: 'core', group: 'js-stack', iconName: 'SiTypescript' },
  { name: 'React', tier: 'core', group: 'js-stack', iconName: 'FaReact' },
  { name: 'Node.js', tier: 'core', group: 'js-stack', iconName: 'FaNodeJs', aliases: ['Express'] },
  { name: 'Git', tier: 'core', group: 'tools', iconName: 'FaGit', aliases: ['GitHub'] },
  { name: 'Java', tier: 'regular', group: 'languages', iconName: 'FaJava' },
  { name: 'Python', tier: 'regular', group: 'languages', iconName: 'FaPython' },
  { name: 'MySQL', tier: 'regular', group: 'database', iconName: 'SiMysql' },
  { name: 'C', tier: 'occasional', group: 'languages', iconName: 'SiC' },
  { name: 'C++', tier: 'occasional', group: 'languages', iconName: 'SiCplusplus' },
];
