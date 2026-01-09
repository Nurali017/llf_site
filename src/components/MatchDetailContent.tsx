"use client";

import { useMatchProtocol } from '@/hooks/useMatchProtocol';
import { MatchEvent, MatchProtocol } from '@/types/api';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Skeleton } from '@/components/ui/Skeleton';
import { getImageUrl } from '@/utils/image';
import { formatMatchDate, formatTime } from '@/utils/formatting';
import { getStatusBadge as getStatusBadgeData } from '@/utils/match';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Users } from 'lucide-react';

interface MatchDetailContentProps {
    matchId: number;
}

function MatchSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-center gap-5">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <div className="text-center">
                        <Skeleton className="w-32 h-12 mx-auto mb-2" />
                        <Skeleton className="w-24 h-4 mx-auto" />
                    </div>
                    <Skeleton className="w-24 h-24 rounded-full" />
                </div>
            </div>
            {/* Events Skeleton */}
            <div className="bg-white rounded-lg p-4 border border-gray-100">
                <Skeleton className="w-32 h-6 mb-4" />
                <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="w-full h-12" />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="text-center py-12 bg-red-50 rounded-lg border border-red-100">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            <p className="text-gray-700 font-medium mb-2">Ошибка загрузки матча</p>
            <p className="text-gray-500 text-sm mb-4">Не удалось загрузить данные</p>
            <button
                onClick={onRetry}
                className="bg-kmff-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Повторить
            </button>
        </div>
    );
}

