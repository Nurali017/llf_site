"use client";

import { useOrganization } from '@/contexts/OrganizationContext';
import TopScorers from './TopScorers';
import StandingsWidget from './StandingsWidget';
import TournamentSelector from './TournamentSelector';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Aside() {
    const { selectedOrganization, activeTournament } = useOrganization();

    if (!selectedOrganization) {
        return (
            <aside className="bg-white rounded-2xl p-6">
                <div className="text-center py-8 text-gray-400">Загрузка...</div>
            </aside>
        );
    }

    return (
        <aside className="flex flex-col gap-8">
            {/* Standings Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
                {/* Dynamic Skewed Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-50/50 transition-colors duration-500" />

                <div className="relative z-10 flex flex-col gap-4 mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                            <h3 className="font-bold text-xl text-kmff-dark flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-kmff-blue -skew-x-12 rounded-sm" />
                                Турнирная таблица
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 pl-4.5">{selectedOrganization.name}</p>
                        </div>
                        <TournamentSelector />
                    </div>
                </div>
                <ErrorBoundary fallback={<div className="p-4 text-center text-gray-500">Ошибка загрузки таблицы</div>}>
                    <StandingsWidget />
                </ErrorBoundary>

                {/* Legend */}
                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                    {activeTournament?.type === 'cup' ? (
                        // Cup Legend
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span>Плэй-офф</span>
                        </div>
                    ) : (
                        // League Legend
                        <>
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
                        </>
                    )}
                </div>
            </div>

            {/* Top Scorers Section */}
            <div className="bg-gradient-to-br from-[#1e3a8a] via-[#172554] to-[#1e3a8a] rounded-2xl p-6 shadow-lg border border-white/10">
                <div className="flex flex-col gap-4 mb-6">
                    <div>
                        <h3 className="font-bold text-xl text-white">
                            Бомбардиры
                        </h3>
                    </div>
                </div>
                <TopScorers />
            </div>
        </aside>
    );
}
