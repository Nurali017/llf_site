"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Menu, X, MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useOrganization } from '@/contexts/OrganizationContext';
import { Skeleton } from '@/components/ui/Skeleton';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const { selectedOrganization, organizations, isLoading } = useOrganization();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-kmff-dark shadow-sm sticky top-0 z-50 border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Section - Consolidated Branding */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
                        {/* KMFF Logo */}
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white ring-2 ring-white/10 transition-all duration-300 group-hover:ring-white/30">
                            <Image
                                src="/kmff-logo.jpg"
                                alt="KMFF Logo"
                                fill
                                sizes="40px"
                                className="object-contain"
                                priority
                            />
                        </div>

                        <div className="h-6 w-px bg-white/20 mx-1"></div>

                        {/* ҚЛЛF Logo */}
                        <div className="relative h-5 w-auto">
                            <Image
                                src="/kllf-logo-cropped.png"
                                alt="ҚЛЛF Logo"
                                width={45}
                                height={20}
                                className="object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation & City Selector */}
                    <div className="hidden md:flex items-center gap-8">
                        <nav className="flex items-center gap-6">
                            <Link href="/news" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                Новости
                            </Link>
                            <Link href="/matches" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                Матчи
                            </Link>
                            <Link href="/tournaments" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                Турниры
                            </Link>
                            <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                О нас
                            </Link>
                            <a href="https://minifootball.eu/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                EMF
                            </a>
                        </nav>

                        {/* Integrated City Selector */}
                        <div className="relative">
                            {isLoading ? (
                                <Skeleton className="w-32 h-8 bg-white/10" />
                            ) : (
                                <button
                                    onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
                                >
                                    <MapPin className="w-3.5 h-3.5 text-kmff-blue" />
                                    <span className="text-sm text-gray-200 group-hover:text-white font-medium">
                                        {selectedOrganization?.name || 'Выберите город'}
                                    </span>
                                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                            )}

                            {/* Dropdown Menu */}
                            {isCityDropdownOpen && (
                                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-100 py-1 min-w-[200px] z-50 animate-in fade-in zoom-in-95 duration-200">
                                    {organizations && organizations.length > 0 ? (
                                        organizations.map((org) => (
                                            <Link
                                                key={org.slug}
                                                href={`/${org.slug}`}
                                                onClick={() => setIsCityDropdownOpen(false)}
                                                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${selectedOrganization?.slug === org.slug
                                                    ? 'bg-blue-50 text-blue-600 font-medium'
                                                    : 'text-gray-700 hover:bg-gray-50'
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
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        {isLoading ? (
                            <Skeleton className="w-20 h-8 bg-white/10" />
                        ) : (
                            <button
                                onClick={toggleMenu}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 rounded-full border border-white/10 text-xs text-gray-200"
                            >
                                <MapPin className="w-3 h-3 text-kmff-blue" />
                                <span className="max-w-[80px] truncate">{selectedOrganization?.name || 'Город'}</span>
                            </button>
                        )}

                        <button onClick={toggleMenu} className="text-white p-1 hover:bg-white/10 rounded-md transition-colors">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-kmff-dark border-t border-white/10 shadow-2xl py-4 px-4 flex flex-col gap-2 animate-in slide-in-from-top-5 duration-200">
                    <div className="pb-4 mb-2 border-b border-white/10">
                        <p className="text-gray-500 text-xs mb-3 uppercase tracking-wider font-semibold px-2">Выберите город</p>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                            {organizations.map((org) => (
                                <Link
                                    key={org.slug}
                                    href={`/${org.slug}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`px-3 py-2 rounded-md text-xs font-medium transition-colors truncate ${selectedOrganization?.slug === org.slug
                                        ? 'bg-kmff-blue text-white'
                                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                        }`}
                                >
                                    {org.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/news" className="text-gray-300 hover:text-white font-medium py-2.5 px-2 hover:bg-white/5 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                        Новости
                    </Link>
                    <Link href="/matches" className="text-gray-300 hover:text-white font-medium py-2.5 px-2 hover:bg-white/5 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                        Матчи
                    </Link>
                    <Link href="/tournaments" className="text-gray-300 hover:text-white font-medium py-2.5 px-2 hover:bg-white/5 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                        Турниры
                    </Link>
                    <Link href="/about" className="text-gray-300 hover:text-white font-medium py-2.5 px-2 hover:bg-white/5 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                        О нас
                    </Link>
                    <a href="https://minifootball.eu/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white font-medium py-2.5 px-2 hover:bg-white/5 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                        EMF
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
