"use client";

import { usePlayer, usePlayerStats } from '@/hooks/usePlayer';
import { useTeamPage } from '@/hooks/useTeam';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Skeleton } from '@/components/ui/Skeleton';
import { getImageUrl } from '@/utils/image';
import { formatBirthday, calculateAge } from '@/utils/formatting';
import { getPositionLabel } from '@/utils/player';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Users, Trophy } from 'lucide-react';

interface PlayerPageContentProps {
    playerId: number;
}

function PlayerSkeleton() {
    return (
        <div className="space-y-6">
            {/* Hero skeleton */}
            <div className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#0891b2] rounded-lg p-5">
                <div className="flex flex-col md:flex-row items-center gap-5">
                    <Skeleton className="w-48 h-48 rounded-lg bg-white/10" />
                    <div className="space-y-4 flex-1">
                        <Skeleton className="w-64 h-10 bg-white/10" />
                        <Skeleton className="w-48 h-6 bg-white/10" />
                        <Skeleton className="w-32 h-6 bg-white/10" />
                    </div>
                </div>
            </div>
            {/* Stats skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-24 rounded-lg" />
                ))}
            </div>
        </div>
    );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            <p className="text-gray-700 font-medium mb-2">Ошибка загрузки</p>
            <p className="text-gray-500 text-sm mb-4">Не удалось загрузить данные игрока</p>
            <button
                onClick={onRetry}
                className="bg-kmff-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Повторить
            </button>
        </div>
    );
}

function TeamBadge({ teamId }: { teamId: number }) {
    const { team, isLoading } = useTeamPage(teamId);

    if (isLoading) {
        return <Skeleton className="h-12 w-48 rounded-lg bg-white/20" />;
    }

    if (!team) return null;

    return (
        <Link href={`/team/${teamId}`}>
            <div className="inline-flex items-center gap-3 bg-white rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 relative flex-shrink-0">
                    <Image
                        src={getImageUrl(team.image)}
                        alt={team.name}
                        fill
                        className="object-contain"
                        sizes="32px"
                    />
                </div>
                <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">{team.name}</p>
                    <p className="text-gray-500 text-xs">LLF 2024</p>
                </div>
            </div>
        </Link>
    );
}

function StatBox({ value, label }: { value: number | string; label: string }) {
    return (
        <div className="text-center">
            <div className="text-3xl md:text-4xl font-semibold text-gray-900">{value}</div>
            <div className="text-gray-500 text-sm mt-1">{label}</div>
        </div>
    );
}

function TeamCard({ teamId }: { teamId: number }) {
    const { team, isLoading } = useTeamPage(teamId);

    if (isLoading) {
        return <Skeleton className="h-20 rounded-lg" />;
    }

    if (!team) return null;

    return (
        <Link href={`/team/${teamId}`}>
            <div className="bg-white rounded-lg p-4 border border-gray-100 hover:border-kmff-blue/30 hover:shadow-md transition-all flex items-center gap-4">
                <div className="w-14 h-14 relative flex-shrink-0 bg-gray-50 rounded-lg p-1">
                    <Image
                        src={getImageUrl(team.image)}
                        alt={team.name}
                        fill
                        className="object-contain"
                        sizes="56px"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{team.name}</h3>
                    <p className="text-gray-500 text-sm">{team.players?.length || 0} игроков</p>
                </div>
                <div className="text-kmff-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}

export default function PlayerPageContent({ playerId }: PlayerPageContentProps) {
    const { player, isLoading: playerLoading, isError: playerError, refresh: refreshPlayer } = usePlayer(playerId);
    const { stats, isLoading: statsLoading, isError: statsError, refresh: refreshStats } = usePlayerStats(playerId);

    const isLoading = playerLoading || statsLoading;
    const isError = playerError || statsError;

    const handleRetry = () => {
        refreshPlayer();
        refreshStats();
    };

    const playerImage = player?.image?.[0]?.url || null;
    const birthday = player?.birthday ? {
        age: calculateAge(player.birthday),
        formatted: formatBirthday(player.birthday)
    } : null;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5 py-5">
                <Breadcrumbs />

                {isLoading ? (
                    <PlayerSkeleton />
                ) : isError || !player ? (
                    <ErrorState onRetry={handleRetry} />
                ) : (
                    <div className="space-y-6">
                        {/* Hero Section - QJL Style */}
                        <div className="relative bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#0891b2] rounded-lg overflow-hidden">
                            {/* Back button */}
                            <Link href="/" className="absolute top-4 left-4 text-white/80 hover:text-white flex items-center gap-2 z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                <span className="text-sm font-medium">Назад</span>
                            </Link>

                            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 p-5 pt-14">
                                {/* Player Photo */}
                                <div className="w-40 h-48 md:w-48 md:h-56 relative flex-shrink-0">
                                    <Image
                                        src={getImageUrl(playerImage)}
                                        alt={`${player.firstname} ${player.lastname}`}
                                        fill
                                        className="object-cover object-top rounded-lg"
                                        sizes="(max-width: 768px) 160px, 192px"
                                        priority
                                    />
                                </div>

                                {/* Player Info */}
                                <div className="flex-1 text-center md:text-left pb-4">
                                    {/* Name */}
                                    <h1 className="text-3xl md:text-4xl font-semibold text-white mb-3">
                                        {player.firstname} {player.lastname}
                                    </h1>

                                    {/* Team Badge */}
                                    {player.teams && player.teams.length > 0 && (
                                        <div className="mb-4">
                                            <TeamBadge teamId={player.teams[0].team_id} />
                                        </div>
                                    )}

                                    {/* Position */}
                                    {stats?.position && (
                                        <p className="text-white/90 text-lg mb-4">{getPositionLabel(stats.position)}</p>
                                    )}

                                    {/* Info Row */}
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-2 text-white/80">
                                        {birthday && (
                                            <div>
                                                <p className="text-white/60 text-xs mb-1">Дата рождения</p>
                                                <p className="font-semibold">{birthday.formatted} · {birthday.age} лет</p>
                                            </div>
                                        )}
                                        {player.instagram && (
                                            <a
                                                href={`https://instagram.com/${player.instagram.replace('@', '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                                            >
                                                <Instagram className="w-5 h-5" />
                                                <span>{player.instagram}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-cyan-400/20 to-transparent rounded-tl-full pointer-events-none" />
                        </div>

                        {/* Desktop: Two-column layout */}
                        <div className="lg:grid lg:grid-cols-12 lg:gap-5">
                            {/* Main Content */}
                            <div className="lg:col-span-8 space-y-6">
                                {/* Statistics Section */}
                                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                                        <span className="w-1 h-5 bg-kmff-blue rounded-full" />
                                        <h2 className="text-lg font-semibold text-gray-900">Статистика</h2>
                                    </div>
                                    <div className="p-4">
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                                                <div className="text-3xl font-semibold text-gray-900">{stats?.totalMatches || 0}</div>
                                                <div className="text-gray-500 text-sm mt-1">Матчей</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                                                <div className="text-3xl font-semibold text-green-600">{stats?.totalGoals || 0}</div>
                                                <div className="text-gray-500 text-sm mt-1">Голов</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                                                <div className="text-3xl font-semibold text-yellow-600">{stats?.yellowCards || 0}</div>
                                                <div className="text-gray-500 text-sm mt-1">Желтых</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                                                <div className="text-3xl font-semibold text-red-600">{stats?.redCards || 0}</div>
                                                <div className="text-gray-500 text-sm mt-1">Красных</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Match Results */}
                                {stats && (
                                    <div className="bg-gradient-to-br from-[#1e3a8a] via-[#172554] to-[#1e3a8a] rounded-lg p-4 shadow-lg">
                                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-cyan-400 rounded-full"></span>
                                            Результативность
                                        </h3>
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div className="bg-white/5 rounded-lg p-4">
                                                <div className="text-4xl font-semibold text-green-400">{stats.wins}</div>
                                                <div className="text-gray-400 text-sm mt-2">Побед</div>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-4">
                                                <div className="text-4xl font-semibold text-gray-300">{stats.draws}</div>
                                                <div className="text-gray-400 text-sm mt-2">Ничьих</div>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-4">
                                                <div className="text-4xl font-semibold text-red-400">{stats.losses}</div>
                                                <div className="text-gray-400 text-sm mt-2">Поражений</div>
                                            </div>
                                        </div>
                                        {stats.teamWinRate > 0 && (
                                            <div className="mt-6 pt-4 border-t border-white/10 text-center">
                                                <span className="text-gray-400">Процент побед:</span>
                                                <span className="text-white font-semibold ml-2 text-xl">{stats.teamWinRate.toFixed(1)}%</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Tournaments */}
                                {stats?.tournaments && stats.tournaments.length > 0 && (
                                    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                                            <Trophy className="w-5 h-5 text-yellow-500" />
                                            <h3 className="text-lg font-semibold text-gray-900">Турниры</h3>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="text-xs text-gray-400 border-b border-gray-100 bg-gray-50">
                                                        <th className="py-3 px-6 text-left font-medium">Турнир</th>
                                                        <th className="py-3 px-4 text-center w-24 font-medium">Тип</th>
                                                        <th className="py-3 px-4 text-center w-24 font-medium">Матчи</th>
                                                        <th className="py-3 px-4 text-center w-24 font-medium">Голы</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {stats.tournaments.map((tournament, index) => (
                                                        <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                            <td className="py-4 px-6 font-medium text-gray-900">{tournament.name}</td>
                                                            <td className="py-4 px-4 text-center">
                                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                    tournament.type === 'LEAGUE'
                                                                        ? 'bg-blue-100 text-blue-700'
                                                                        : 'bg-purple-100 text-purple-700'
                                                                }`}>
                                                                    {tournament.type === 'LEAGUE' ? 'Лига' : 'Кубок'}
                                                                </span>
                                                            </td>
                                                            <td className="py-4 px-4 text-center text-gray-600 font-medium">{tournament.playerMatches}</td>
                                                            <td className="py-4 px-4 text-center font-semibold text-green-600">{tournament.playerGoals}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-4 mt-6 lg:mt-0">
                                <div className="lg:sticky lg:top-5 space-y-6">
                                    {/* Player Info Card */}
                                    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                                        <div className="px-5 py-4 border-b border-gray-100">
                                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                <span className="w-1 h-5 bg-kmff-blue rounded-full" />
                                                Информация
                                            </h3>
                                        </div>
                                        <div className="p-5 space-y-4">
                                            {stats?.position && (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 text-sm">Позиция</span>
                                                    <span className="font-medium text-gray-900">{getPositionLabel(stats.position)}</span>
                                                </div>
                                            )}
                                            {birthday && (
                                                <>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-500 text-sm">Возраст</span>
                                                        <span className="font-medium text-gray-900">{birthday.age} лет</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-500 text-sm">Дата рождения</span>
                                                        <span className="font-medium text-gray-900">{birthday.formatted}</span>
                                                    </div>
                                                </>
                                            )}
                                            {stats && (
                                                <>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-500 text-sm">Голов за матч</span>
                                                        <span className="font-semibold text-green-600">
                                                            {stats.totalMatches > 0 ? (stats.totalGoals / stats.totalMatches).toFixed(2) : '0'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-500 text-sm">Всего турниров</span>
                                                        <span className="font-medium text-gray-900">{stats.tournaments?.length || 0}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Teams Section */}
                                    {player.teams && player.teams.length > 0 && (
                                        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                                            <div className="px-5 py-4 border-b border-gray-100">
                                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <Users className="w-5 h-5 text-kmff-blue" />
                                                    {player.teams.length > 1 ? 'Команды' : 'Команда'}
                                                </h3>
                                            </div>
                                            <div className="p-4 space-y-3">
                                                {player.teams.map((membership) => (
                                                    <TeamCard key={membership.id} teamId={membership.team_id} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
