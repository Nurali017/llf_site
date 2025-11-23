"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Menu, X, MapPin, ChevronDown } from 'lucide-react';
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
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-contain"
                                    priority
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
                                    style={{ width: 'auto', height: 'auto' }}
                                />
                            </div>
                        </div>
                    </Link>

                    {/* City Selector - Desktop */}
                    <div className="hidden md:flex relative">
                        <button
                            onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-kmff-blue hover:bg-opacity-90 rounded-lg transition-all duration-300 group"
                        >
                            <MapPin className="w-4 h-4 text-white" />
                            <span className="text-white font-medium">
                                {selectedOrganization?.name || 'Выберите город'}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isCityDropdownOpen && (
                            <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[220px] z-50">
                                {isLoading ? (
                                    <div className="px-4 py-3 text-sm text-gray-500 text-center">Загрузка...</div>
                                ) : organizations && organizations.length > 0 ? (
                                    organizations.map((org) => (
                                        <Link
                                            key={org.slug}
                                            href={`/${org.slug}`}
                                            onClick={() => setIsCityDropdownOpen(false)}
                                            className={`block w-full text-left px-4 py-2.5 hover:bg-kmff-blue hover:text-white transition-colors duration-200 ${selectedOrganization?.slug === org.slug ? 'bg-kmff-blue bg-opacity-10 text-kmff-blue font-semibold' : 'text-gray-700'
                                                }`}
                                        >
                                            {org.name}
                                        </Link>
                                    ))
                                ) : (
                                    <div className="px-4 py-3 text-sm text-gray-500 text-center">Нет доступных городов</div>
                                )}
                            </div>
                        )}
                    </div>

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
                    <div className="md:hidden flex items-center gap-3">
                        {/* City Badge - Mobile */}
                        <button
                            onClick={toggleMenu}
                            className="flex items-center gap-1 px-2 py-1 bg-kmff-blue rounded text-xs text-white active:scale-95 transition-transform"
                        >
                            <MapPin className="w-3 h-3" />
                            <span>{isLoading ? '...' : selectedOrganization?.name || 'Город'}</span>
                        </button>

                        <button onClick={toggleMenu} className="text-white p-2">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-kmff-dark border-t border-gray-800 shadow-lg py-4 px-4 flex flex-col gap-4">
                    {/* City Selector - Mobile */}
                    <div className="border-b border-gray-800 pb-4">
                        <p className="text-gray-400 text-xs mb-2 uppercase tracking-wide">Выберите город</p>
                        {isLoading ? (
                            <div className="text-gray-400 text-sm text-center py-4">Загрузка...</div>
                        ) : (
                            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                                {organizations.map((org) => (
                                    <Link
                                        key={org.slug}
                                        href={`/${org.slug}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${selectedOrganization?.slug === org.slug
                                            ? 'bg-kmff-blue text-white'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 active:bg-gray-600'
                                            }`}
                                    >
                                        {org.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

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