function getStatusBadge(status: string) {
    const { text, color } = getStatusBadgeData(status);

    if (status === 'FIRST_TIME' || status === 'SECOND_TIME' || status === 'OVERTIME' || status === 'PENALTIES') {
        return (
            <span className={`inline-flex items-center gap-1.5 ${color} text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse`}>
                <span className="w-2 h-2 bg-white rounded-full"></span>
                {text}
            </span>
        );
    }

    return (
        <span className={`${color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {text}
        </span>
    );
}

function EventIcon({ type }: { type: string }) {
    switch (type) {
        case 'goal':
            return <span className="text-base">&#9917;</span>;
        case 'own_goal':
            return <span className="text-base text-red-500">&#9917;</span>;
        case 'yellow':
            return <span className="w-3 h-4 bg-yellow-400 rounded-sm inline-block"></span>;
        case 'red':
            return <span className="w-3 h-4 bg-red-500 rounded-sm inline-block"></span>;
        default:
            return null;
    }
}

function EventRow({ event, isHomeTeam, isPenalty = false }: { event: MatchEvent; isHomeTeam: boolean; isPenalty?: boolean }) {
    const playerName = `${event.match_player.firstname} ${event.match_player.lastname}`.trim();
    const eventLabel = event.type === 'own_goal' ? '(а/г)' : '';
    const timeDisplay = event.time.split(':')[0] + "'";

    // Home team on left, Away team on right
    if (isHomeTeam) {
        return (
            <div className="grid grid-cols-[1fr_auto_1fr] items-center py-2 border-b border-gray-50">
                {/* Home team event - left side */}
                <div className="flex items-center gap-2 justify-start">
                    {!isPenalty && <span className="text-gray-400 text-sm w-8">{timeDisplay}</span>}
                    <EventIcon type={event.type} />
                    <span className="text-gray-800 font-medium text-sm">{playerName} {eventLabel}</span>
                </div>
                {/* Center divider */}
                <div className="w-px h-4 bg-gray-200 mx-4"></div>
                {/* Empty right side */}
                <div></div>
            </div>
        );
    } else {
        return (
            <div className="grid grid-cols-[1fr_auto_1fr] items-center py-2 border-b border-gray-50">
                {/* Empty left side */}
                <div></div>
                {/* Center divider */}
                <div className="w-px h-4 bg-gray-200 mx-4"></div>
                {/* Away team event - right side */}
                <div className="flex items-center gap-2 justify-end">
                    <span className="text-gray-800 font-medium text-sm">{playerName} {eventLabel}</span>
                    <EventIcon type={event.type} />
                    {!isPenalty && <span className="text-gray-400 text-sm w-8 text-right">{timeDisplay}</span>}
                </div>
            </div>
        );
    }
}

function PenaltyIcon({ scored }: { scored: boolean }) {
    if (scored) {
        return (
            <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                &#10003;
            </span>
        );
    }
    return (
        <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
            &#10005;
        </span>
    );
}

function PenaltyRow({ event, isHomeTeam }: { event: MatchEvent; isHomeTeam: boolean }) {
    const playerName = `${event.match_player.firstname} ${event.match_player.lastname}`.trim();
    const isScored = event.success === true;

    if (isHomeTeam) {
        return (
            <div className="grid grid-cols-[1fr_auto_1fr] items-center py-2 border-b border-gray-50">
                <div className="flex items-center gap-2 justify-start">
                    <PenaltyIcon scored={isScored} />
                    <span className="text-gray-800 font-medium text-sm">{playerName}</span>
                </div>
                <div className="w-px h-4 bg-gray-200 mx-4"></div>
                <div></div>
            </div>
        );
    } else {
        return (
            <div className="grid grid-cols-[1fr_auto_1fr] items-center py-2 border-b border-gray-50">
                <div></div>
                <div className="w-px h-4 bg-gray-200 mx-4"></div>
                <div className="flex items-center gap-2 justify-end">
                    <span className="text-gray-800 font-medium text-sm">{playerName}</span>
                    <PenaltyIcon scored={isScored} />
                </div>
            </div>
        );
    }
}

function getYouTubeVideoId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([^&\s?]+)/,
        /youtube\.com\/live\/([^&\s?]+)/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

function YouTubePlayer({ url }: { url: string }) {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                />
            </div>
        </div>
    );
}

function MatchEvents({ match }: { match: MatchProtocol }) {
    const allEvents = [
        ...match.first_time_events.map(e => ({ ...e, half: 1 })),
        ...match.second_time_events.map(e => ({ ...e, half: 2 })),
    ].sort((a, b) => {
        if (a.half !== b.half) return a.half - b.half;
        const timeA = parseInt(a.time.split(':')[0]);
        const timeB = parseInt(b.time.split(':')[0]);
        return timeA - timeB;
    });

    if (allEvents.length === 0) {
        return (
            <div className="text-center py-5 text-gray-400">
                Нет событий
            </div>
        );
    }

    const firstHalfEvents = allEvents.filter(e => e.half === 1);
    const secondHalfEvents = allEvents.filter(e => e.half === 2);

    return (
        <div className="space-y-6">
            {firstHalfEvents.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 text-center">1-й тайм</h4>
                    <div>
                        {firstHalfEvents.map(event => (
                            <EventRow
                                key={event.id}
                                event={event}
                                isHomeTeam={event.match_player.team_id === match.team_1.id}
                            />
                        ))}
                    </div>
                </div>
            )}

            {secondHalfEvents.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 text-center">2-й тайм</h4>
                    <div>
                        {secondHalfEvents.map(event => (
                            <EventRow
                                key={event.id}
                                event={event}
                                isHomeTeam={event.match_player.team_id === match.team_1.id}
                            />
                        ))}
                    </div>
                </div>
            )}

            {match.penalty_events.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 text-center">Серия пенальти</h4>
                    <div>
                        {match.penalty_events.map(event => (
                            <PenaltyRow
                                key={event.id}
                                event={event}
                                isHomeTeam={event.match_player.team_id === match.team_1.id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function TeamLineup({ team, isHome }: { team: MatchProtocol['team_1']; isHome: boolean }) {
    const players = team.players.length > 0 ? team.players : [];

    if (players.length === 0) {
        return (
            <div className="text-center py-4 text-gray-400 text-sm">
                Состав не указан
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {players.map(player => (
                <Link key={player.id} href={`/player/${player.id}`}>
                    <div
                        className={`flex items-center gap-3 py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer ${isHome ? '' : 'flex-row-reverse'}`}
                    >
                        <span className="w-6 h-6 bg-kmff-blue text-white rounded-full flex items-center justify-center text-xs font-medium">
                            {player.player_number}
                        </span>
                        <span className="text-gray-800 font-medium">
                            {player.firstname} {player.lastname}
                        </span>
                        <span className="text-gray-400 text-xs ml-auto">
                            {player.position === 'FORWARD' && 'Нападающий'}
                            {player.position === 'MIDFIELDER' && 'Полузащитник'}
                            {player.position === 'DEFENDER' && 'Защитник'}
                            {player.position === 'GOALKEEPER' && 'Вратарь'}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default function MatchDetailContent({ matchId }: MatchDetailContentProps) {
    const { match, isLoading, isError, refresh } = useMatchProtocol(matchId);

    const handleRetry = () => {
        refresh();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-5">
                <Breadcrumbs />

                {isLoading ? (
                    <MatchSkeleton />
                ) : isError || !match ? (
                    <ErrorState onRetry={handleRetry} />
                ) : (
                    <div className="space-y-6">
                        {/* Match Header */}
                        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                            {/* Tournament & Status */}
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-gray-500 font-medium">{match.tournament_name}</span>
                                {getStatusBadge(match.status)}
                            </div>

                            {/* Teams & Score */}
                            <div className="flex items-center justify-center gap-4 md:gap-5">
                                {/* Home Team */}
                                <Link href={`/team/${match.team_1.id}`} className="flex flex-col items-center text-center flex-1 hover:opacity-80 transition-opacity">
                                    <div className="w-20 h-20 md:w-24 md:h-24 relative mb-3">
                                        <Image
                                            src={getImageUrl(match.team_1.image)}
                                            alt={match.team_1.name}
                                            fill
                                            className="object-contain"
                                            sizes="96px"
                                        />
                                    </div>
                                    <h2 className="font-semibold text-gray-900 text-sm md:text-base">{match.team_1.name}</h2>
                                </Link>

                                {/* Score */}
                                <div className="flex flex-col items-center">
                                    <div className={`text-4xl md:text-5xl font-black ${match.status === 'LIVE' ? 'text-red-600' : 'text-gray-900'}`}>
                                        {match.status === 'NOT_STARTED' ? (
                                            <span className="text-2xl text-gray-400">VS</span>
                                        ) : (
                                            <>
                                                {match.team_1.goals} - {match.team_2.goals}
                                            </>
                                        )}
                                    </div>
                                    {match.penalty_status && (
                                        <span className="text-sm text-gray-500 mt-1">
                                            ({match.team_1.penalty_goals} - {match.team_2.penalty_goals} пен.)
                                        </span>
                                    )}
                                </div>

                                {/* Away Team */}
                                <Link href={`/team/${match.team_2.id}`} className="flex flex-col items-center text-center flex-1 hover:opacity-80 transition-opacity">
                                    <div className="w-20 h-20 md:w-24 md:h-24 relative mb-3">
                                        <Image
                                            src={getImageUrl(match.team_2.image)}
                                            alt={match.team_2.name}
                                            fill
                                            className="object-contain"
                                            sizes="96px"
                                        />
                                    </div>
                                    <h2 className="font-semibold text-gray-900 text-sm md:text-base">{match.team_2.name}</h2>
                                </Link>
                            </div>

                            {/* Match Info */}
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-4 mt-6 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">{formatMatchDate(match.time)}, {formatTime(match.time)}</span>
                                </div>
                                {match.address && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-sm">{match.address.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* YouTube Video Player */}
                        {match.video && (
                            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                <YouTubePlayer url={match.video} />
                            </div>
                        )}

                        {/* Match Events */}
                        {match.status !== 'NOT_STARTED' && (
                            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-kmff-blue rounded-full"></span>
                                    События матча
                                </h3>
                                <MatchEvents match={match} />
                            </div>
                        )}

                        {/* Lineups */}
                        <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5 text-kmff-blue" />
                                Составы команд
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-3">{match.team_1.name}</h4>
                                    <TeamLineup team={match.team_1} isHome={true} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-3 md:text-right">{match.team_2.name}</h4>
                                    <TeamLineup team={match.team_2} isHome={false} />
                                </div>
                            </div>
                        </div>

                        {/* Match Info: Referees & Disqualified */}
                        {(match.referees.length > 0 || match.disqualified_players.length > 0) && (
                            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-kmff-blue rounded-full"></span>
                                    Информация о матче
                                </h3>

                                <div className="space-y-4">
                                    {/* Referees */}
                                    {match.referees.length > 0 && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-gray-500 font-medium min-w-[80px]">Судья:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {match.referees.map(ref => (
                                                    <span key={ref.id} className="text-gray-800">
                                                        {ref.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Disqualified Players */}
                                    {match.disqualified_players.length > 0 && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-red-500 font-medium min-w-[80px]">Дисквал.:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {match.disqualified_players.map(player => (
                                                    <span key={player.id} className="text-red-600 bg-red-50 px-2 py-1 rounded text-sm">
                                                        {player.firstname} {player.lastname}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Back Link */}
                        <div className="text-center">
                            <Link
                                href="/matches"
                                className="inline-flex items-center gap-2 text-kmff-blue hover:text-blue-700 font-medium transition-colors"
                            >
                                &#8592; Все матчи
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
