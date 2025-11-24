"use client";


import { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useMatches, useLiveMatches } from '@/hooks/useMatches';
import { getImageUrl, handleImageError } from '@/utils/image';
import { Match, LiveMatch } from '@/types/api';

interface DisplayMatch {
    id: number;
    homeTeam: string;
    awayTeam: string;
    homeTeamImage: string;
    awayTeamImage: string;
    homeScore: number | string;
    awayScore: number | string;
    date: string;
    time: string;
    stadium: string;
    status: 'live' | 'upcoming' | 'finished';
    isLive?: boolean;
    rawDate?: Date;
}

type FilterType = 'all' | 'finished' | 'upcoming';

const MatchWidget = () => {
    const { selectedOrganization } = useOrganization();

    const { matches, isLoading: matchesLoading } = useMatches(selectedOrganization?.id);
    const { liveMatches, isLoading: liveLoading } = useLiveMatches(selectedOrganization?.id);
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const displayMatches = useMemo(() => {
        const live: DisplayMatch[] = [];
        const finished: DisplayMatch[] = [];
        const upcoming: DisplayMatch[] = [];

        // Process Live Matches
        if (liveMatches) {
            liveMatches.forEach((match: LiveMatch) => {


                // Handle address being string or object
                let stadiumName = 'Стадион не указан';
                if (typeof match.address === 'string') {
                    stadiumName = match.address;
                } else if (match.address?.name) {
                    stadiumName = match.address.name;
                } else if (match.addresses && match.addresses.length > 0) {
                    stadiumName = match.addresses[0];
                }

                live.push({
                    id: match.id,
                    homeTeam: match.team_1.name,
                    awayTeam: match.team_2.name,
                    homeTeamImage: match.team_1.image,
                    awayTeamImage: match.team_2.image,
                    homeScore: match.team_1.goals ?? 0,
                    awayScore: match.team_2.goals ?? 0,
                    // For live matches, show current time instead of date
                    date: match.current_time ? `${match.current_time}'` : '1-й тайм',
                    time: match.current_time || 'LIVE',
                    stadium: stadiumName,
                    status: 'live',
                    isLive: true,
                    rawDate: new Date(match.time || match.date || new Date()),
                });
            });
        }

        // Process Regular Matches
        if (matches) {
            matches.forEach((match: Match) => {
                const matchDate = new Date(match.time);



                // Простая логика по статусам:
                // - FINISHED → завершен
                // - NOT_STARTED → предстоящий
                // - STARTED → live (обрабатывается отдельно выше)
                const isFinished = match.status === 'FINISHED';

                // Handle address being string or object
                let stadiumName = 'Стадион не указан';
                if (typeof match.address === 'string') {
                    stadiumName = match.address;
                } else if (match.address?.name) {
                    stadiumName = match.address.name;
                } else if (match.addresses && match.addresses.length > 0) {
                    stadiumName = match.addresses[0];
                }

                const displayMatch: DisplayMatch = {
                    id: match.id,
                    homeTeam: match.team_1.name,
                    awayTeam: match.team_2.name,
                    homeTeamImage: match.team_1.image,
                    awayTeamImage: match.team_2.image,
                    homeScore: match.team_1.goals ?? 0,
                    awayScore: match.team_2.goals ?? 0,
                    date: formatDate(match.time),
                    time: formatTime(match.time),
                    stadium: stadiumName,
                    status: isFinished ? 'finished' : 'upcoming',
                    rawDate: matchDate,
                };

                if (isFinished) {
                    finished.push(displayMatch);
                } else {
                    upcoming.push(displayMatch);
                }
            });
        }

        // Sort Finished: Most recent first (descending)
        finished.sort((a, b) => (b.rawDate?.getTime() || 0) - (a.rawDate?.getTime() || 0));

        // Sort Upcoming: Soonest first (ascending)
        upcoming.sort((a, b) => (a.rawDate?.getTime() || 0) - (b.rawDate?.getTime() || 0));

        // Filter Logic
        if (activeFilter === 'finished') {
            // Return Oldest -> Newest so that "Right" is "Most Recent"
            // and scrolling "Left" goes to "Past"
            return [...finished].reverse();
        }
        if (activeFilter === 'upcoming') {
            return upcoming;
        }

        // 'All' Tab Logic
        // Timeline view: [Past (Old -> New)] -> [Live] -> [Future (Soon -> Far)]
        // We reverse 'finished' here because we want them chronologically for the timeline



        return [...[...finished].reverse(), ...live, ...upcoming];

    }, [matches, liveMatches, activeFilter]);

    // Auto-scroll logic
    useEffect(() => {
        if (!scrollContainerRef.current) return;

        if (activeFilter === 'all' && displayMatches.length > 0) {
            // Find index of first live or upcoming match
            const firstActiveIndex = displayMatches.findIndex(m => m.status === 'live' || m.status === 'upcoming');

            if (firstActiveIndex !== -1) {
                const cardWidth = 300;
                const gap = 16;
                const scrollPos = firstActiveIndex * (cardWidth + gap);

                // Scroll so the previous match is partially visible
                const offset = scrollPos - 50;

                scrollContainerRef.current.scrollTo({
                    left: Math.max(0, offset),
                    behavior: 'smooth'
                });
            } else {
                // If all finished, scroll to end
                scrollContainerRef.current.scrollTo({
                    left: scrollContainerRef.current.scrollWidth,
                    behavior: 'smooth'
                });
            }
        } else if (activeFilter === 'finished') {
            // For 'finished', we want to show the most recent matches (which are at the end now)
            // So scroll to the far right
            // Use setTimeout to ensure render is complete
            setTimeout(() => {
                if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                        left: scrollContainerRef.current.scrollWidth,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else if (activeFilter === 'upcoming') {
            // For 'upcoming', start at the beginning (Soonest)
            scrollContainerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    }, [displayMatches, activeFilter]);

    const isLoading = matchesLoading || liveLoading;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300; // Adjust based on card width
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-8 bg-white">
            <div className="w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        <h2 className="text-3xl font-bold text-kmff-dark uppercase italic tracking-tight whitespace-nowrap">Матч-центр</h2>

                        {/* Filters */}
                        <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${activeFilter === 'all'
                                    ? 'bg-kmff-blue text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Все матчи
                            </button>
                            <button
                                onClick={() => setActiveFilter('upcoming')}
                                className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${activeFilter === 'upcoming'
                                    ? 'bg-kmff-blue text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Предстоящие
                            </button>
                            <button
                                onClick={() => setActiveFilter('finished')}
                                className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${activeFilter === 'finished'
                                    ? 'bg-kmff-blue text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Прошедшие
                            </button>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-3 hidden md:flex">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-kmff-dark hover:bg-gray-50 transition-colors shadow-sm border border-gray-100"
                        >
                            <ChevronLeft size={24} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-kmff-dark hover:bg-gray-50 transition-colors shadow-sm border border-gray-100"
                        >
                            <ChevronRight size={24} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                <div className="relative group/slider">
                    {isLoading ? (
                        <div className="flex gap-4 overflow-hidden">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="min-w-[280px] md:min-w-[300px] h-[240px] bg-white rounded-xl p-5 border border-gray-100">
                                    <div className="animate-pulse flex flex-col h-full items-center justify-between">
                                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                        <div className="flex items-center justify-between w-full px-4">
                                            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                                            <div className="w-12 h-8 bg-gray-200 rounded"></div>
                                            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                                        </div>
                                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : displayMatches.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-gray-100">
                            Нет матчей для отображения
                        </div>
                    ) : (
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {displayMatches.map((match) => (
                                <Link key={match.id} href={`/match/${match.id}`} className="min-w-[280px] md:min-w-[300px] snap-center block group h-full">
                                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm group-hover:shadow-lg group-hover:border-kmff-blue transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col relative overflow-hidden">

                                        {/* Date - Top Center */}
                                        <div className="text-center mb-4">
                                            <span className="text-sm font-bold text-kmff-dark uppercase tracking-wide">
                                                {match.date}
                                            </span>
                                        </div>

                                        {/* Main Content: Logos and Score */}
                                        <div className="flex items-center justify-between mb-4 px-2">
                                            {/* Home Team Logo */}
                                            <div className="w-16 h-16 relative flex-shrink-0">
                                                <Image
                                                    src={getImageUrl(match.homeTeamImage)}
                                                    alt={match.homeTeam}
                                                    fill
                                                    className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                                                    sizes="64px"
                                                    onError={(e) => {
                                                        // Fallback handled by next/image if configured or parent
                                                    }}
                                                />
                                            </div>

                                            {/* Score */}
                                            <div className="flex flex-col items-center mx-4">
                                                <div className={`text-4xl font-black tracking-tighter ${match.status === 'live' ? 'text-red-600 animate-pulse' : 'text-kmff-dark'}`}>
                                                    {match.status === 'upcoming' ? (
                                                        <span className="text-2xl">{match.time}</span>
                                                    ) : (
                                                        `${match.homeScore}-${match.awayScore}`
                                                    )}
                                                </div>
                                                {match.status === 'live' && (
                                                    <span className="text-[10px] font-bold text-white bg-red-600 px-2 py-0.5 rounded-full mt-1">LIVE</span>
                                                )}
                                            </div>

                                            {/* Away Team Logo */}
                                            <div className="w-16 h-16 relative flex-shrink-0">
                                                <Image
                                                    src={getImageUrl(match.awayTeamImage)}
                                                    alt={match.awayTeam}
                                                    fill
                                                    className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                                                    sizes="64px"
                                                    onError={(e) => {
                                                        // Fallback handled by next/image if configured or parent
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Footer: Team Names & Stadium */}
                                        <div className="text-center mt-auto space-y-1">
                                            <div className="flex items-center justify-center gap-2 text-sm font-black text-gray-800 leading-tight">
                                                <span className="truncate max-w-[100px]" title={match.homeTeam}>{match.homeTeam}</span>
                                                <span className="text-black">—</span>
                                                <span className="truncate max-w-[100px]" title={match.awayTeam}>{match.awayTeam}</span>
                                            </div>
                                            <div className="text-xs text-black font-bold truncate px-4">
                                                {match.stadium}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

// Форматирование даты: "22 Ноября"
// Форматирование даты: "22 Ноября"
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const months = [
        'ЯНВ.', 'ФЕВ.', 'МАРТ', 'АПР.', 'МАЯ', 'ИЮНЯ',
        'ИЮЛЯ', 'АВГ.', 'СЕНТ.', 'ОКТ.', 'НОЯБ.', 'ДЕК.'
    ];
    const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const weekDay = days[date.getUTCDay()];

    return `${day} ${month} ${weekDay}`;
}

// Форматирование времени: "18:00"
function formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
}

export default MatchWidget;
