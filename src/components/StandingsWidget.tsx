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
            <div className="border-2 border-mono-100 p-8">
                <div className="font-mono text-micro uppercase tracking-wider text-center">
                    Загрузка...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="border-2 border-mono-100 p-8">
                <div className="font-mono text-micro uppercase tracking-wider text-center text-accent-red">
                    Ошибка загрузки
                </div>
            </div>
        );
    }

    if (!standings || standings.length === 0) {
        return (
            <div className="border-2 border-mono-100 p-8">
                <div className="font-mono text-micro uppercase tracking-wider text-center">
                    Нет данных
                </div>
            </div>
        );
    }

    return (
        <div className="border-2 border-mono-100">
            {/* Table Header - Black Background */}
            <div className="grid grid-cols-[40px_1fr_40px_60px_60px] gap-4 bg-mono-100 text-mono-0 p-4 font-mono text-micro uppercase tracking-wider">
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

                // 1st place gets lime background
                const isFirst = index === 0;
                const bgClass = isFirst ? 'bg-accent-lime' : 'bg-mono-0';

                return (
                    <Link key={standing.team.id || index} href={`/team/${standing.team.id}`}>
                        <div
                            className={`grid grid-cols-[40px_1fr_40px_60px_60px] gap-4 p-4 border-b border-mono-100 ${bgClass} hover:bg-accent-lime transition-colors group`}
                        >
                            {/* Position */}
                            <div className="font-mono text-body font-bold text-center">
                                {index + 1}
                            </div>

                            {/* Team */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={getImageUrl(standing.team.image)}
                                    alt={standing.team.name}
                                    className="w-8 h-8 object-contain grayscale"
                                    loading="lazy"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/llf-logo.png';
                                    }}
                                />
                                <span className="font-display text-body font-bold uppercase truncate">
                                    {standing.team.name}
                                </span>
                            </div>

                            {/* Games Played */}
                            <div className="font-mono text-body text-center">
                                {standing.game_count}
                            </div>

                            {/* Goal Difference */}
                            <div className="font-mono text-body text-center font-bold">
                                {diffText}
                            </div>

                            {/* Points - Large Typography */}
                            <div className="font-display text-h3 font-bold text-center">
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
