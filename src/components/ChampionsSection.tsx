"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { getHallOfFame, HallOfFameItem } from '@/services/api';
import { getImageUrl } from '@/utils/image';

type AgeGroup = 'молодежь' | '35+' | '40+' | '45+';

// Main Component
export default function ChampionsSection() {
    // State
    const [allChampions, setAllChampions] = useState<HallOfFameItem[]>([]);
    const [filteredChampions, setFilteredChampions] = useState<HallOfFameItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>('молодежь');
    const currentYear = 2025; // Данные за 2025 год

    // Slider state
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Touch state
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Fetch all champions
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await getHallOfFame({
                    year: currentYear,
                    place: 1,
                    limit: 20,
                });
                setAllChampions(response.data);
            } catch (err) {
                console.error('Failed to fetch champions:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [currentYear]);

    // Filter champions by age group
    useEffect(() => {
        const filtered = allChampions.filter(item => {
            const tournamentName = item.tournament.name;

            switch(selectedAgeGroup) {
                case 'молодежь':
                    return !tournamentName.includes('35+') &&
                           !tournamentName.includes('40+') &&
                           !tournamentName.includes('45+');
                case '35+':
                    return tournamentName.includes('35+');
                case '40+':
                    return tournamentName.includes('40+');
                case '45+':
                    return tournamentName.includes('45+');
                default:
                    return true;
            }
        });

        // Сортировка: MINIFOOTBALL первым, затем FUTSAL
        const sorted = filtered.sort((a, b) => {
            if (a.tournament.sport_type === 'MINIFOOTBALL' && b.tournament.sport_type === 'FUTSAL') {
                return -1;
            }
            if (a.tournament.sport_type === 'FUTSAL' && b.tournament.sport_type === 'MINIFOOTBALL') {
                return 1;
            }
            return 0;
        });

        setFilteredChampions(sorted);
        setCurrentIndex(0);
    }, [selectedAgeGroup, allChampions]);

    // Navigation handlers
    const nextSlide = () => {
        if (filteredChampions.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % filteredChampions.length);
        }
    };

    const prevSlide = () => {
        if (filteredChampions.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + filteredChampions.length) % filteredChampions.length);
        }
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 10000);
    };

    // Touch handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
        setTouchEnd(null);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();

        setTouchStart(null);
        setTouchEnd(null);
    };

    // Auto-slide
    useEffect(() => {
        if (isPaused || filteredChampions.length <= 1) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isPaused, filteredChampions, currentIndex]);

    return (
        <section className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            {/* Header */}
            <div className="bg-kmff-dark px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <h2 className="font-display text-lg font-semibold text-white">
                            Зал славы {currentYear}
                        </h2>
                    </div>
                    <Link
                        href="/hall-of-fame"
                        className="font-display text-xs text-white/90 hover:text-white transition-colors flex items-center gap-1"
                    >
                        Все чемпионы
                        <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>

                {/* Age group tabs */}
                <div className="flex gap-1.5">
                    {(['молодежь', '35+', '40+', '45+'] as AgeGroup[]).map((ageGroup) => (
                        <button
                            key={ageGroup}
                            onClick={() => setSelectedAgeGroup(ageGroup)}
                            className={`flex-1 px-2 py-1.5 rounded-md font-display text-xs font-medium transition-all duration-200 ${
                                selectedAgeGroup === ageGroup
                                    ? 'bg-primary-900 text-white shadow-md'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                        >
                            {ageGroup === 'молодежь' ? 'Молодежь' : ageGroup}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            ) : filteredChampions.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">Нет данных о чемпионах</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Main slider */}
                    <div
                        className="p-2"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="relative w-full">
                            {/* Slider container */}
                            <div className="relative h-[280px] md:h-[350px] rounded-lg overflow-hidden shadow-md">
                                {filteredChampions.map((item, index) => (
                                    <div
                                        key={`${item.team.id}-${item.tournament.id}`}
                                        className={`absolute inset-0 transition-opacity duration-700 ${
                                            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                        }`}
                                    >
                                        <img
                                            src={getImageUrl(item.trophy_photo || item.team.image)}
                                            alt={item.team.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/llf-logo.png';
                                            }}
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />

                                        {/* Team info overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-10">
                                            <div className="flex items-center gap-3">
                                                {/* Team logo */}
                                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white p-1.5 shadow-lg flex-shrink-0">
                                                    <img
                                                        src={getImageUrl(item.team.image)}
                                                        alt={item.team.name}
                                                        className="w-full h-full object-contain"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = '/llf-logo.png';
                                                        }}
                                                    />
                                                </div>

                                                {/* Team name and info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-white font-display font-semibold text-base md:text-lg mb-1 truncate">
                                                        {item.team.name}
                                                    </h3>
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        <span className="px-2 py-0.5 bg-primary-700 text-white text-xs font-medium rounded-full">
                                                            {item.tournament.sport_type === 'MINIFOOTBALL' ? 'MiniFootball' : 'Футзал'}
                                                        </span>
                                                        <span className="px-2 py-0.5 bg-yellow-500 text-neutral-900 text-xs font-medium rounded-full">
                                                            {item.year}
                                                        </span>
                                                        <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-medium rounded-full truncate max-w-[180px]">
                                                            {item.tournament.name}
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
                                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 rounded-full shadow-md flex items-center justify-center hover:bg-primary-700 hover:text-white transition-all duration-200 md:flex hidden"
                                        aria-label="Previous champion"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 rounded-full shadow-md flex items-center justify-center hover:bg-primary-700 hover:text-white transition-all duration-200 md:flex hidden"
                                        aria-label="Next champion"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </>
                            )}

                            {/* Navigation dots */}
                            {filteredChampions.length > 1 && (
                                <div className="flex justify-center gap-1.5 mt-3">
                                    {filteredChampions.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`transition-all duration-200 rounded-full ${
                                                index === currentIndex
                                                    ? 'w-5 h-2 bg-primary-700'
                                                    : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                                            }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mini cards - команды внизу */}
                    <div className="px-3 pb-3 pt-1">
                        <div className="flex justify-center gap-2 overflow-x-auto">
                            {filteredChampions.map((item, index) => (
                                <button
                                    key={`card-${item.team.id}-${item.tournament.id}`}
                                    onClick={() => goToSlide(index)}
                                    className={`relative p-2 rounded-lg transition-all duration-200 cursor-pointer text-left min-w-[120px] ${
                                        index === currentIndex
                                            ? 'border-2 border-primary-600 bg-primary-50 shadow-md'
                                            : 'border border-neutral-200 bg-white hover:border-primary-600 hover:bg-primary-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {/* Team logo */}
                                        <div className="w-10 h-10 rounded-full bg-white shadow-sm ring-1 ring-primary-300 p-1 flex-shrink-0">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={getImageUrl(item.team.image)}
                                                    alt={item.team.name}
                                                    fill
                                                    sizes="40px"
                                                    className="object-contain"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = '/llf-logo.png';
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Team info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-display text-xs font-medium text-neutral-900 truncate">
                                                {item.team.name}
                                            </h4>
                                            <span className="inline-block px-1.5 py-0.5 bg-primary-600 text-white text-[10px] font-medium rounded mt-0.5">
                                                {item.tournament.sport_type === 'MINIFOOTBALL' ? 'MiniFootball' : 'Футзал'}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
