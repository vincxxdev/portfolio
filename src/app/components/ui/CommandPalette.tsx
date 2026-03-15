'use client';

import { type ComponentType, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, ExternalLink, Github, Linkedin, Mail, Search } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useSound } from '../hooks/useSound';

type ActionItem = {
  id: string;
  label: string;
  description: string;
  keywords: string;
  icon: ComponentType<{ className?: string }>;
  run: () => void;
};

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState(null, '', `#${sectionId}`);
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [shortcutLabel, setShortcutLabel] = useState('ctrl+k');
  const { playSound } = useSound();

  const actions: ActionItem[] = useMemo(
    () => [
      {
        id: 'about',
        label: 'Vai ad About',
        description: 'Bio, percorso e obiettivi professionali',
        keywords: 'about bio profilo chi sono',
        icon: Search,
        run: () => scrollToSection('about'),
      },
      {
        id: 'experience',
        label: 'Vai a Esperienze',
        description: 'Timeline di lavoro e certificazioni',
        keywords: 'esperienze carriera certificazioni timeline',
        icon: Search,
        run: () => scrollToSection('experience'),
      },
      {
        id: 'skills',
        label: 'Vai a Skills',
        description: 'Competenze tecniche e stack principale',
        keywords: 'skill competenze tecnologie stack',
        icon: Search,
        run: () => scrollToSection('skills'),
      },
      {
        id: 'projects',
        label: 'Vai a Progetti',
        description: 'Progetti selezionati con link live e codice',
        keywords: 'progetti portfolio github demo',
        icon: Search,
        run: () => scrollToSection('projects'),
      },
      {
        id: 'contacts',
        label: 'Vai a Contatti',
        description: 'Email, telefono e disponibilita',
        keywords: 'contatti email telefono recruiter',
        icon: Mail,
        run: () => scrollToSection('contacts'),
      },
      {
        id: 'github',
        label: 'Apri GitHub',
        description: 'Profilo GitHub in una nuova tab',
        keywords: 'github repository codice',
        icon: Github,
        run: () => window.open(siteConfig.social.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'linkedin',
        label: 'Apri LinkedIn',
        description: 'Profilo LinkedIn in una nuova tab',
        keywords: 'linkedin profilo lavoro',
        icon: Linkedin,
        run: () => window.open(siteConfig.social.linkedin, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'email',
        label: 'Scrivi una email',
        description: siteConfig.contact.email,
        keywords: 'mail contatto collaborazioni',
        icon: ExternalLink,
        run: () => {
          window.location.href = `mailto:${siteConfig.contact.email}`;
        },
      },
    ],
    []
  );

  const filteredActions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return actions;
    return actions.filter((item) => {
      const target = `${item.label} ${item.description} ${item.keywords}`.toLowerCase();
      return target.includes(normalized);
    });
  }, [actions, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, open]);

  useEffect(() => {
    setShortcutLabel(navigator.platform.includes('Mac') ? 'cmd+k' : 'ctrl+k');

    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
        playSound('pop');
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [playSound]);

  useEffect(() => {
    if (!open) return;

    const handleKeyNavigation = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(filteredActions.length, 1));
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + Math.max(filteredActions.length, 1)) % Math.max(filteredActions.length, 1));
      }

      if (event.key === 'Enter' && filteredActions[selectedIndex]) {
        event.preventDefault();
        filteredActions[selectedIndex].run();
        playSound('click');
        setOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyNavigation);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyNavigation);
    };
  }, [open, filteredActions, selectedIndex, playSound]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          playSound('pop');
        }}
        className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-secondary-text/25 bg-secondary-background/70 text-secondary-text hover:text-primary-text hover:border-accent/50 transition-colors duration-300"
        aria-label="Apri navigazione rapida"
      >
        <Command className="w-4 h-4" />
        <span className="text-xs font-semibold">Quick Nav</span>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-primary-background text-secondary-text border border-secondary-text/20">
          {shortcutLabel}
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] bg-primary-background/70 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="mx-auto mt-24 w-full max-w-2xl rounded-2xl border border-secondary-text/20 bg-secondary-background/95 shadow-2xl overflow-hidden"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-secondary-text/20">
                <Search className="w-4 h-4 text-accent" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cerca una sezione, social o azione..."
                  className="w-full bg-transparent outline-none text-primary-text placeholder:text-secondary-text text-sm"
                />
              </div>

              <div className="max-h-[50vh] overflow-y-auto p-2">
                {filteredActions.length === 0 ? (
                  <p className="px-3 py-6 text-sm text-secondary-text text-center">Nessun risultato per questa ricerca.</p>
                ) : (
                  filteredActions.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = index === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={() => {
                          item.run();
                          playSound('click');
                          setOpen(false);
                        }}
                        className={`w-full text-left rounded-xl px-3 py-3 transition-colors duration-200 ${
                          isActive ? 'bg-accent/15 border border-accent/30' : 'hover:bg-primary-background/60 border border-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 p-2 rounded-lg bg-primary-background/70 border border-secondary-text/20">
                            <Icon className="w-4 h-4 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-primary-text">{item.label}</p>
                            <p className="text-xs text-secondary-text mt-1">{item.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
