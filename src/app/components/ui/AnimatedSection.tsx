"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // Initial state: invisible and 30px lower
      whileInView={{ opacity: 1, y: 0 }} // Final state: visible and in original position
      viewport={{ once: true, margin: "0px 0px -100px 0px" }} // Start animation early
      transition={{ duration: 0.5, ease: "easeOut" }} // Reduced from 0.8 to 0.5
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
