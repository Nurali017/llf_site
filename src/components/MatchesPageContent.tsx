"use client";

import { useState, useMemo } from 'react';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useMatches, useLiveMatches } from '@/hooks/useMatches';
import { Match, LiveMatch } from '@/types/api';
import { MatchCard, DisplayMatch } from './MatchCard';
import { MatchFilters } from './MatchFilters';
import { useMatchFiltering, FilterType } from '@/hooks/useMatchFiltering';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDate, formatTime } from '@/utils/formatting';
import { ITEMS_PER_PAGE } from '@/utils/constants';
import { mutate } from 'swr';

function MatchGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[200px] bg-white rounded-xl p-5 border border-gray-100">
                    <div className="animate-pulse flex flex-col h-full items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <div className="flex items-center justify-between w-full px-4">
                            <Skeleton className="w-14 h-14 rounded-full" />
                            <Skeleton className="w-16 h-8" />
                            <Skeleton className="w-14 h-14 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function EmptyState() {
    return (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-6xl mb-4">&#9917;</div>
            <p className="text-gray-500 font-medium">Матчи не найдены</p>
            <p className="text-gray-400 text-sm mt-2">Попробуйте изменить фильтр</p>
        </div>
    );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="text-center py-12 bg-red-50 rounded-xl border border-red-100">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            <p className="text-gray-700 font-medium mb-2">Ошибка загрузки матчей</p>
            <p className="text-gray-500 text-sm mb-4">Не удалось загрузить данные</p>
            <button
                onClick={onRetry}
                className="bg-kmff-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Повторить
            </button>
        </div>
    );
}

export default function MatchesPageContent() {
    const { selectedOrganization, isLoading: orgLoading } = useOrganization();
    const { matches, isLoading: matchesLoading, isError: matchesError } = useMatches(selectedOrganization?.id);
    const { liveMatches, isLoading: liveLoading } = useLiveMatches(selectedOrganization?.id);
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE.MATCHES);

    const displayMatches = useMemo(() => {
        const allMatches: DisplayMatch[] = [];

        // Process Live Matches
        if (liveMatches) {
            liveMatches.forEach((match: LiveMatch) => {
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
    const visibleMatches = filteredMatches.slice(0, visibleCount);
    const hasMore = visibleCount < filteredMatches.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE.MATCHES);
    };

    const handleFilterChange = (filter: FilterType) => {
        setActiveFilter(filter);
        setVisibleCount(ITEMS_PER_PAGE.MATCHES);
    };

    const handleRetry = () => {
        if (selectedOrganization?.id) {
            mutate(['matches-upcoming', selectedOrganization.id]);
            mutate(['matches-finished', selectedOrganization.id]);
        }
    };

    const isLoading = orgLoading || matchesLoading || liveLoading;

    // Stats
    const liveCount = displayMatches.filter(m => m.status === 'live').length;
    const upcomingCount = displayMatches.filter(m => m.status === 'upcoming').length;
    const finishedCount = displayMatches.filter(m => m.status === 'finished').length;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs />

                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-kmff-dark flex items-center gap-3">
                        <span className="w-1.5 h-10 bg-kmff-blue rounded-full"></span>
                        Матчи
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Расписание и результаты матчей мини-футбола
                    </p>
                </div>

                {/* Filters and Stats */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <MatchFilters currentFilter={activeFilter} onFilterChange={handleFilterChange} />

                    {!isLoading && (
                        <div className="flex gap-4 text-sm">
                            {liveCount > 0 && (
                                <span className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                    <span className="text-gray-600">Live: {liveCount}</span>
                                </span>
                            )}
                            <span className="text-gray-400">
                                Предстоящие: {upcomingCount}
                            </span>
                            <span className="text-gray-400">
                                Завершённые: {finishedCount}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                {isLoading ? (
                    <MatchGridSkeleton />
                ) : matchesError ? (
                    <ErrorState onRetry={handleRetry} />
                ) : filteredMatches.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visibleMatches.map((match) => (
                                <div key={match.id} className="h-full">
                                    <MatchCard match={match} />
                                </div>
                            ))}
                        </div>

                        {hasMore && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={handleLoadMore}
                                    className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 hover:border-kmff-blue/30 transition-all duration-300"
                                >
                                    Показать ещё
                                </button>
                            </div>
                        )}

                        <p className="text-center text-gray-400 text-sm mt-4">
                            Показано {visibleMatches.length} из {filteredMatches.length} матчей
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
