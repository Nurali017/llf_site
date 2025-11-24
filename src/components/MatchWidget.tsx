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
                    rawDate: matchDate,
                });
            });
        }

        return allMatches;
    }, [matches, liveMatches]);

    const filteredMatches = useMatchFiltering(displayMatches, activeFilter);

    // Auto-scroll logic
    useEffect(() => {
        if (!scrollContainerRef.current) return;

        if (activeFilter === 'all' && filteredMatches.length > 0) {
            // Find index of first live or upcoming match
            const firstActiveIndex = filteredMatches.findIndex(m => m.status === 'live' || m.status === 'upcoming');

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
            // For 'finished', we want to show the most recent matches (which are at the beginning of the list because of descending sort)
            // Wait, useMatchFiltering returns finished matches sorted Descending (New -> Old).
            // So the most recent match is at index 0.
            // So we should scroll to 0.

            // BUT, the original logic was:
            // "Return Oldest -> Newest so that "Right" is "Most Recent" and scrolling "Left" goes to "Past""
            // And then it scrolled to the end.

            // Let's check useMatchFiltering logic for 'finished':
            // return matches.filter(...).sort((a, b) => (b.rawDate) - (a.rawDate)); // Descending (New -> Old)

            // If we want the UI to show "Most Recent" on the right, we should sort Ascending (Old -> New) and scroll to end?
            // Or show "Most Recent" on the left?
            // Usually "Past" matches are shown with most recent on the left or top.
            // The original code had: `return [...finished].reverse();` (Old -> New) and scrolled to end.
            // My useMatchFiltering has Descending (New -> Old).

            // If I want to match original behavior:
            // Original: Finished tab -> Oldest -> Newest. Scroll to End (Newest).
            // My Hook: Finished tab -> Newest -> Oldest.

            // If I want to keep the "Timeline" feel where Right = Future/Newer, Left = Past/Older:
            // Finished matches should be Old -> New.

            // Let's adjust the scroll logic to match the hook's output.
            // Hook returns Newest -> Oldest.
            // So index 0 is Newest.
            // So we should scroll to 0.

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
        <section className="py-8 bg-white">
            <div className="w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        <h2 className="text-3xl font-bold text-kmff-dark uppercase italic tracking-tight whitespace-nowrap">Матч-центр</h2>

                        {/* Filters */}
                        <MatchFilters currentFilter={activeFilter} onFilterChange={setActiveFilter} />
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
                    ) : filteredMatches.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-gray-100">
                            Нет матчей для отображения
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
