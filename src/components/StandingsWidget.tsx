"use client";

import Link from 'next/link';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useStandings } from '@/hooks/useStandings';
import { getImageUrl } from '@/utils/image';
import CupStandingsWidget from './CupStandingsWidget';

const StandingsWidget = () => {
    const { activeTournament } = useOrganization();

    const leagueId = activeTournament?.type === 'league' ? activeTournament.id : undefined;
    const { standings, isLoading, isError } = useStandings(leagueId, undefined);

    if (activeTournament?.type === 'cup' && activeTournament.id) {
        return <CupStandingsWidget cupId={activeTournament.id} />;
    }

    if (isLoading) {
        return (
            <div className="rounded-lg shadow-md bg-white p-8">
                <div className="font-display text-sm text-center text-neutral-600">
                    Загрузка...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-lg shadow-md bg-white p-8">
                <div className="font-display text-sm text-center text-accent-red">
                    Ошибка загрузки
                </div>
            </div>
        );
    }

    if (!standings || standings.length === 0) {
        return (
            <div className="rounded-lg shadow-md bg-white p-8">
                <div className="font-display text-sm text-center text-neutral-600">
                    Нет данных
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg shadow-md bg-white overflow-hidden">
            {/* Table Header - Blue Background */}
            <div className="grid grid-cols-[40px_1fr_40px_60px_60px] gap-4 bg-neutral-800 text-white p-4 font-display text-sm font-medium">
                <div className="text-center">#</div>
                <div>Команда</div>
                <div className="text-center">И</div>
                <div className="text-center">РМ</div>
                <div className="text-center">О</div>
            </div>

            {/* Table Rows */}
            {standings.map((standing, index) => {
                if (!standing.team) return null;

                // Goal Difference
                const diff = standing.scored - standing.missed;
                const diffText = diff > 0 ? `+${diff}` : `${diff}`;

                // 1st place gets blue background
                const isFirst = index === 0;
                const bgClass = isFirst ? 'bg-primary-50' : 'bg-white';

                return (
                    <Link key={standing.team.id || index} href={`/team/${standing.team.id}`}>
                        <div
                            className={`grid grid-cols-[40px_1fr_40px_60px_60px] gap-4 p-4 border-b border-neutral-200 last:border-b-0 ${bgClass} hover:bg-neutral-50 transition-colors group`}
                        >
                            {/* Position */}
                            <div className="font-display text-base font-bold text-center text-neutral-900">
                                {index + 1}
                            </div>

                            {/* Team */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={getImageUrl(standing.team.image)}
                                    alt={standing.team.name}
                                    className="w-8 h-8 object-contain"
                                    loading="lazy"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/llf-logo.png';
                                    }}
                                />
                                <span className="font-display text-base font-semibold truncate text-neutral-800">
                                    {standing.team.name}
                                </span>
                            </div>

                            {/* Games Played */}
                            <div className="font-display text-base text-center text-neutral-700">
                                {standing.game_count}
                            </div>

                            {/* Goal Difference */}
                            <div className="font-display text-base text-center font-semibold text-neutral-800">
                                {diffText}
                            </div>

                            {/* Points - Emphasized */}
                            <div className="font-display text-2xl font-bold text-center text-primary-600">
                                {standing.point}
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default StandingsWidget;
