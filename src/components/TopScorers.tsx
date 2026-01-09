"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useScorers } from '@/hooks/useScorers';
import { useMemo } from 'react';
import { getImageUrl } from '@/utils/image';

const TopScorers = () => {
    const { activeTournament } = useOrganization();
    const leagueId = activeTournament?.type === 'league' ? activeTournament.id : undefined;
    const cupId = activeTournament?.type === 'cup' ? activeTournament.id : undefined;

    const { scorers: apiScorers, isLoading, isError } = useScorers(leagueId, cupId);

    const scorers = useMemo(() => {
        if (!apiScorers) return [];

        return apiScorers
            .map(scorer => ({
                id: scorer.player.id,
                name: `${scorer.player.firstname} ${scorer.player.lastname}`,
                team: scorer.team.name,
                goals: scorer.scored,
                image: scorer.player.image,
            }))
            .sort((a, b) => b.goals - a.goals)
            .slice(0, 5);
    }, [apiScorers]);

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="mb-4">
                    <h3 className="font-display font-medium text-h2 text-gray-900 flex items-center gap-2">
                        <span className="w-1 h-5 bg-primary-500 rounded-sm" />
                        Бомбардиры
                    </h3>
                </div>
                <div className="font-display text-sm text-center text-gray-500 py-8">
                    Загрузка...
                </div>
            </div>
        );
    }

    if (isError || scorers.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="mb-4">
                    <h3 className="font-display font-medium text-h2 text-gray-900 flex items-center gap-2">
                        <span className="w-1 h-5 bg-primary-500 rounded-sm" />
                        Бомбардиры
                    </h3>
                </div>
                <div className="font-display text-sm text-center text-gray-500 py-8">
                    {isError ? 'Ошибка' : 'Нет данных'}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-5">
            {/* Header */}
            <div className="mb-4">
                <h3 className="font-display font-medium text-h2 text-gray-900 flex items-center gap-2">
                    <span className="w-1 h-5 bg-primary-500 rounded-sm" />
                    Бомбардиры
                </h3>
            </div>

            <div className="space-y-4">
                {/* Top Scorer - Highlighted Card */}
                <Link href={`/player/${scorers[0].id}`}>
                    <div className="rounded-lg shadow-md bg-gradient-to-br from-primary-100 to-primary-50 p-4 hover:shadow-lg transition-shadow group relative overflow-hidden border border-primary-200">
                        <div className="relative z-10">
                            {/* Goals - Large Typography */}
                            <div className="font-display text-display font-semibold leading-none mb-2 text-primary-600">
                                {scorers[0].goals}
                            </div>
                            <div className="font-display text-xs text-gray-500 mb-3">
                                голов
                            </div>

                            {/* Player Name - Bold */}
                            <div className="font-display text-h2 font-semibold leading-tight mb-1 text-gray-900">
                                {scorers[0].name}
                            </div>

                            {/* Team */}
                            <div className="font-display text-base text-gray-600">
                                {scorers[0].team}
                            </div>
                        </div>

                        {/* Player Image - Bottom Right */}
                        <div className="absolute -bottom-2 -right-4 w-32 h-40">
                            <Image
                                src={getImageUrl(scorers[0].image) || '/player-1.png'}
                                alt={scorers[0].name}
                                fill
                                sizes="128px"
                                className="object-contain object-bottom"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/player-1.png';
                                }}
                            />
                        </div>
                    </div>
                </Link>

                {/* Rest of Scorers - Clean List */}
                <div className="rounded-lg bg-white overflow-hidden border border-gray-200">
                    {scorers.slice(1).map((player, index) => (
                        <Link key={player.id} href={`/player/${player.id}`}>
                            <div className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors group">
                                {/* Left: Position + Name */}
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    {/* Position Number */}
                                    <span className="font-display text-sm font-semibold w-6 text-center flex-shrink-0 text-gray-500">
                                        {index + 2}
                                    </span>

                                    {/* Player Info */}
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-display text-sm font-semibold truncate text-gray-900">
                                            {player.name}
                                        </span>
                                        <span className="font-display text-xs text-gray-500 truncate">
                                            {player.team}
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Goals */}
                                <span className="font-display text-xl font-semibold flex-shrink-0 text-primary-600">
                                    {player.goals}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopScorers;
