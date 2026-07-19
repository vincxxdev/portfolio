'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import { ThemeSwitcher } from './ThemeSwitcher';
import { SoundToggle } from './ui/SoundToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import DownloadCVButton from './ui/DownloadCVButton';
import { useSound } from './hooks/useSound';
import { useLocale } from '@/i18n';
import { siteConfig } from '@/config/site';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { playSound } = useSound();
  const { t } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/work', label: t.nav.work },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setHasScrolled(window.scrollY > 10);
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Restore the exact prior value rather than forcing 'auto' — the Loader also
  // owns body overflow during the intro and would otherwise be clobbered.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Escape to dismiss, Tab cycles inside the overlay, focus returns to the toggle.
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const overlay = overlayRef.current;
    overlay?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== 'Tab' || !overlay) return;

      const focusable = [...overlay.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const linkClass = (active: boolean) =>
    `label-mono px-3 py-2 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] ${
      active ? 'text-signal-ink' : 'text-ink-2 hover:text-ink'
    }`;

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-[background-color,border-color] duration-[260ms] ease-[cubic-bezier(0.2,0,0,1)] ${
        hasScrolled ? 'border-b border-hairline bg-canvas/90 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-18 items-center justify-between py-4">
          <Link
            href="/"
            onClick={() => playSound('click')}
            className="group flex items-center gap-2.5"
            aria-label={t.nav.homeAria}
          >
            <span className="h-1.5 w-1.5 shrink-0 bg-signal" />
            <span className="label-mono text-ink transition-colors duration-[180ms] group-hover:text-signal-ink">
              {siteConfig.name}
            </span>
          </Link>

          <div className="hidden items-center gap-5 min-[820px]:flex">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => playSound('click')}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={linkClass(isActive(link.href))}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <span aria-hidden="true" className="h-4 w-px bg-hairline" />

            <div className="flex items-center gap-1.5">
              <DownloadCVButton variant="icon" />
              <SoundToggle />
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>

          <div className="flex items-center gap-2 min-[820px]:hidden">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label={t.nav.openMenu}
              aria-expanded={isOpen}
              className="p-2 text-ink transition-colors duration-[180ms] hover:text-signal-ink"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.openMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: [0.2, 0, 0, 1] }}
            className="fixed inset-0 overflow-y-auto overscroll-contain bg-canvas min-[820px]:hidden"
          >
            <div className="flex min-h-full flex-col px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="label-mono text-ink-3">{siteConfig.name}</span>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label={t.nav.closeMenu}
                  className="p-2 text-ink transition-colors duration-[180ms] hover:text-signal-ink"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-14 flex flex-col border-t border-hairline">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      playSound('click');
                      closeMenu();
                    }}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`flex items-center justify-between border-b border-hairline py-5 text-2xl transition-colors duration-[180ms] ${
                      isActive(link.href) ? 'text-signal-ink' : 'text-ink hover:text-signal-ink'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-3 pb-4">
                <DownloadCVButton variant="secondary" size="md" />
                <SoundToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
