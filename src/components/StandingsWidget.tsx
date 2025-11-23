"use client";

import { useOrganization } from '@/contexts/OrganizationContext';
import { useStandings } from '@/hooks/useStandings';
import { getImageUrl } from '@/utils/image';
import CupStandingsWidget from './CupStandingsWidget';

const StandingsWidget = () => {
    const { activeTournament } = useOrganization();

    const leagueId = activeTournament?.type === 'league' ? activeTournament.id : undefined;
    // We handle cups separately with CupStandingsWidget, so we don't need to fetch standings here for cups
    const { standings, isLoading, isError } = useStandings(leagueId, undefined);

    if (activeTournament?.type === 'cup' && activeTournament.id) {
        return <CupStandingsWidget cupId={activeTournament.id} />;
    }

    if (isLoading) {
        return <div className="text-center py-8 text-gray-400">Загрузка...</div>;
    }

    if (isError) {
        return <div className="text-center py-8 text-red-500">Ошибка загрузки данных</div>;
    }

    if (!standings || standings.length === 0) {
        return <div className="text-center py-8 text-gray-400">Нет данных</div>;
    }

    return (
        <div className="space-y-2">
            {/* Table Header */}
            <div className="grid grid-cols-[24px_1fr_28px_44px_32px] gap-2 items-center text-xs text-gray-400 font-medium px-2 py-2">
                <div className="text-center">#</div>
                <div>Команда</div>
                <div className="text-center">И</div>
                <div className="text-center">РМ</div>
                <div className="text-center">О</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-1">
                {standings.map((standing, index) => {
                    if (!standing.team) return null;

                    // Qualification zones logic
                    let borderClass = 'border-l-4 border-transparent'; // Default

                    if (index === 0) borderClass = 'border-l-4 border-yellow-400'; // Gold
                    else if (index === 1) borderClass = 'border-l-4 border-gray-300'; // Silver
                    else if (index === 2) borderClass = 'border-l-4 border-amber-600'; // Bronze
                    else if (index >= standings.length - 3) borderClass = 'border-l-4 border-red-500/50'; // Relegation (Last 3)

                    // Goal Difference Calculation
                    const diff = standing.scored - standing.missed;
                    const diffColor = diff > 0 ? 'text-emerald-400' : diff < 0 ? 'text-red-400' : 'text-gray-400';
                    const diffText = diff > 0 ? `+${diff}` : `${diff}`;

                    return (
                        <div
                            key={standing.team.id || index}
                            className={`grid grid-cols-[24px_1fr_28px_44px_32px] gap-2 items-center ${borderClass} bg-transparent hover:bg-white/5 transition-colors duration-200 py-2 px-2 rounded-r-lg cursor-pointer`}
                        >
                            <div className="text-gray-400 font-medium text-xs text-center">{index + 1}</div>
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-white/10 rounded-full p-0.5 overflow-hidden">
                                    <img
                                        src={getImageUrl(standing.team.image)}
                                        alt={standing.team.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/llf-logo.png';
                                        }}
                                    />
                                </span>
                                <span className="text-white font-semibold text-sm truncate">{standing.team.name}</span>
                            </div>
                            <div className="text-gray-400 text-xs text-center">{standing.game_count}</div>
                            <div className={`text-xs font-medium text-center ${diffColor}`}>
                                {diffText}
                            </div>
                            <div className="text-white font-bold text-base text-center">{standing.point}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StandingsWidget;
