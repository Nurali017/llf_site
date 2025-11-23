"use client";

import { useOrganization } from '@/contexts/OrganizationContext';
import TopScorers from './TopScorers';
import StandingsWidget from './StandingsWidget';
import TournamentSelector from './TournamentSelector';

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
            <div className="bg-gradient-to-br from-[#1e3a8a] via-[#172554] to-[#1e3a8a] rounded-2xl p-6 shadow-lg border border-white/10">
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                            <h3 className="font-bold text-xl text-white">
                                Турнирная таблица
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">{selectedOrganization.name}</p>
                        </div>
                        <TournamentSelector />
                    </div>
                </div>
                <StandingsWidget />

                {/* Legend */}
                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/10 text-xs text-gray-400">
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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col gap-4 mb-6">
                    <div>
                        <h3 className="font-bold text-xl text-qjl-dark">
                            Бомбардиры
                        </h3>
                    </div>
                </div>
                <TopScorers />
            </div>
        </aside>
    );
}
