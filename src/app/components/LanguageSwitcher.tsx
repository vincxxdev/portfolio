'use client';

import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const locales = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = params.locale as string;

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="p-2.5 rounded-lg hover:bg-accent/10 transition-all duration-300 disabled:opacity-50"
        aria-label="Change language"
        title="Change language"
      >
        <Languages className={`h-5 w-5 text-primary-text ${isPending ? 'animate-spin' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 bg-secondary-background border border-secondary-text/20 rounded-lg shadow-xl z-50 overflow-hidden"
            >
              {locales.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => onSelectChange(locale.code)}
                  className={`w-full px-4 py-3 text-left hover:bg-accent/10 transition-colors duration-200 flex items-center gap-3 ${
                    currentLocale === locale.code
                      ? 'bg-accent/5 text-accent font-semibold'
                      : 'text-primary-text'
                  }`}
                >
                  <span className="text-2xl">{locale.flag}</span>
                  <span>{locale.name}</span>
                  {currentLocale === locale.code && (
                    <span className="ml-auto text-accent">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
