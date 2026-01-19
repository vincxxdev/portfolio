'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DownloadCVButtonProps {
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

type CVType = 'standard' | 'simplified';

const DownloadCVButton: React.FC<DownloadCVButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  className = '' 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [generatingType, setGeneratingType] = useState<CVType | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownload = async (type: CVType) => {
    setIsGenerating(true);
    setGeneratingType(type);
    setIsDropdownOpen(false);
    
    try {
      if (type === 'standard') {
        const { generateCV } = await import('@/lib/generateCV');
        await generateCV();
      } else {
        const { generateSimplifiedCV } = await import('@/lib/generateSimplifiedCV');
        await generateSimplifiedCV();
      }
    } catch (error) {
      console.error('Errore durante la generazione del CV:', error);
      alert('Si è verificato un errore durante la generazione del CV. Riprova.');
    } finally {
      setIsGenerating(false);
      setGeneratingType(null);
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

  // Dropdown menu styles - z-[9999] ensures it appears above all other content including Hero
  const dropdownStyles = "absolute top-full left-0 mt-2 w-full min-w-[220px] bg-secondary-background border border-accent/30 rounded-lg shadow-2xl overflow-hidden z-[9999]";
  const dropdownItemStyles = "w-full px-4 py-3 text-left text-primary-text hover:bg-accent/20 transition-colors duration-200 flex items-center gap-2";

  if (variant === 'icon') {
    return (
      <div className="relative" ref={dropdownRef}>
        <motion.button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={isGenerating}
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Scarica CV"
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

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={dropdownStyles}
            >
              <button
                onClick={() => handleDownload('standard')}
                disabled={isGenerating}
                className={dropdownItemStyles}
              >
                <FileText className="w-4 h-4 text-accent" />
                <span>Scarica CV</span>
              </button>
              <button
                onClick={() => handleDownload('simplified')}
                disabled={isGenerating}
                className={`${dropdownItemStyles} border-t border-accent/20`}
              >
                <FileText className="w-4 h-4 text-accent" />
                <span>Scarica CV Semplificato</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
            <span>
              {generatingType === 'simplified' ? 'Generazione Semplificato...' : 'Generazione...'}
            </span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Scarica CV</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={dropdownStyles}
          >
            <button
              onClick={() => handleDownload('standard')}
              disabled={isGenerating}
              className={dropdownItemStyles}
            >
              <FileText className="w-4 h-4 text-accent" />
              <div className="flex flex-col items-start">
                <span className="font-semibold">Scarica CV</span>
                <span className="text-xs text-muted-foreground opacity-70">CV tecnico completo</span>
              </div>
            </button>
            <button
              onClick={() => handleDownload('simplified')}
              disabled={isGenerating}
              className={`${dropdownItemStyles} border-t border-accent/20`}
            >
              <FileText className="w-4 h-4 text-accent" />
              <div className="flex flex-col items-start">
                <span className="font-semibold">Scarica CV Semplificato</span>
                <span className="text-xs text-muted-foreground opacity-70">Per posizioni amministrative</span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DownloadCVButton;
