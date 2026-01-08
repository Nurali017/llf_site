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
 * Brutally Minimal Match Card
 * Horizontal layout with giant scores (180px), 2px borders, grayscale logos
 */
export const MatchCard = React.memo(function MatchCard({ match }: MatchCardProps) {
    return (
        <Link href={`/match/${match.id}`} className="min-w-[340px] md:min-w-[400px] snap-center block group">
            <div className="border-2 border-mono-100 bg-mono-0 hover:bg-accent-lime transition-colors relative">

                {/* Floating Rotated Date Label - Brutalist Detail */}
                <div className="absolute -left-2 top-6 -rotate-90 origin-left z-10">
                    <span className="font-mono text-micro uppercase tracking-wider bg-mono-100 text-mono-0 px-2 py-1 inline-block">
                        {match.date}
                    </span>
                </div>

                {/* Main Content - Horizontal Layout */}
                <div className="flex items-center justify-between p-8 min-h-[180px]">

                    {/* Home Team - Left */}
                    <div className="flex flex-col items-center gap-3 w-[100px] flex-shrink-0">
                        <div className="w-20 h-20 relative">
                            <Image
                                src={getImageUrl(match.homeTeamImage)}
                                alt={match.homeTeam}
                                fill
                                className="object-contain grayscale group-hover:grayscale-0 transition-all"
                                sizes="80px"
                                loading="lazy"
                            />
                        </div>
                        <span className="font-display text-sm font-bold uppercase text-center leading-tight">
                            {match.homeTeam}
                        </span>
                    </div>

                    {/* Score - Giant Typography Center */}
                    <div className="flex flex-col items-center flex-1 mx-4">
                        {match.status === 'upcoming' ? (
                            <div className="font-mono text-h3 font-medium tracking-wider">
                                {match.time}
                            </div>
                        ) : (
                            <>
                                <div className={`font-display font-bold tracking-tighter ${
                                    match.status === 'live'
                                        ? 'text-accent-red animate-pulse text-[7rem] md:text-[8rem] leading-none'
                                        : 'text-[7rem] md:text-[8rem] leading-none'
                                }`}>
                                    {match.homeScore}
                                    <span className="mx-2 md:mx-4">—</span>
                                    {match.awayScore}
                                </div>
                                {match.status === 'live' && (
                                    <div className="mt-2 bg-accent-red text-mono-0 px-3 py-1 font-mono text-micro uppercase">
                                        LIVE
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Away Team - Right */}
                    <div className="flex flex-col items-center gap-3 w-[100px] flex-shrink-0">
                        <div className="w-20 h-20 relative">
                            <Image
                                src={getImageUrl(match.awayTeamImage)}
                                alt={match.awayTeam}
                                fill
                                className="object-contain grayscale group-hover:grayscale-0 transition-all"
                                sizes="80px"
                                loading="lazy"
                            />
                        </div>
                        <span className="font-display text-sm font-bold uppercase text-center leading-tight">
                            {match.awayTeam}
                        </span>
                    </div>

                </div>

                {/* Stadium Bar - Bottom with Monospace */}
                <div className="border-t-2 border-mono-100 bg-mono-5 px-8 py-3">
                    <span className="font-mono text-micro uppercase tracking-wider text-mono-100">
                        {match.stadium}
                    </span>
                </div>

            </div>
        </Link>
    );
});
