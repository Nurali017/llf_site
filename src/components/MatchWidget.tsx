"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useMatches, useLiveMatches } from '@/hooks/useMatches';
import { Match, LiveMatch } from '@/types/api';
import { MatchCard, DisplayMatch } from './MatchCard';
import { MatchFilters } from './MatchFilters';
import { useMatchFiltering, FilterType } from '@/hooks/useMatchFiltering';

const MatchWidget = () => {
    const { selectedOrganization } = useOrganization();
    const { matches, isLoading: matchesLoading } = useMatches(selectedOrganization?.id);
    const { liveMatches, isLoading: liveLoading } = useLiveMatches(selectedOrganization?.id);
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const displayMatches = useMemo(() => {
        const allMatches: DisplayMatch[] = [];

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

                allMatches.push({
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

                allMatches.push({
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
                    isLive: false,
                    rawDate: matchDate,
                });
            });
        }

        return allMatches;
    }, [matches, liveMatches]);

    const filteredMatches = useMatchFiltering(displayMatches, activeFilter);

    // Auto-scroll to appropriate position when filter changes
    useEffect(() => {
        if (!scrollContainerRef.current || filteredMatches.length === 0) return;

        if (activeFilter === 'all') {
            // Scroll to first live match if exists, else scroll to first upcoming
            const firstLiveIndex = filteredMatches.findIndex(m => m.isLive);
            const firstUpcomingIndex = filteredMatches.findIndex(m => m.status === 'upcoming');

            if (firstLiveIndex !== -1) {
                // Scroll to first live match
                scrollContainerRef.current.scrollTo({
                    left: firstLiveIndex * 320,
                    behavior: 'smooth'
                });
            } else if (firstUpcomingIndex !== -1) {
                // Scroll to first upcoming
                scrollContainerRef.current.scrollTo({
                    left: firstUpcomingIndex * 320,
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
            scrollContainerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else if (activeFilter === 'upcoming') {
            // For 'upcoming', start at the beginning (Soonest)
            scrollContainerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    }, [filteredMatches, activeFilter]);

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
        <section className="py-8 bg-mono-0">
            <div className="w-full">
                {/* Brutalist Header with Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 pb-6 border-b-4 border-mono-100">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        <h2 className="font-display text-h1 font-bold uppercase tracking-tight whitespace-nowrap">
                            Матч-центр
                        </h2>

                        {/* Filters */}
                        <MatchFilters currentFilter={activeFilter} onFilterChange={setActiveFilter} />
                    </div>

                    {/* Navigation Arrows - Brutalist Square */}
                    <div className="flex gap-2 hidden md:flex">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 bg-mono-0 border-2 border-mono-100 flex items-center justify-center text-mono-100 hover:bg-mono-100 hover:text-mono-0 transition-colors duration-150"
                        >
                            <ChevronLeft size={24} strokeWidth={2} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 bg-mono-0 border-2 border-mono-100 flex items-center justify-center text-mono-100 hover:bg-mono-100 hover:text-mono-0 transition-colors duration-150"
                        >
                            <ChevronRight size={24} strokeWidth={2} />
                        </button>
                    </div>
                </div>

                <div className="relative group/slider">
                    {isLoading ? (
                        <div className="flex gap-4 overflow-hidden">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="min-w-[280px] md:min-w-[300px] h-[240px] border-2 border-mono-100 p-5">
                                    <div className="animate-pulse flex flex-col h-full items-center justify-between">
                                        <div className="h-4 w-24 bg-mono-10"></div>
                                        <div className="flex items-center justify-between w-full px-4">
                                            <div className="w-16 h-16 bg-mono-10"></div>
                                            <div className="w-12 h-8 bg-mono-10"></div>
                                            <div className="w-16 h-16 bg-mono-10"></div>
                                        </div>
                                        <div className="h-4 w-32 bg-mono-10"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredMatches.length === 0 ? (
                        <div className="text-center py-16 border-2 border-mono-100">
                            <div className="text-6xl mb-4">⚽</div>
                            <p className="font-display text-body font-bold mb-2">Матчи пока не запланированы</p>
                            <p className="font-mono text-micro uppercase opacity-60">Следите за обновлениями</p>
                        </div>
                    ) : (
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {filteredMatches.map((match) => (
                                <MatchCard key={match.id} match={match} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

// Форматирование даты: "22 НОЯБ. ПТ"
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
