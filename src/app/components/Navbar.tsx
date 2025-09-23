'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Button from './ui/Button';
import { ThemeSwitcher } from './ThemeSwitcher';

const navLinks = [
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Progetti' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contatti' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 10);
        };
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

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${hasScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700/50' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                
                <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white transition-colors hover:text-cyan-400">
                    &lt;vincxxdev /&gt;
                </Link>

                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <Button key={link.href} href={link.href} variant="ghost">
                            {link.label}
                            </Button>
                        ))}
                    </div>
                    <ThemeSwitcher />
                    <Button href="#contact" variant="primary" size="sm">
                        Contattami
                    </Button>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
                    </button>
                </div>
                </div>
            </div>

            {/* Menu Mobile */}
            {isOpen && (
                <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center">
                    <button onClick={closeMenu} className="absolute top-7 right-4">
                        <X className="h-8 w-8 text-gray-900 dark:text-white" />
                    </button>
                    <div className="flex flex-col items-center space-y-6">
                        {navLinks.map((link) => (
                            <Button key={link.href} href={link.href} variant="ghost" onClick={closeMenu} className="text-2xl">
                                {link.label}
                            </Button>
                        ))}
                        <div className="mt-4">
                            <Button href="#contact" variant="primary" size="lg" onClick={closeMenu}>
                                Contattami
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;