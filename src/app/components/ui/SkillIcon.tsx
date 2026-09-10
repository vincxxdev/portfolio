'use client';

import {
  FaCss3, FaGit, FaHtml5, FaJava, FaJs, FaNodeJs, FaPython, FaReact
} from 'react-icons/fa';
import { SiTypescript, SiC, SiCplusplus, SiMysql } from 'react-icons/si';
import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  FaJava,
  SiC,
  FaJs,
  SiTypescript,
  FaPython,
  SiCplusplus,
  FaReact,
  FaHtml5,
  FaCss3,
  FaNodeJs,
  FaGit,
  SiMysql,
};

const SkillIcon = ({ name, size = 40, className }: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  // react-icons stamps role="img" on the svg, which axe then demands an
  // accessible name for. The name is always the visible label sitting next to
  // it, so the mark is decorative and takes itself out of the tree instead.
  return (
    <IconComponent size={size} className={className} aria-hidden="true" focusable="false" />
  );
};

export default SkillIcon;
