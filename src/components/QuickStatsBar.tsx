"use client";

import { Zap, Calendar, Users, Trophy } from 'lucide-react';
import { useLiveMatches, useMatches } from '@/hooks/useMatches';
import { useOrganization } from '@/contexts/OrganizationContext';

export default function QuickStatsBar() {
    const { selectedOrganization, tournaments } = useOrganization();
    const { liveMatches } = useLiveMatches(selectedOrganization?.id);
    const { matches } = useMatches(selectedOrganization?.id);

    const liveCount = liveMatches?.length || 0;
    const todayCount = matches?.filter(m => {
        const matchDate = new Date(m.time).toDateString();
        const today = new Date().toDateString();
        return matchDate === today;
    }).length || 0;

    // Count unique teams from all matches
    const uniqueTeamIds = new Set<number>();
    matches?.forEach(match => {
        uniqueTeamIds.add(match.team_1.id);
        uniqueTeamIds.add(match.team_2.id);
    });
    liveMatches?.forEach(match => {
        uniqueTeamIds.add(match.team_1.id);
        uniqueTeamIds.add(match.team_2.id);
    });
    const teamsCount = uniqueTeamIds.size;
    const tournamentsCount = tournaments?.length || 0;

    const stats = [
        { icon: Zap, value: liveCount, label: 'LIVE', isLive: true, pulse: liveCount > 0 },
        { icon: Calendar, value: todayCount, label: 'Сегодня', isLive: false, pulse: false },
        { icon: Users, value: teamsCount, label: 'Команд', isLive: false, pulse: false },
        { icon: Trophy, value: tournamentsCount, label: 'Турниров', isLive: false, pulse: false },
    ];

    return (
        <div className="bg-mono-100 border-y-2 border-mono-0 py-4">
            <div className="container mx-auto px-4">
                {/* Brutalist Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`flex flex-col items-center justify-center py-4 border-2 border-mono-0 ${
                                stat.isLive && stat.pulse ? 'bg-accent-lime' : 'bg-mono-100'
                            }`}
                        >
                            {/* Icon */}
                            <stat.icon
                                className={`w-6 h-6 mb-3 ${
                                    stat.isLive && stat.pulse ? 'text-mono-100 animate-pulse' : 'text-mono-0'
                                }`}
                            />

                            {/* Giant Number - Monospace */}
                            <span className={`font-mono text-h1 font-bold leading-none mb-2 ${
                                stat.isLive && stat.pulse ? 'text-mono-100' : 'text-mono-0'
                            }`}>
                                {stat.value}
                            </span>

                            {/* Label - Uppercase Monospace */}
                            <span className={`font-mono text-micro uppercase tracking-wider ${
                                stat.isLive && stat.pulse ? 'text-mono-100 opacity-80' : 'text-mono-0 opacity-70'
                            }`}>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
