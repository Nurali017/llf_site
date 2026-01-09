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
        <div className="bg-kmff-dark shadow-md">
            <div className="container mx-auto px-4">
                {/* Compact Inline Stats */}
                <div className="flex items-center justify-center gap-5 h-12">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-1.5"
                        >
                            {/* Icon */}
                            <stat.icon
                                className={`w-4 h-4 ${
                                    stat.isLive && stat.pulse ? 'text-accent-green animate-pulse' : 'text-white/60'
                                }`}
                            />

                            {/* Number */}
                            <span className={`font-display text-lg font-semibold ${
                                stat.isLive && stat.pulse ? 'text-accent-green' : 'text-white'
                            }`}>
                                {stat.value}
                            </span>

                            {/* Label */}
                            <span className="font-display text-micro text-white/80">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
