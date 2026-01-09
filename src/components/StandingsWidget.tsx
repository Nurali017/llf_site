"use client";

import Link from 'next/link';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useStandings } from '@/hooks/useStandings';
import { getImageUrl } from '@/utils/image';
import CupStandingsWidget from './CupStandingsWidget';
import TournamentSelector from './TournamentSelector';

const StandingsWidget = () => {
    const { activeTournament, selectedOrganization } = useOrganization();

    const leagueId = activeTournament?.type === 'league' ? activeTournament.id : undefined;
    const { standings, isLoading, isError } = useStandings(leagueId, undefined);

    // Header component (reusable)
    const Header = () => (
        <div className="bg-kmff-dark rounded-t-lg p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h3 className="font-display font-medium text-lg sm:text-h2 text-white flex items-center gap-2">
                        <span className="w-1 h-5 bg-primary-400 rounded-sm" />
                        Турнирная таблица
                    </h3>
                    <p className="font-display text-xs text-white/60 mt-1 pl-3">{selectedOrganization?.name}</p>
                </div>
                <TournamentSelector />
            </div>
        </div>
    );

    // Cup standings
    if (activeTournament?.type === 'cup' && activeTournament.id) {
        return (
            <div className="rounded-lg border border-gray-200 overflow-hidden">
                <Header />
                <div className="bg-white p-4 sm:p-5">
                    <CupStandingsWidget cupId={activeTournament.id} />

                    {/* Legend */}
                    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200 font-display text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Плэй-офф</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="rounded-lg border border-gray-200 overflow-hidden">
                <Header />
                <div className="bg-white p-4 sm:p-5">
                    <div className="font-display text-sm text-center text-gray-500 py-8">
                        Загрузка...
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-lg border border-gray-200 overflow-hidden">
                <Header />
                <div className="bg-white p-4 sm:p-5">
                    <div className="font-display text-sm text-center text-accent-red py-8">
                        Ошибка загрузки
                    </div>
                </div>
            </div>
        );
    }

    if (!standings || standings.length === 0) {
        return (
            <div className="rounded-lg border border-gray-200 overflow-hidden">
                <Header />
                <div className="bg-white p-4 sm:p-5">
                    <div className="font-display text-sm text-center text-gray-500 py-8">
                        Нет данных
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-gray-200 overflow-hidden">
            {/* Header - Dark Blue */}
            <Header />

            {/* Content - White */}
            <div className="bg-white">
                {/* Table */}
                <div className="overflow-x-auto">
                    {/* Table Header */}
                    <div className="grid grid-cols-[30px_1fr_30px_40px_40px] sm:grid-cols-[35px_1fr_35px_50px_50px] gap-2 sm:gap-3 bg-primary-700 text-white p-2 sm:p-3 font-display text-xs font-medium">
                        <div className="text-center">#</div>
                        <div>Команда</div>
                        <div className="text-center">И</div>
                        <div className="text-center">РМ</div>
                        <div className="text-center">О</div>
                    </div>

                    {/* Table Rows */}
                    {standings.map((standing, index) => {
                        if (!standing.team) return null;

                        const diff = standing.scored - standing.missed;
                        const diffText = diff > 0 ? `+${diff}` : `${diff}`;

                        const isFirst = index === 0;
                        const bgClass = isFirst ? 'bg-primary-50' : 'bg-white';

                        return (
                            <Link key={standing.team.id || index} href={`/team/${standing.team.id}`}>
                                <div
                                    className={`grid grid-cols-[30px_1fr_30px_40px_40px] sm:grid-cols-[35px_1fr_35px_50px_50px] gap-2 sm:gap-3 p-2 sm:p-3 border-b border-gray-200 last:border-b-0 ${bgClass} hover:bg-gray-50 transition-colors`}
                                >
                                    <div className="font-display text-xs sm:text-sm font-semibold text-center text-gray-900">
                                        {index + 1}
                                    </div>
                                    <div className="flex items-center gap-2 min-w-0">
                                        <img
                                            src={getImageUrl(standing.team.image)}
                                            alt={standing.team.name}
                                            className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
                                            loading="lazy"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/llf-logo.png';
                                            }}
                                        />
                                        <span className="font-display text-xs sm:text-sm font-medium text-gray-800 truncate">
                                            {standing.team.name}
                                        </span>
                                    </div>
                                    <div className="font-display text-xs sm:text-sm text-center text-gray-600">
                                        {standing.game_count}
                                    </div>
                                    <div className="font-display text-xs sm:text-sm text-center font-semibold text-gray-700">
                                        {diffText}
                                    </div>
                                    <div className="font-display text-sm sm:text-lg font-semibold text-center text-primary-600">
                                        {standing.point}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-2 sm:gap-3 p-4 sm:p-5 border-t border-gray-200 font-display text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        <span>1-е место</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        <span>2-е место</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-amber-600" />
                        <span>3-е место</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <span>Вылет</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StandingsWidget;
