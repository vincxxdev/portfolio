'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { Locale, Translations } from './types';
import { it } from './locales/it';
import { en } from './locales/en';

const translations: Record<Locale, Translations> = { it, en };

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  isSwitching: boolean;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const OUT_DURATION = 80;

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [displayLocale, setDisplayLocale] = useState<Locale>('it');
  const [isSwitching, setIsSwitching] = useState(false);
  const pendingRef = useRef<Locale | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved && (saved === 'it' || saved === 'en')) {
      setDisplayLocale(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === displayLocale || isSwitching) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setDisplayLocale(newLocale);
      localStorage.setItem('locale', newLocale);
      document.documentElement.lang = newLocale;
      return;
    }

    pendingRef.current = newLocale;
    setIsSwitching(true);

    timerRef.current = setTimeout(() => {
      const target = pendingRef.current;
      if (!target) return;

      setDisplayLocale(target);
      localStorage.setItem('locale', target);
      document.documentElement.lang = target;

      timerRef.current = setTimeout(() => {
        setIsSwitching(false);
        pendingRef.current = null;
      }, 0);
    }, OUT_DURATION);
  }, [displayLocale, isSwitching]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <LocaleContext.Provider
      value={{ locale: displayLocale, setLocale, t: translations[displayLocale], isSwitching }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
