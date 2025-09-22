'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

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

    // Impedisce lo scroll del corpo quando il menu mobile è aperto
    useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    }, [isOpen]);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${hasScrolled ? 'bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-white transition-colors hover:text-cyan-400">
                &lt;vincxxdev /&gt;
            </Link>

            {/* Link di Navigazione (Desktop) */}
            <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                    {link.label}
                </a>
                ))}
            </div>

            {/* Bottone CTA (Desktop) */}
            <div className="hidden md:block">
                <a href="#contact" className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors duration-300">
                Contattami
                </a>
            </div>

            {/* Bottone Hamburger (Mobile) */}
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                <Menu className="h-6 w-6 text-white" />
                </button>
            </div>
            </div>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
            <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-gray-900 flex flex-col items-center justify-center">
                <button onClick={() => setIsOpen(false)} className="absolute top-7 right-4">
                    <X className="h-8 w-8 text-white" />
                </button>
                <div className="flex flex-col items-center space-y-8">
                    {navLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-2xl text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                        {link.label}
                    </a>
                    ))}
                    <a href="#contact" onClick={() => setIsOpen(false)} className="mt-6 bg-cyan-500 text-white px-6 py-3 rounded-md hover:bg-cyan-600 transition-colors duration-300">
                        Contattami
                    </a>
                </div>
            </div>
        )}
        </nav>
    );
}

export default Navbar;