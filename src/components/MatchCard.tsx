'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/utils/image';
import { Match } from '@/types/api';

export interface DisplayMatch {
    id: number;
    homeTeam: string;
    awayTeam: string;
    homeTeamImage: string;
    awayTeamImage: string;
    homeScore: number | string;
    awayScore: number | string;
    date: string;
    time: string;
    stadium: string;
    status: 'live' | 'upcoming' | 'finished';
    isLive?: boolean;
    rawDate?: Date;
}

interface MatchCardProps {
    match: DisplayMatch;
}

/**
 * Minimalist Match Card
 * Horizontal layout with moderate scores (64px), rounded corners, soft shadows
 */
export const MatchCard = React.memo(function MatchCard({ match }: MatchCardProps) {
    return (
        <Link href={`/match/${match.id}`} className="min-w-[340px] md:min-w-[400px] snap-center block group">
            <div className="rounded-lg border border-neutral-200 bg-white hover:border-primary-500 transition-colors relative">

                {/* Date Label - Top Center */}
                <div className="flex justify-center pt-3 pb-2">
                    <span className="font-display text-xs font-medium bg-primary-900 text-white px-3 py-1 rounded-sm">
                        {match.date}
                    </span>
                </div>

                {/* Main Content - Horizontal Layout */}
                <div className="flex items-center justify-between px-6 pb-6 min-h-[120px]">

                    {/* Home Team - Left */}
                    <div className="flex flex-col items-center gap-2 w-[90px] flex-shrink-0">
                        <div className="w-16 h-16 relative">
                            <Image
                                src={getImageUrl(match.homeTeamImage)}
                                alt={match.homeTeam}
                                fill
                                className="object-contain transition-transform group-hover:scale-105"
                                sizes="64px"
                                loading="lazy"
                            />
                        </div>
                        <span className="font-display text-xs font-medium text-center leading-tight text-neutral-800">
                            {match.homeTeam}
                        </span>
                    </div>

                    {/* Score - Moderate Typography Center */}
                    <div className="flex flex-col items-center flex-1 mx-3">
                        {match.status === 'upcoming' ? (
                            <div className="font-display text-2xl font-semibold text-neutral-700">
                                {match.time}
                            </div>
                        ) : (
                            <>
                                <div className={`font-display font-semibold tracking-tight ${
                                    match.status === 'live'
                                        ? 'text-accent-red animate-pulse text-hero leading-none'
                                        : 'text-hero leading-none text-neutral-900'
                                }`}>
                                    {match.homeScore}
                                    <span className="mx-3">—</span>
                                    {match.awayScore}
                                </div>
                                {match.status === 'live' && (
                                    <div className="mt-2 bg-accent-green text-white px-3 py-1 rounded font-display text-xs font-medium">
                                        LIVE
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Away Team - Right */}
                    <div className="flex flex-col items-center gap-2 w-[90px] flex-shrink-0">
                        <div className="w-16 h-16 relative">
                            <Image
                                src={getImageUrl(match.awayTeamImage)}
                                alt={match.awayTeam}
                                fill
                                className="object-contain transition-transform group-hover:scale-105"
                                sizes="64px"
                                loading="lazy"
                            />
                        </div>
                        <span className="font-display text-xs font-medium text-center leading-tight text-neutral-800">
                            {match.awayTeam}
                        </span>
                    </div>

                </div>

                {/* Stadium Bar - Bottom */}
                <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-2 rounded-b-lg">
                    <span className="font-display text-sm text-neutral-600">
                        {match.stadium}
                    </span>
                </div>

            </div>
        </Link>
    );
});
