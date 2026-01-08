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
        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-200 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Minimalist */}
                    <Link href="/" className="flex-shrink-0 transition-colors hover:text-primary-600">
                        <h1 className="font-display text-2xl font-bold tracking-tight text-neutral-900">
                            КФМФ
                        </h1>
                    </Link>

                    {/* Desktop Navigation - Minimalist */}
                    <div className="hidden md:flex items-center gap-8">
                        <nav className="flex items-center gap-6">
                            <Link
                                href="/news"
                                className="font-display text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
                            >
                                Новости
                            </Link>
                            <Link
                                href="/matches"
                                className="font-display text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
                            >
                                Матчи
                            </Link>
                            <Link
                                href="/tournaments"
                                className="font-display text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
                            >
                                Турниры
                            </Link>
                            <Link
                                href="/hall-of-fame"
                                className="font-display text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
                            >
                                Зал славы
                            </Link>
                            <Link
                                href="/about"
                                className="font-display text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
                            >
                                О нас
                            </Link>
                            <a
                                href="https://minifootball.eu/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-display text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
                            >
                                EMF
                            </a>
                        </nav>

                        {/* City Selector - Rounded */}
                        <div className="relative">
                            {isLoading ? (
                                <div className="w-32 h-10 bg-neutral-200 animate-pulse rounded-lg"></div>
                            ) : (
                                <button
                                    onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 bg-white shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <span className="font-display text-sm font-medium text-neutral-700">
                                        {selectedOrganization?.name || 'Город'}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-neutral-600 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                            )}

                            {/* Dropdown - Rounded, Blue Active State */}
                            {isCityDropdownOpen && (
                                <div className="absolute top-full mt-2 right-0 bg-white border border-neutral-200 shadow-xl rounded-lg py-1 min-w-[200px] z-50">
                                    {organizations && organizations.length > 0 ? (
                                        organizations.map((org) => (
                                            <Link
                                                key={org.slug}
                                                href={`/${org.slug}`}
                                                onClick={() => setIsCityDropdownOpen(false)}
                                                className={`block w-full text-left px-4 py-2 font-display text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                                                    selectedOrganization?.slug === org.slug
                                                        ? 'bg-primary-50 text-primary-700 font-medium'
                                                        : 'text-neutral-700 hover:bg-neutral-50'
                                                }`}
                                            >
                                                {org.name}
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="px-4 py-3 font-display text-sm text-neutral-600 text-center">
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
                            <div className="w-20 h-8 bg-neutral-200 animate-pulse rounded"></div>
                        ) : (
                            <button
                                onClick={toggleMenu}
                                className="px-3 py-1.5 rounded border border-neutral-300 font-display text-xs text-neutral-700 font-medium"
                            >
                                <span className="max-w-[80px] truncate">{selectedOrganization?.name || 'Город'}</span>
                            </button>
                        )}

                        <button
                            onClick={toggleMenu}
                            className="text-neutral-700 p-1 transition-colors hover:text-primary-600"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay - Minimalist */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-neutral-200 shadow-lg py-4 px-4 flex flex-col gap-2">
                    <div className="pb-4 mb-2 border-b border-neutral-200">
                        <p className="text-neutral-600 font-display text-xs mb-3 font-medium px-2">
                            Город
                        </p>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                            {organizations.map((org) => (
                                <Link
                                    key={org.slug}
                                    href={`/${org.slug}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`px-3 py-2 rounded border font-display text-xs transition-colors truncate ${
                                        selectedOrganization?.slug === org.slug
                                            ? 'bg-primary-50 border-primary-200 text-primary-700 font-medium'
                                            : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                                    }`}
                                >
                                    {org.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link
                        href="/news"
                        className="text-neutral-700 font-display text-sm font-medium py-2.5 px-2 transition-colors hover:text-primary-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Новости
                    </Link>
                    <Link
                        href="/matches"
                        className="text-neutral-700 font-display text-sm font-medium py-2.5 px-2 transition-colors hover:text-primary-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Матчи
                    </Link>
                    <Link
                        href="/tournaments"
                        className="text-neutral-700 font-display text-sm font-medium py-2.5 px-2 transition-colors hover:text-primary-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Турниры
                    </Link>
                    <Link
                        href="/hall-of-fame"
                        className="text-neutral-700 font-display text-sm font-medium py-2.5 px-2 transition-colors hover:text-primary-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Зал славы
                    </Link>
                    <Link
                        href="/about"
                        className="text-neutral-700 font-display text-sm font-medium py-2.5 px-2 transition-colors hover:text-primary-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        О нас
                    </Link>
                    <a
                        href="https://minifootball.eu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-700 font-display text-sm font-medium py-2.5 px-2 transition-colors hover:text-primary-600"
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
