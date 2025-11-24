'use client';

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

export function MatchCard({ match }: MatchCardProps) {
    return (
        <Link href={`/match/${match.id}`} className="min-w-[280px] md:min-w-[300px] snap-center block group h-full">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm group-hover:shadow-lg group-hover:border-kmff-blue transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col relative overflow-hidden">

                {/* Date - Top Center */}
                <div className="text-center mb-4">
                    <span className="text-sm font-bold text-kmff-dark uppercase tracking-wide">
                        {match.date}
                    </span>
                </div>

                {/* Main Content: Logos and Score */}
                <div className="flex items-center justify-between mb-4 px-2">
                    {/* Home Team Logo */}
                    <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                            src={getImageUrl(match.homeTeamImage)}
                            alt={`Логотип команды ${match.homeTeam}`}
                            fill
                            className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                            sizes="64px"
                            loading="lazy"
                            onError={(e) => {
                                // Fallback handled by next/image if configured or parent
                            }}
                        />
                    </div>

                    {/* Score */}
                    <div className="flex flex-col items-center mx-4">
                        <div className={`text-4xl font-black tracking-tighter ${match.status === 'live' ? 'text-red-600 animate-pulse' : 'text-kmff-dark'}`}>
                            {match.status === 'upcoming' ? (
                                <span className="text-2xl">{match.time}</span>
                            ) : (
                                `${match.homeScore}-${match.awayScore}`
                            )}
                        </div>
                        {match.status === 'live' && (
                            <span className="text-[10px] font-bold text-white bg-red-600 px-2 py-0.5 rounded-full mt-1">LIVE</span>
                        )}
                    </div>

                    {/* Away Team Logo */}
                    <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                            src={getImageUrl(match.awayTeamImage)}
                            alt={`Логотип команды ${match.awayTeam}`}
                            fill
                            className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                            sizes="64px"
                            loading="lazy"
                            onError={(e) => {
                                // Fallback handled by next/image if configured or parent
                            }}
                        />
                    </div>
                </div>

                {/* Footer: Team Names & Stadium */}
                <div className="text-center mt-auto space-y-1">
                    <div className="flex items-center justify-center gap-2 text-sm font-black text-gray-800 leading-tight">
                        <span className="truncate max-w-[100px]" title={match.homeTeam}>{match.homeTeam}</span>
                        <span className="text-black">—</span>
                        <span className="truncate max-w-[100px]" title={match.awayTeam}>{match.awayTeam}</span>
                    </div>
                    <div className="text-xs text-black font-bold truncate px-4">
                        {match.stadium}
                    </div>
                </div>
            </div>
        </Link>
    );
}
