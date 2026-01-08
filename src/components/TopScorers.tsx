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
            <div className="border-2 border-mono-100 p-8">
                <div className="font-mono text-micro uppercase tracking-wider text-center">
                    Загрузка...
                </div>
            </div>
        );
    }

    if (isError || scorers.length === 0) {
        return (
            <div className="border-2 border-mono-100 p-8">
                <div className="font-mono text-micro uppercase tracking-wider text-center">
                    {isError ? 'Ошибка' : 'Нет данных'}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Top Scorer - Brutally Minimal Highlight */}
            <Link href={`/player/${scorers[0].id}`}>
                <div className="border-4 border-mono-100 p-6 hover:bg-accent-lime transition-colors group relative overflow-hidden">
                    <div className="relative z-10">
                        {/* Goals - Giant Typography */}
                        <div className="font-display text-[6rem] font-bold leading-none mb-2">
                            {scorers[0].goals}
                        </div>
                        <div className="font-mono text-micro uppercase tracking-wider opacity-60 mb-4">
                            голов
                        </div>

                        {/* Player Name - Bold */}
                        <div className="font-display text-h3 font-bold leading-tight mb-2">
                            {scorers[0].name}
                        </div>

                        {/* Team - Monospace */}
                        <div className="font-mono text-label uppercase opacity-60">
                            {scorers[0].team}
                        </div>
                    </div>

                    {/* Player Image - Grayscale, Bottom Right */}
                    <div className="absolute -bottom-2 -right-4 w-32 h-40 opacity-30 group-hover:opacity-60 transition-opacity">
                        <Image
                            src={getImageUrl(scorers[0].image) || '/player-1.png'}
                            alt={scorers[0].name}
                            fill
                            sizes="128px"
                            className="object-contain object-bottom grayscale"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/player-1.png';
                            }}
                        />
                    </div>
                </div>
            </Link>

            {/* Rest of Scorers - Minimal List */}
            <div className="border-2 border-mono-100">
                {scorers.slice(1).map((player, index) => (
                    <Link key={player.id} href={`/player/${player.id}`}>
                        <div className="flex items-center justify-between p-4 border-b border-mono-100 last:border-b-0 hover:bg-accent-lime transition-colors group">
                            {/* Left: Position + Name */}
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                {/* Position Number */}
                                <span className="font-mono text-body font-bold w-6 text-center flex-shrink-0">
                                    {index + 2}
                                </span>

                                {/* Player Info */}
                                <div className="flex flex-col min-w-0">
                                    <span className="font-display text-body font-bold uppercase truncate">
                                        {player.name}
                                    </span>
                                    <span className="font-mono text-micro uppercase opacity-60 truncate">
                                        {player.team}
                                    </span>
                                </div>
                            </div>

                            {/* Right: Goals */}
                            <span className="font-display text-h3 font-bold flex-shrink-0">
                                {player.goals}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TopScorers;
