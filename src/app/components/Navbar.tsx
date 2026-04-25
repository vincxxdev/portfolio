'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import { ThemeSwitcher } from './ThemeSwitcher';
import { SoundToggle } from './ui/SoundToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './hooks/useSound';
import DownloadCVButton from './ui/DownloadCVButton';
import { useLocale } from '@/i18n';
import { siteConfig } from '@/config/site';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [easterEgg, setEasterEgg] = useState(false);
    const [logoClicks, setLogoClicks] = useState(0);
    const { playSound } = useSound();
    const { t } = useLocale();

    const navLinks = [
      { href: '#about', label: t.nav.about },
      { href: '#experience', label: t.nav.experience },
      { href: '#skills', label: t.nav.skills },
      { href: '#projects', label: t.nav.projects },
      { href: '#contacts', label: t.nav.contacts },
    ];

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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        playSound('click');
        const newClicks = logoClicks + 1;
        setLogoClicks(newClicks);

        if (newClicks === 5) {
            setEasterEgg(true);
            playSound('success');
            setTimeout(() => {
                setEasterEgg(false);
                setLogoClicks(0);
            }, 3000);
        } else if (newClicks > 5) {
            setLogoClicks(0);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
            hasScrolled
                ? 'bg-primary-background/80 backdrop-blur-lg border-b border-secondary-text/10 shadow-lg shadow-accent/5'
                : 'bg-transparent'
        }`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                <div className="relative">
                    <Link
                        href="/"
                        onClick={handleLogoClick}
                        className="group flex items-center gap-2.5 transition-all duration-300"
                    >
                        <span className={`h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)] transition-all duration-300 group-hover:shadow-[0_0_20px_var(--color-accent)] ${easterEgg ? 'animate-bounce' : ''}`} />
                        <span className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-text/90 transition-colors duration-300 group-hover:text-accent">
                            {siteConfig.name}
                        </span>
                    </Link>

                    <AnimatePresence>
                        {easterEgg && (
                            <>
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute"
                                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0, 1, 0],
                                            x: Math.cos((i * Math.PI) / 3) * 40,
                                            y: Math.sin((i * Math.PI) / 3) * 40,
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        style={{ left: '50%', top: '50%' }}
                                    >
                                        <Sparkles className="w-4 h-4 text-accent" />
                                    </motion.div>
                                ))}
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Button key={link.href} href={link.href} variant="nav" size="nav">
                                {link.label}
                            </Button>
                        ))}
                    </div>
                    <div className="h-5 w-px bg-gradient-to-b from-transparent via-secondary-text/20 to-transparent" />
                    <div className="flex items-center gap-2">
                        <DownloadCVButton variant="icon" />
                        <SoundToggle />
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                    </div>
                </div>

                <div className="md:hidden flex items-center gap-3">
                    <SoundToggle />
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={t.nav.openMenu}
                        aria-expanded={isOpen}
                        className="p-2 rounded-lg hover:bg-accent/10 transition-colors duration-300"
                    >
                        <Menu className="h-6 w-6 text-primary-text" />
                    </button>
                </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed inset-0 bg-primary-background/95 backdrop-blur-lg flex flex-col items-center justify-center"
                    >
                        <div
                            className="absolute inset-0 opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(to right, rgba(100, 116, 139, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.18) 1px, transparent 1px)',
                                backgroundSize: '72px 72px',
                            }}
                        />
                        <div className="absolute inset-y-0 left-6 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent opacity-50" />
                        <div className="absolute inset-y-0 right-6 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent opacity-40" />

                        <button
                            onClick={closeMenu}
                            className="absolute top-7 right-4 p-2 rounded-lg hover:bg-accent/10 transition-colors duration-300 z-10"
                            aria-label={t.nav.closeMenu}
                        >
                            <X className="h-8 w-8 text-primary-text" />
                        </button>

                        <div className="flex flex-col items-center gap-8 relative z-10">
                            {navLinks.map((link, index) => (
                                <Button
                                    key={link.href}
                                    href={link.href}
                                    variant="nav"
                                    size="nav"
                                    onClick={closeMenu}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className="text-sm tracking-[0.34em]"
                                >
                                    {link.label}
                                </Button>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: navLinks.length * 0.08 }}
                                className="mt-4"
                            >
                                <DownloadCVButton variant="primary" size="md" />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
