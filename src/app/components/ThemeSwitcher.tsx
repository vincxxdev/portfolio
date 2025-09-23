'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Non reindirizziamo nulla sul server per evitare hydration mismatch
    return <div className="h-9 w-9" />;
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:ring-2 ring-cyan-500 transition-all"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      
      <Sun className={`h-5 w-5 text-slate-800 ${theme === 'light' ? 'block' : 'hidden'}`} />

      <Moon className={`h-5 w-5 text-slate-200 ${theme === 'dark' ? 'block' : 'hidden'}`} />
    </button>
  );
};