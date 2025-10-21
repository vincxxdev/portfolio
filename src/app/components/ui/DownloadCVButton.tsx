'use client';

import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface DownloadCVButtonProps {
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const DownloadCVButton: React.FC<DownloadCVButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  className = '' 
}) => {
  const t = useTranslations('nav');
  const params = useParams();
  const locale = (params.locale as string) || 'it';
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
        // Dynamic import of the CV generation function
        const { generateCV } = await import('@/lib/generateCV');
      
        // Generate and download the CV with current locale
        generateCV(locale);
    } catch (error) {
      console.error('Errore durante la generazione del CV:', error);
      alert('Si è verificato un errore durante la generazione del CV. Riprova.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Base styles for the button
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  // Styles for different variants
  const variantStyles = {
    primary: "bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-700 shadow-lg hover:shadow-xl hover:shadow-cyan-400/50",
    secondary: "bg-secondary-background text-primary-text border-2 border-accent hover:bg-accent hover:text-white shadow-md hover:shadow-lg",
    icon: "bg-secondary-background/80 backdrop-blur-sm text-primary-text hover:bg-accent hover:text-white p-2 rounded-full shadow-md hover:shadow-lg"
  };

  // Size styles
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  if (variant === 'icon') {
    return (
      <motion.button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={t('downloadCV')}
      >
        {isGenerating ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FileText className="w-5 h-5" />
          </motion.div>
        ) : (
          <Download className="w-5 h-5" />
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleDownload}
      disabled={isGenerating}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isGenerating ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FileText className="w-5 h-5" />
          </motion.div>
          <span>{t('generating')}</span>
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          <span>{t('downloadCV')}</span>
        </>
      )}
    </motion.button>
  );
};

export default DownloadCVButton;
