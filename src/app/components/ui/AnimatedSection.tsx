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
      initial={{ opacity: 0, y: 50 }} // Stato iniziale: invisibile e 50px più in basso
      whileInView={{ opacity: 1, y: 0 }} // Stato finale: visibile e nella sua posizione originale
      viewport={{ once: true }} // L'animazione avviene solo una volta
      transition={{ duration: 0.8, ease: "easeOut" }} // Durata e tipo di transizione
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
