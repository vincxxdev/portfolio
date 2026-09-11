'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, Download, FileText, LoaderCircle } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useAdmin } from '@/app/components/providers/AdminProvider';
import { useLocale } from '@/i18n';
import { DUR, EASE_SNAP } from '../motion';
import Button from './Button';

interface DownloadCVButtonProps {
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

type CVType = 'standard' | 'simplified';

const DownloadCVButton = ({
  variant = 'primary',
  size = 'md',
  className = '',
}: DownloadCVButtonProps) => {
  const { isAdmin, isLoading } = useAdmin();
  const { t, locale } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const [generatingType, setGeneratingType] = useState<CVType | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const dropdownId = useId();
  const isGenerating = generatingType !== null;
  const iconOnly = variant === 'icon';
  const statusText = isGenerating
    ? generatingType === 'simplified' ? t.cv.generatingSimplified : t.cv.generating
    : '';

  useEffect(() => {
    if (!isDropdownOpen) return;

    optionsRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setIsDropdownOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        setIsDropdownOpen(false);
        dropdownRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isDropdownOpen]);

  const handleDownload = async (type: CVType) => {
    if (isLoading || isGenerating) return;
    setGeneratingType(type);
    setIsDropdownOpen(false);
    // Keep focus at the trigger when a dropdown option disappears.
    dropdownRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    try {
      if (type === 'standard') {
        const { generateCV } = await import('@/lib/generateCV');
        await generateCV(locale);
      } else {
        const { generateSimplifiedCV } = await import('@/lib/generateSimplifiedCV');
        await generateSimplifiedCV(locale);
      }
    } catch (error) {
      console.error('CV generation error:', error);
      alert(t.cv.error);
    } finally {
      setGeneratingType(null);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative inline-flex max-w-full ${className}`}>
      <Button
        variant={iconOnly ? 'outline' : variant}
        size={iconOnly ? 'icon' : size === 'md' ? 'default' : size}
        className={iconOnly ? undefined : 'w-full'}
        onClick={() => isAdmin ? setIsDropdownOpen((open) => !open) : void handleDownload('standard')}
        disabled={isLoading || isGenerating}
        aria-label={iconOnly ? t.cv.download : undefined}
        aria-busy={isGenerating || undefined}
        aria-expanded={isAdmin ? isDropdownOpen : undefined}
        aria-controls={isAdmin ? dropdownId : undefined}
        title={iconOnly ? t.cv.download : undefined}
      >
        {isGenerating
          ? <LoaderCircle aria-hidden="true" className={`h-4 w-4 ${shouldReduceMotion ? '' : 'animate-spin'}`} />
          : <Download aria-hidden="true" className="h-4 w-4" />}
        {/* Keep the visible label and icon slot stable while generating so
            adjacent actions never resize. Status is announced separately. */}
        {!iconOnly && <span>{t.cv.download}</span>}
        {isAdmin && !iconOnly && (
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform duration-(--dur-2) ${isDropdownOpen ? 'rotate-180' : ''}`} />
        )}
      </Button>
      <span role="status" aria-live="polite" className="sr-only">{statusText}</span>

      <AnimatePresence>
        {isAdmin && isDropdownOpen && (
          <motion.div
            ref={optionsRef}
            id={dropdownId}
            role="group"
            aria-label={t.cv.download}
            initial={shouldReduceMotion ? false : { y: 8 }}
            animate={{ y: 0 }}
            exit={shouldReduceMotion ? undefined : { y: 4 }}
            transition={{ duration: DUR.d2, ease: EASE_SNAP }}
            className="absolute left-0 top-full z-50 mt-2 w-max min-w-full max-w-[calc(100vw-var(--spacing)*10)] rounded-sm border border-hairline-strong bg-raised p-1 shadow-lifted"
          >
            {([
              ['standard', t.cv.download, t.cv.technicalCV],
              ['simplified', t.cv.downloadSimplified, t.cv.administrativeCV],
            ] as const).map(([type, label, description]) => (
              <Button
                key={type}
                variant="ghost"
                onClick={() => void handleDownload(type)}
                disabled={isGenerating}
                className="w-full justify-start px-3 text-left"
              >
                <FileText aria-hidden="true" className="h-4 w-4" />
                <span className="min-w-0">
                  <span className="block">{label}</span>
                  <span className="block text-xs font-normal">{description}</span>
                </span>
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DownloadCVButton;
