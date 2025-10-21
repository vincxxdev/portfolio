'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import { ThemeSwitcher } from './ThemeSwitcher';
import { SoundToggle } from './ui/SoundToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './hooks/useSound';
import DownloadCVButton from './ui/DownloadCVButton';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const Navbar = () => {
    const t = useTranslations('nav');
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [easterEgg, setEasterEgg] = useState(false);
    const [logoClicks, setLogoClicks] = useState(0);
    const { playSound } = useSound();

    const navLinks = [
      { href: '#about', label: t('about') },
      { href: '#experience', label: t('experience') },
      { href: '#skills', label: t('skills') },
      { href: '#projects', label: t('projects') },
      { href: '#contacts', label: t('contacts') },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 10);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
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

    // Easter egg: 5 clicks on logo
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
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            hasScrolled 
                ? 'bg-secondary-background/80 backdrop-blur-lg border-b border-secondary-text/20 shadow-lg shadow-accent/5' 
                : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                
                <div className="relative">
                    <Link 
                        href="/" 
                        onClick={handleLogoClick}
                        className="group text-2xl font-bold text-primary-text transition-all duration-300 hover:scale-105 cursor-pointer relative inline-block"
                    >
                        <span className={`bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-500 transition-all duration-300 ${easterEgg ? 'animate-bounce' : ''}`}>
                            &lt;vincxxdev /&gt;
                        </span>
                    </Link>
                    
                    {/* Easter egg sparkles */}
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

                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <Button key={link.href} href={link.href} variant="ghost">
                            {link.label}
                            </Button>
                        ))}
                    </div>
                    <div className="h-6 w-px bg-secondary-text/20"></div>
                    <div className="flex items-center gap-2">
                        <DownloadCVButton variant="icon" />
                        <LanguageSwitcher />
                        <SoundToggle />
                        <ThemeSwitcher />
                    </div>
                </div>

                <div className="md:hidden flex items-center gap-3">
                    <SoundToggle />
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={t('openMenu')}
                        aria-expanded={isOpen}
                        className="p-2 rounded-lg hover:bg-accent/10 transition-colors duration-300"
                    >
                        <Menu className="h-6 w-6 text-primary-text" />
                    </button>
                </div>
                </div>
            </div>

            {/* Menu Mobile */}
            {isOpen && (
                <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-primary-background/95 backdrop-blur-lg flex flex-col items-center justify-center animate-fade-in">
                    {/* Background decorative elements */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                    
                    <button 
                        onClick={closeMenu} 
                        className="absolute top-7 right-4 p-2 rounded-lg hover:bg-accent/10 transition-colors duration-300 z-10"
                        aria-label={t('closeMenu')}
                    >
                        <X className="h-8 w-8 text-primary-text" />
                    </button>
                    
                    <div className="flex flex-col items-center space-y-6 relative z-10">
                        {navLinks.map((link, index) => (
                            <div 
                                key={link.href}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <Button 
                                    href={link.href} 
                                    variant="ghost" 
                                    onClick={closeMenu} 
                                    className="text-2xl font-semibold hover:text-accent transition-colors duration-300"
                                >
                                    {link.label}
                                </Button>
                            </div>
                        ))}
                        
                        {/* Download CV button in mobile menu */}
                        <div 
                            className="animate-fade-in mt-4"
                            style={{ animationDelay: `${navLinks.length * 0.1}s` }}
                        >
                            <DownloadCVButton variant="primary" size="md" />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;