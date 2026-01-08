"use client";

import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useOrganization } from '@/contexts/OrganizationContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const { selectedOrganization, organizations, isLoading } = useOrganization();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-mono-100 sticky top-0 z-50 border-b-2 border-mono-0">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Brutally Minimal: Text Only */}
                    <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-70">
                        <h1 className="font-display text-2xl font-bold tracking-tight text-mono-0">
                            КФМФ
                        </h1>
                    </Link>

                    {/* Desktop Navigation - Uppercase Monospace */}
                    <div className="hidden md:flex items-center gap-8">
                        <nav className="flex items-center gap-6">
                            <Link
                                href="/news"
                                className="font-mono text-micro uppercase tracking-widest text-mono-0 transition-opacity hover:opacity-70"
                            >
                                Новости
                            </Link>
                            <Link
                                href="/matches"
                                className="font-mono text-micro uppercase tracking-widest text-mono-0 transition-opacity hover:opacity-70"
                            >
                                Матчи
                            </Link>
                            <Link
                                href="/tournaments"
                                className="font-mono text-micro uppercase tracking-widest text-mono-0 transition-opacity hover:opacity-70"
                            >
                                Турниры
                            </Link>
                            <Link
                                href="/hall-of-fame"
                                className="font-mono text-micro uppercase tracking-widest text-mono-0 transition-opacity hover:opacity-70"
                            >
                                Зал славы
                            </Link>
                            <Link
                                href="/about"
                                className="font-mono text-micro uppercase tracking-widest text-mono-0 transition-opacity hover:opacity-70"
                            >
                                О нас
                            </Link>
                            <a
                                href="https://minifootball.eu/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-micro uppercase tracking-widest text-mono-0 transition-opacity hover:opacity-70"
                            >
                                EMF
                            </a>
                        </nav>

                        {/* City Selector - 2px Border Box */}
                        <div className="relative">
                            {isLoading ? (
                                <div className="w-32 h-10 bg-mono-90 animate-pulse"></div>
                            ) : (
                                <button
                                    onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-2 border-2 border-mono-0 transition-opacity hover:opacity-70"
                                >
                                    <span className="font-mono text-micro uppercase tracking-wider text-mono-0">
                                        {selectedOrganization?.name || 'Город'}
                                    </span>
                                    <ChevronDown className={`w-3 h-3 text-mono-0 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                            )}

                            {/* Dropdown - Sharp Borders, Lime Active State */}
                            {isCityDropdownOpen && (
                                <div className="absolute top-full mt-2 right-0 bg-mono-0 border-2 border-mono-100 py-1 min-w-[200px] z-50">
                                    {organizations && organizations.length > 0 ? (
                                        organizations.map((org) => (
                                            <Link
                                                key={org.slug}
                                                href={`/${org.slug}`}
                                                onClick={() => setIsCityDropdownOpen(false)}
                                                className={`block w-full text-left px-4 py-2 font-mono text-micro uppercase transition-colors ${
                                                    selectedOrganization?.slug === org.slug
                                                        ? 'bg-accent-lime text-mono-100'
                                                        : 'text-mono-100 hover:bg-mono-5'
                                                }`}
                                            >
                                                {org.name}
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="px-4 py-3 font-mono text-micro text-mono-100 text-center">
                                            Нет городов
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        {isLoading ? (
                            <div className="w-20 h-8 bg-mono-90 animate-pulse"></div>
                        ) : (
                            <button
                                onClick={toggleMenu}
                                className="px-3 py-1.5 border-2 border-mono-0 font-mono text-xs text-mono-0 uppercase"
                            >
                                <span className="max-w-[80px] truncate">{selectedOrganization?.name || 'Город'}</span>
                            </button>
                        )}

                        <button
                            onClick={toggleMenu}
                            className="text-mono-0 p-1 transition-opacity hover:opacity-70"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay - Brutally Minimal */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-mono-100 border-t-2 border-mono-0 py-4 px-4 flex flex-col gap-2">
                    <div className="pb-4 mb-2 border-b-2 border-mono-0">
                        <p className="text-mono-0 font-mono text-xs mb-3 uppercase tracking-wider px-2">
                            Город
                        </p>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                            {organizations.map((org) => (
                                <Link
                                    key={org.slug}
                                    href={`/${org.slug}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`px-3 py-2 border-2 font-mono text-xs uppercase transition-colors truncate ${
                                        selectedOrganization?.slug === org.slug
                                            ? 'bg-accent-lime border-mono-100 text-mono-100'
                                            : 'border-mono-0 text-mono-0 hover:opacity-70'
                                    }`}
                                >
                                    {org.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link
                        href="/news"
                        className="text-mono-0 font-mono text-sm uppercase py-2.5 px-2 transition-opacity hover:opacity-70"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Новости
                    </Link>
                    <Link
                        href="/matches"
                        className="text-mono-0 font-mono text-sm uppercase py-2.5 px-2 transition-opacity hover:opacity-70"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Матчи
                    </Link>
                    <Link
                        href="/tournaments"
                        className="text-mono-0 font-mono text-sm uppercase py-2.5 px-2 transition-opacity hover:opacity-70"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Турниры
                    </Link>
                    <Link
                        href="/hall-of-fame"
                        className="text-mono-0 font-mono text-sm uppercase py-2.5 px-2 transition-opacity hover:opacity-70"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Зал славы
                    </Link>
                    <Link
                        href="/about"
                        className="text-mono-0 font-mono text-sm uppercase py-2.5 px-2 transition-opacity hover:opacity-70"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        О нас
                    </Link>
                    <a
                        href="https://minifootball.eu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-mono-0 font-mono text-sm uppercase py-2.5 px-2 transition-opacity hover:opacity-70"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        EMF
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
