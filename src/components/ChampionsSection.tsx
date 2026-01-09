"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, ChevronLeft, ChevronRight } from 'lucide-react';

type SportType = 'minifootball' | 'futsal';
type AgeCategory = 'youth' | '35+' | '40+' | '45+';

interface Champion {
    id: number;
    teamName: string;
    teamImage: string;
    celebrationPhoto: string;
    category: AgeCategory;
    sport: SportType;
    year: number;
}

// Mock данные чемпионов 2025
const mockChampions: Champion[] = [
    // Минифутбол
    { id: 1, teamName: "ФК Астана", teamImage: "/kmff-logo.jpg", celebrationPhoto: "/news-2.png", category: "youth", sport: "minifootball", year: 2025 },
    { id: 2, teamName: "ФК Алматы", teamImage: "/kmff-logo.jpg", celebrationPhoto: "/news-2.png", category: "35+", sport: "minifootball", year: 2025 },
    { id: 3, teamName: "ФК Шымкент", teamImage: "/kmff-logo.jpg", celebrationPhoto: "/news-2.png", category: "40+", sport: "minifootball", year: 2025 },
    { id: 4, teamName: "ФК Караганда", teamImage: "/kmff-logo.jpg", celebrationPhoto: "/news-2.png", category: "45+", sport: "minifootball", year: 2025 },

    // Futsal
    { id: 5, teamName: "Futsal Астана", teamImage: "/kmff-logo.jpg", celebrationPhoto: "/news-2.png", category: "youth", sport: "futsal", year: 2025 },
    { id: 6, teamName: "Futsal Алматы", teamImage: "/kmff-logo.jpg", celebrationPhoto: "/news-2.png", category: "35+", sport: "futsal", year: 2025 },
    { id: 7, teamName: "Futsal Актау", teamImage: "/kmff-logo.jpg", celebrationPhoto: "/news-2.png", category: "40+", sport: "futsal", year: 2025 },
    { id: 8, teamName: "Futsal Атырау", teamImage: "/kmff-logo.jpg", celebrationPhoto: "/news-2.png", category: "45+", sport: "futsal", year: 2025 },
];

const categoryLabels: Record<AgeCategory, string> = {
    'youth': 'Молодежь',
    '35+': '35+',
    '40+': '40+',
    '45+': '45+'
};

const sportLabels: Record<SportType, string> = {
    'minifootball': 'MiniFootball',
    'futsal': 'Футзал'
};

// Header Component
function Header({
    selectedCategory,
    onCategoryChange
}: {
    selectedCategory: AgeCategory;
    onCategoryChange: (category: AgeCategory) => void;
}) {
    const categories: AgeCategory[] = ['youth', '35+', '40+', '45+'];

    return (
        <div className="bg-kmff-dark px-6 py-4 relative overflow-hidden">
            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '16px 16px'
                }}
            />

            <div className="relative z-10">
                {/* Title row */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Trophy className="w-6 h-6 text-yellow-300" />
                            <Trophy className="w-5 h-5 text-yellow-400" />
                        </div>
                        <h2 className="font-display text-h1 font-semibold text-white">
                            Зал славы 2025
                        </h2>
                    </div>

                    <Link
                        href="/hall-of-fame"
                        className="font-display text-sm text-white/90 hover:text-white transition-colors flex items-center gap-1"
                    >
                        Все чемпионы
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Age category filters */}
                <div className="flex gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`flex-1 px-3 py-2 rounded-lg font-display text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                    ? 'bg-primary-900 text-white shadow-md scale-105'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            {categoryLabels[category]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Champion Card Component
