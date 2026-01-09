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
        <div className="bg-kmff-dark text-white py-3 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4">
                    {/* LIVE Indicator */}
                    <span className="flex items-center gap-2 font-display text-sm font-semibold shrink-0">
                        <span className="w-3 h-3 bg-accent-green rounded-full animate-pulse" />
                        LIVE
                    </span>

                    {/* Live Matches Carousel */}
                    <div className="flex gap-5 overflow-x-auto scrollbar-hide">
                        {liveMatches.map(match => (
                            <Link
                                key={match.id}
                                href={`/match/${match.id}`}
                                className="flex items-center gap-3 whitespace-nowrap hover:text-primary-100 transition-colors shrink-0"
                            >
                                {/* Team 1 */}
                                <span className="font-display text-base font-semibold">
                                    {match.team_1.name}
                                </span>

                                {/* Score */}
                                <span className="font-display text-2xl font-semibold tracking-tight">
                                    {match.team_1.goals ?? 0}—{match.team_2.goals ?? 0}
                                </span>

                                {/* Team 2 */}
                                <span className="font-display text-base font-semibold">
                                    {match.team_2.name}
                                </span>

                                {/* Time */}
                                <span className="font-display text-sm text-primary-100 ml-2">
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
