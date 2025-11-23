"use client";

import Image from 'next/image';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useScorers } from '@/hooks/useScorers';
import { useMemo } from 'react';
import { getImageUrl } from '@/utils/image';

const TopScorers = () => {
    const { activeTournament } = useOrganization();
    const leagueId = activeTournament?.type === 'league' ? activeTournament.id : undefined;
    const cupId = activeTournament?.type === 'cup' ? activeTournament.id : undefined;

    const { scorers: apiScorers, isLoading, isError } = useScorers(leagueId, cupId);

    // Маппинг API данных в формат компонента
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
            <div className="space-y-6">
                <div className="text-center py-8 text-gray-400">Загрузка...</div>
            </div>
        );
    }

    if (isError || scorers.length === 0) {
        return (
            <div className="text-center py-8 text-gray-400">
                {isError ? 'Ошибка загрузки данных' : `Нет данных для ${activeTournament?.name || 'данного турнира'}`}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Top Scorer Highlight */}
            <div className="relative bg-white rounded-xl p-4 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="relative z-10 w-2/3">
                    <div className="text-4xl font-bold mb-1 text-kmff-blue">{scorers[0].goals}</div>
                    <div className="text-xs mb-2 text-gray-600">голов</div>
                    <div className="font-bold text-lg leading-tight mb-1 text-gray-900">{scorers[0].name}</div>
                    <div className="text-xs text-gray-600">{scorers[0].team}</div>
                </div>

                {/* Cutout Image */}
                <div className="absolute -bottom-2 -right-4 w-32 h-40">
                    <Image
                        src={getImageUrl(scorers[0].image) || '/player-1.png'}
                        alt={scorers[0].name}
                        fill
                        sizes="(max-width: 768px) 100px, 150px"
                        className="object-contain object-bottom drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/player-1.png';
                        }}
                    />
                </div>
            </div>

            {/* List */}
            <div className="space-y-3">
                {scorers.slice(1).map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-white/5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-default">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400 font-bold w-4">{index + 2}</span>
                            <div className="flex flex-col">
                                <span className="font-bold text-white">{player.name}</span>
                                <span className="text-xs text-gray-400">{player.team}</span>
                            </div>
                        </div>
                        <span className="font-bold text-white">{player.goals}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopScorers;
