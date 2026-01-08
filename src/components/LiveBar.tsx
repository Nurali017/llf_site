"use client";

import { useLiveMatches } from '@/hooks/useMatches';
import { useOrganization } from '@/contexts/OrganizationContext';
import Link from 'next/link';

export default function LiveBar() {
    const { selectedOrganization } = useOrganization();
    const { liveMatches, isLoading } = useLiveMatches(selectedOrganization?.id);

    if (isLoading || !liveMatches || liveMatches.length === 0) {
        return null;
    }

    return (
        <div className="bg-mono-100 text-mono-0 py-3 overflow-hidden border-t-2 border-b-2 border-accent-lime">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-6">
                    {/* LIVE Indicator - Brutalist */}
                    <span className="flex items-center gap-2 font-mono text-micro font-bold uppercase tracking-wider shrink-0">
                        <span className="w-3 h-3 bg-accent-lime animate-pulse" />
                        LIVE
                    </span>

                    {/* Live Matches Carousel */}
                    <div className="flex gap-8 overflow-x-auto scrollbar-hide">
                        {liveMatches.map(match => (
                            <Link
                                key={match.id}
                                href={`/match/${match.id}`}
                                className="flex items-center gap-3 whitespace-nowrap hover:text-accent-lime transition-colors duration-150 shrink-0"
                            >
                                {/* Team 1 */}
                                <span className="font-display text-body font-bold uppercase">
                                    {match.team_1.name}
                                </span>

                                {/* Score - Extra Bold */}
                                <span className="font-display text-h3 font-bold tracking-tight">
                                    {match.team_1.goals ?? 0}—{match.team_2.goals ?? 0}
                                </span>

                                {/* Team 2 */}
                                <span className="font-display text-body font-bold uppercase">
                                    {match.team_2.name}
                                </span>

                                {/* Time - Monospace */}
                                <span className="font-mono text-micro opacity-70 ml-2">
                                    {match.current_time}&apos;
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