function ChampionCard({
    champion,
    isActive,
    onClick
}: {
    champion: Champion;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`relative p-2 md:p-3 rounded-lg transition-all duration-200 cursor-pointer text-left w-32 md:w-40 ${isActive
                    ? 'border-2 border-primary-600 bg-primary-50 shadow-md scale-105'
                    : 'border-2 border-neutral-200 bg-white hover:border-primary-600 hover:bg-primary-50 hover:scale-102'
                }`}
        >
            {/* Team logo */}
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 bg-white rounded-full shadow-md ring-2 ring-primary-300 p-1.5">
                <div className="relative w-full h-full">
                    <Image
                        src={champion.teamImage}
                        alt={champion.teamName}
                        fill
                        sizes="48px"
                        className="object-contain"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/kmff-logo.jpg';
                        }}
                    />
                </div>
            </div>

            {/* Team name */}
            <h4 className="font-display text-xs font-medium text-neutral-900 text-center mb-1.5 line-clamp-2">
                {champion.teamName}
            </h4>

            {/* Sport badge */}
            <div className="flex justify-center">
                <span className="px-1.5 py-0.5 bg-primary-900 text-white text-[10px] font-medium rounded-full">
                    {sportLabels[champion.sport]}
                </span>
            </div>
        </button>
    );
}

// Main Component
export default function HallOfFame2025() {
    // State
    const [selectedCategory, setSelectedCategory] = useState<AgeCategory>('youth');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Filtered champions
    const filteredChampions = mockChampions.filter(c => c.category === selectedCategory);

    // Navigation handlers
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredChampions.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredChampions.length) % filteredChampions.length);
    };

    const goToChampion = (index: number) => {
        setCurrentIndex(index);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 10000); // Resume after 10s
    };

    // Auto-slide effect
    useEffect(() => {
        if (isPaused || filteredChampions.length <= 1) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isPaused, filteredChampions.length, currentIndex]);

    // Reset index when category changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [selectedCategory]);

    return (
        <section className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            {/* Header with filters */}
            <Header selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

            {/* Main photo slider */}
            <div
                className="p-2 md:p-4"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="relative w-full">
                    {/* Photo container with fade transition */}
                    <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-md">
                        {filteredChampions.map((champion, index) => (
                            <div
                                key={champion.id}
                                className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    }`}
                            >
                                <img
                                    src={champion.celebrationPhoto}
                                    alt={champion.teamName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/news-2.png';
                                    }}
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
                                {/* Team info overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                                    <div className="flex items-center gap-4">
                                        {/* Team logo */}
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white p-2 shadow-lg flex-shrink-0">
                                            <img
                                                src={champion.teamImage}
                                                alt={champion.teamName}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/kmff-logo.jpg';
                                                }}
                                            />
                                        </div>
                                        {/* Team name and category */}
                                        <div className="flex-1">
                                            <h3 className="text-white font-display font-semibold text-xl md:text-2xl mb-2">
                                                {champion.teamName}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 bg-primary-700 text-white text-sm font-medium rounded-full">
                                                    {sportLabels[champion.sport]}
                                                </span>
                                                <span className="px-3 py-1 bg-yellow-500 text-neutral-900 text-sm font-medium rounded-full">
                                                    {champion.year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation arrows */}
                    {filteredChampions.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 hover:text-white transition-all duration-200 md:flex hidden"
                                aria-label="Previous champion"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 hover:text-white transition-all duration-200 md:flex hidden"
                                aria-label="Next champion"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}

                    {/* Navigation dots */}
                    {filteredChampions.length > 1 && (
                        <div className="flex justify-center gap-2 mt-6">
                            {filteredChampions.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToChampion(index)}
                                    className={`transition-all duration-200 rounded-full ${index === currentIndex
                                            ? 'w-8 h-3 bg-primary-700'
                                            : 'w-3 h-3 bg-neutral-300 hover:bg-neutral-400'
                                        }`}
                                    aria-label={`Go to champion ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Champion cards grid */}
            <div className="px-4 pb-4 pt-2">
                <div className="flex justify-center gap-2 md:gap-3">
                    {filteredChampions.map((champion, index) => (
                        <ChampionCard
                            key={champion.id}
                            champion={champion}
                            isActive={index === currentIndex}
                            onClick={() => goToChampion(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
