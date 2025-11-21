"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-kmff-dark shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Section - Dual Branding */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-4">
                        {/* KMFF Logo */}
                        <div className="flex items-center gap-2">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white">
                                <Image
                                    src="/kmff-logo.jpg"
                                    alt="KMFF Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="hidden xl:flex flex-col">
                                <span className="font-bold text-white text-sm leading-tight">KMFF</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-8 w-px bg-gray-700"></div>

                        {/* ҚЛЛF Logo */}
                        <div className="kllf-logo-container">
                            <div className="relative h-6 w-auto">
                                <Image
                                    src="/kllf-logo-cropped.png"
                                    alt="ҚЛЛF Logo"
                                    width={90}
                                    height={24}
                                    className="object-contain brightness-0 invert"
                                />
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/news" className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:-translate-y-0.5">
                            Новости
                        </Link>
                        <Link href="/matches" className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:-translate-y-0.5">
                            Матчи
                        </Link>
                        <Link href="/tournaments" className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:-translate-y-0.5">
                            Турниры
                        </Link>
                        <Link href="/about" className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:-translate-y-0.5">
                            О нас
                        </Link>
                        <a href="https://minifootball.eu/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:-translate-y-0.5">
                            EMF
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-white p-2">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-kmff-dark border-t border-gray-800 shadow-lg py-4 px-4 flex flex-col gap-4">
                    <Link href="/news" className="text-gray-300 hover:text-white font-medium py-2 border-b border-gray-800" onClick={() => setIsMenuOpen(false)}>
                        Новости
                    </Link>
                    <Link href="/matches" className="text-gray-300 hover:text-white font-medium py-2 border-b border-gray-800" onClick={() => setIsMenuOpen(false)}>
                        Матчи
                    </Link>
                    <Link href="/tournaments" className="text-gray-300 hover:text-white font-medium py-2 border-b border-gray-800" onClick={() => setIsMenuOpen(false)}>
                        Турниры
                    </Link>
                    <Link href="/about" className="text-gray-300 hover:text-white font-medium py-2 border-b border-gray-800" onClick={() => setIsMenuOpen(false)}>
                        О нас
                    </Link>
                    <a href="https://minifootball.eu/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                        EMF
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
