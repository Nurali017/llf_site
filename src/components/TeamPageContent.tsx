"use client";

import { useState, useMemo } from 'react';
import { useTeam, useTeamStats } from '@/hooks/useTeam';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Skeleton } from '@/components/ui/Skeleton';
import { getImageUrl } from '@/utils/image';
import Image from 'next/image';
import Link from 'next/link';
import {
    Trophy,
    Target,
    Shield,
    Users,
    Youtube,
    Calendar,
    Lock,
    ChevronRight,
    LayoutDashboard,
    ArrowLeft
} from 'lucide-react';
import { TeamPlayer, TeamStats, TeamRecentMatch } from '@/types/api';

interface TeamPageContentProps {
    teamId: number;
}

type TabId = 'overview' | 'roster' | 'matches';

// ============== SKELETON COMPONENT ==============
function TeamSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Hero Skeleton */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-28 h-28 md:w-36 md:h-36 bg-white/10 rounded-2xl" />
                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <div className="h-4 bg-white/10 rounded w-20 mx-auto md:mx-0" />
                        <div className="h-10 bg-white/10 rounded w-48 mx-auto md:mx-0" />
                        <div className="h-4 bg-white/10 rounded w-32 mx-auto md:mx-0" />
                        <div className="flex justify-center md:justify-start gap-6 pt-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="text-center">
                                    <div className="h-8 w-12 bg-white/10 rounded mb-1" />
                                    <div className="h-3 w-16 bg-white/10 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <div className="h-3 w-12 bg-white/10 rounded" />
                        <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-7 h-7 bg-white/10 rounded-md" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="bg-white rounded-xl p-1 flex gap-1 border border-gray-100">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex-1 h-12 bg-gray-100 rounded-lg" />
                ))}
            </div>

            {/* Content Skeleton */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="h-6 bg-gray-200 rounded w-40 mb-6" />
                <div className="h-2 bg-gray-100 rounded-full mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-24 bg-gray-100 rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============== ERROR COMPONENT ==============
function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            <p className="text-gray-700 font-medium mb-2">Ошибка загрузки</p>
            <p className="text-gray-500 text-sm mb-4">Не удалось загрузить данные команды</p>
            <button
                onClick={onRetry}
                className="bg-kmff-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Повторить
            </button>
        </div>
    );
}

// ============== QUICK STAT COMPONENT ==============
function QuickStat({
    icon: Icon,
    value,
    label,
    color = "text-white"
}: {
    icon: React.ElementType;
    value: number | string;
    label: string;
    color?: string;
}) {
    return (
        <div className="text-center">
            <div className={`flex justify-center mb-1 ${color}`}>
                <Icon className="w-4 h-4 opacity-70" />
            </div>
            <div className="text-xl md:text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">{label}</div>
        </div>
    );
}

// ============== FORM STRIP COMPONENT ==============
function FormStrip({ matches }: { matches?: TeamRecentMatch[] }) {
    if (!matches || matches.length === 0) return null;

    const last5 = matches.slice(0, 5).reverse();

    const resultColors: Record<string, string> = {
        W: 'bg-green-500',
        D: 'bg-gray-500',
        L: 'bg-red-500'
    };

    return (
        <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 uppercase tracking-wide">Форма</span>
                <div className="flex items-center gap-1.5">
                    {last5.map((match) => (
                        <div
                            key={match.id}
                            className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white transition-transform hover:scale-110 ${resultColors[match.result]}`}
                            title={`${match.homeScore}-${match.awayScore} vs ${match.opponentName}`}
                        >
                            {match.result}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============== HERO SECTION COMPONENT ==============
function HeroSection({
    team,
    stats
}: {
    team: { id: number; name: string; image: string | null; instagram: string | null; uniform_color: string | null; players: TeamPlayer[] };
    stats?: TeamStats;
}) {
    const teamColor = team.uniform_color || '#0056b3';
    const winRate = stats && stats.totalMatches > 0
        ? Math.round((stats.wins / stats.totalMatches) * 100)
        : 0;

    return (
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl">
            {/* Team Color Accent Strip */}
            <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: teamColor }}
            />

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                    }}
                />
            </div>

            {/* Back Button */}
            <Link
                href="/"
                className="absolute top-4 left-4 text-white/80 hover:text-white flex items-center gap-2 z-10 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Назад</span>
            </Link>

            {/* Social Links */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                {team.instagram && (
                    <a
                        href={`https://instagram.com/${team.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                )}
                <a
                    href="#"
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                    <Youtube className="w-4 h-4 text-white" />
                </a>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 pt-14">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Team Logo with Glow Effect */}
                    <div className="relative">
                        <div
                            className="absolute inset-0 blur-2xl opacity-30 rounded-full scale-150"
                            style={{ backgroundColor: teamColor }}
                        />
                        <div className="relative w-28 h-28 md:w-36 md:h-36 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 shadow-lg">
                            <Image
                                src={getImageUrl(team.image)}
                                alt={team.name}
                                fill
                                className="object-contain p-2"
                                sizes="144px"
                                priority
                            />
                        </div>
                    </div>

                    {/* Team Info */}
                    <div className="flex-1 text-center md:text-left">
                        {/* League Badge */}
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-300 font-medium">
                                LLF 2024
                            </span>
                        </div>

                        {/* Team Name */}
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {team.name}
                        </h1>

                        {/* City */}
                        <p className="text-white/60 mb-4">Алматы, Казахстан</p>

                        {/* Quick Stats Row */}
                        <div className="flex items-center justify-center md:justify-start gap-6 md:gap-8 bg-white/5 rounded-xl p-4">
                            <QuickStat
                                icon={Users}
                                value={team.players?.length || 0}
                                label="Игроков"
                            />
                            <QuickStat
                                icon={Trophy}
                                value={stats?.tournaments || 0}
                                label="Турниров"
                                color="text-yellow-400"
                            />
                            <QuickStat
                                icon={Target}
                                value={stats?.goalsScored || 0}
                                label="Голов"
                                color="text-green-400"
                            />
                            <QuickStat
                                icon={Shield}
                                value={`${winRate}%`}
                                label="Побед"
                                color="text-cyan-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Form Strip */}
                <FormStrip matches={stats?.recentMatches} />
            </div>

            {/* Decorative element */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-cyan-400/10 to-transparent rounded-tl-full pointer-events-none" />
        </div>
    );
}

// ============== TABS NAVIGATION COMPONENT ==============
function TabsNavigation({
    activeTab,
    onChange
}: {
    activeTab: TabId;
    onChange: (tab: TabId) => void;
}) {
    const tabs = [
        { id: 'overview' as TabId, label: 'Обзор', icon: LayoutDashboard },
        { id: 'roster' as TabId, label: 'Состав', icon: Users },
        { id: 'matches' as TabId, label: 'Матчи', icon: Calendar },
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-1 flex gap-1">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                            isActive
                                ? 'bg-kmff-blue text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

// ============== MATCH RESULTS BAR COMPONENT ==============
function MatchResultsBar({ wins, draws, losses }: { wins: number; draws: number; losses: number }) {
    const total = wins + draws + losses;
    const winPct = total > 0 ? (wins / total) * 100 : 0;
    const drawPct = total > 0 ? (draws / total) * 100 : 0;
    const lossPct = total > 0 ? (losses / total) * 100 : 0;

    return (
        <div className="space-y-3">
            {/* Progress Bar */}
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
                <div
                    className="bg-green-500 transition-all duration-500"
                    style={{ width: `${winPct}%` }}
                />
                <div
                    className="bg-gray-400 transition-all duration-500"
                    style={{ width: `${drawPct}%` }}
                />
                <div
                    className="bg-red-500 transition-all duration-500"
                    style={{ width: `${lossPct}%` }}
                />
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-gray-600">Победы</span>
                    <span className="font-bold text-gray-900">{wins}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gray-400 rounded-full" />
                    <span className="text-gray-600">Ничьи</span>
                    <span className="font-bold text-gray-900">{draws}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-gray-600">Поражения</span>
                    <span className="font-bold text-gray-900">{losses}</span>
                </div>
            </div>
        </div>
    );
}

// ============== STAT TILE COMPONENT ==============
function StatTile({
    icon: Icon,
    value,
    label,
    iconColor = "text-gray-400"
}: {
    icon: React.ElementType;
    value: number | string;
    label: string;
    iconColor?: string;
}) {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className={`flex justify-center mb-2 ${iconColor}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">{label}</div>
        </div>
    );
}

// ============== CARD STAT COMPONENT ==============
function CardStat({ type, count }: { type: 'yellow' | 'red'; count: number }) {
    return (
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2">
            <div className={`w-4 h-5 rounded-sm ${type === 'yellow' ? 'bg-yellow-400' : 'bg-red-500'}`} />
            <div>
                <span className="font-bold text-gray-900">{count}</span>
                <span className="text-gray-500 text-sm ml-2">
                    {type === 'yellow' ? 'желтых' : 'красных'}
                </span>
            </div>
        </div>
    );
}

// ============== STATS OVERVIEW COMPONENT ==============
function StatsOverview({ stats }: { stats?: TeamStats }) {
    if (!stats) {
        return (
            <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                <p className="text-gray-500">Статистика недоступна</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {/* Section Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-1 h-5 bg-kmff-blue rounded-full" />
                    Статистика сезона
                </h3>
                <span className="text-xs text-gray-400">LLF 2024</span>
            </div>

            {/* Stats Content */}
            <div className="p-5">
                {/* Match Results Bar */}
                <MatchResultsBar
                    wins={stats.wins}
                    draws={stats.draws}
                    losses={stats.losses}
                />

                {/* Detailed Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <StatTile
                        icon={Calendar}
                        value={stats.totalMatches}
                        label="Матчей"
                        iconColor="text-blue-500"
                    />
                    <StatTile
                        icon={Target}
                        value={stats.goalsScored}
                        label="Забито"
                        iconColor="text-green-500"
                    />
                    <StatTile
                        icon={Shield}
                        value={stats.goalsConceded}
                        label="Пропущено"
                        iconColor="text-red-500"
                    />
                    <StatTile
                        icon={Lock}
                        value={stats.cleanSheets}
                        label="Сухих"
                        iconColor="text-cyan-500"
                    />
                </div>

                {/* Cards Section */}
                <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-gray-100">
                    <CardStat type="yellow" count={stats.yellowCards} />
                    <CardStat type="red" count={stats.redCards} />
                </div>
            </div>
        </div>
    );
}

// ============== RECENT MATCH CARD COMPONENT ==============
function RecentMatchCard({ match }: { match: TeamRecentMatch }) {
    const resultColors: Record<string, string> = {
        W: 'bg-green-500',
        D: 'bg-gray-400',
        L: 'bg-red-500'
    };

    const scoreColors: Record<string, string> = {
        W: 'text-green-600',
        D: 'text-gray-600',
        L: 'text-red-600'
    };

    return (
        <Link href={`/match/${match.id}`}>
            <div className="px-5 py-4 hover:bg-gray-50 transition-colors flex items-center gap-4 group">
                {/* Result Indicator */}
                <div className={`w-1 h-10 ${resultColors[match.result]} rounded-full flex-shrink-0`} />

                {/* Date */}
                <div className="w-16 text-center flex-shrink-0">
                    <div className="text-xs text-gray-400 uppercase">
                        {new Date(match.date).toLocaleDateString('ru', { day: 'numeric', month: 'short' })}
                    </div>
                </div>

                {/* Match Info */}
                <div className="flex-1 flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 relative flex-shrink-0">
                        <Image
                            src={getImageUrl(match.opponentImage)}
                            alt={match.opponentName}
                            fill
                            className="object-contain"
                            sizes="32px"
                        />
                    </div>
                    <div className="min-w-0">
                        <span className="text-sm font-medium text-gray-900 group-hover:text-kmff-blue transition-colors truncate block">
                            {match.isHome ? 'vs' : '@'} {match.opponentName}
                        </span>
                        <span className="text-xs text-gray-400">
                            {match.isHome ? 'Дома' : 'В гостях'}
                        </span>
                    </div>
                </div>

                {/* Score */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-lg font-bold ${scoreColors[match.result]}`}>
                        {match.homeScore} - {match.awayScore}
                    </span>
                    <div className={`w-6 h-6 ${resultColors[match.result]} rounded-full flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{match.result}</span>
                    </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-kmff-blue transition-colors flex-shrink-0" />
            </div>
        </Link>
    );
}

// ============== RECENT MATCHES SECTION COMPONENT ==============
function RecentMatchesSection({ matches }: { matches?: TeamRecentMatch[] }) {
    if (!matches || matches.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Нет данных о матчах</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-1 h-5 bg-kmff-blue rounded-full" />
                    Последние матчи
                </h3>
                <Link href="/matches" className="text-sm text-kmff-blue hover:underline">
                    Все матчи →
                </Link>
            </div>

            <div className="divide-y divide-gray-50">
                {matches.slice(0, 5).map((match) => (
                    <RecentMatchCard key={match.id} match={match} />
                ))}
            </div>
        </div>
    );
}

// ============== PLAYER CARD COMPONENT ==============
function PlayerCard({ player }: { player: TeamPlayer['player'] }) {
    const positionLabels: Record<string, string> = {
        FORWARD: 'Нападающий',
        MIDFIELDER: 'Полузащитник',
        DEFENDER: 'Защитник',
        GOALKEEPER: 'Вратарь',
    };

    return (
        <Link href={`/player/${player.id}`}>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all group border border-transparent hover:border-kmff-blue/20">
                {/* Avatar */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ring-2 ring-white shadow-sm">
                    <Image
                        src={getImageUrl(player.image)}
                        alt={`${player.firstname} ${player.lastname}`}
                        fill
                        className="object-cover"
                        sizes="48px"
                    />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate group-hover:text-kmff-blue transition-colors">
                        {player.firstname} {player.lastname}
                    </p>
                    <p className="text-xs text-gray-500">
                        {positionLabels[player.position || ''] || player.position || 'Не указана'}
                    </p>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-kmff-blue transition-colors flex-shrink-0" />
            </div>
        </Link>
    );
}

// ============== ROSTER SECTION COMPONENT ==============
function RosterSection({ players }: { players: TeamPlayer[] }) {
    const grouped = useMemo(() => ({
        GOALKEEPER: players.filter(p => p.player.position === 'GOALKEEPER'),
        DEFENDER: players.filter(p => p.player.position === 'DEFENDER'),
        MIDFIELDER: players.filter(p => p.player.position === 'MIDFIELDER'),
        FORWARD: players.filter(p => p.player.position === 'FORWARD'),
        UNKNOWN: players.filter(p => !p.player.position),
    }), [players]);

    const positionMeta: Record<string, { label: string; color: string }> = {
        GOALKEEPER: { label: 'Вратари', color: 'bg-amber-500' },
        DEFENDER: { label: 'Защитники', color: 'bg-blue-500' },
        MIDFIELDER: { label: 'Полузащитники', color: 'bg-green-500' },
        FORWARD: { label: 'Нападающие', color: 'bg-red-500' },
        UNKNOWN: { label: 'Без позиции', color: 'bg-gray-400' },
    };

    if (!players || players.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Состав команды не указан</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {Object.entries(grouped).map(([position, posPlayers]) => {
                if (posPlayers.length === 0) return null;
                const meta = positionMeta[position];

                return (
                    <div key={position} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        {/* Position Header */}
                        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
                            <div className={`w-8 h-8 ${meta.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                                {posPlayers.length}
                            </div>
                            <h4 className="font-bold text-gray-900">{meta.label}</h4>
                        </div>

                        {/* Players Grid */}
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {posPlayers.map((p) => (
                                <PlayerCard key={p.player.id} player={p.player} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ============== MATCHES TAB COMPONENT ==============
function MatchesTab({ matches }: { matches?: TeamRecentMatch[] }) {
    if (!matches || matches.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Нет данных о матчах</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-1 h-5 bg-kmff-blue rounded-full" />
                    Все матчи ({matches.length})
                </h3>
            </div>

            <div className="divide-y divide-gray-50">
                {matches.map((match) => (
                    <RecentMatchCard key={match.id} match={match} />
                ))}
            </div>
        </div>
    );
}

// ============== MAIN COMPONENT ==============
export default function TeamPageContent({ teamId }: TeamPageContentProps) {
    const { team, isLoading: teamLoading, isError: teamError, refresh: refreshTeam } = useTeam(teamId);
    const { stats, isLoading: statsLoading, refresh: refreshStats } = useTeamStats(teamId);
    const [activeTab, setActiveTab] = useState<TabId>('overview');

    const isLoading = teamLoading;
    const isError = teamError;

    const handleRetry = () => {
        refreshTeam();
        refreshStats();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumbs />

                {isLoading ? (
                    <TeamSkeleton />
                ) : isError || !team ? (
                    <ErrorState onRetry={handleRetry} />
                ) : (
                    <div className="space-y-6">
                        {/* Hero Section */}
                        <HeroSection team={team} stats={stats} />

                        {/* Desktop: Two-column layout with tabs on left */}
                        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-8">
                                {/* Tabs Navigation */}
                                <TabsNavigation activeTab={activeTab} onChange={setActiveTab} />

                                {/* Tab Content */}
                                <div className="mt-6 transition-opacity duration-200">
                                    {activeTab === 'overview' && (
                                        <StatsOverview stats={stats} />
                                    )}

                                    {activeTab === 'roster' && (
                                        <RosterSection players={team.players} />
                                    )}

                                    {activeTab === 'matches' && (
                                        <MatchesTab matches={stats?.recentMatches} />
                                    )}
                                </div>
                            </div>

                            {/* Sidebar - Recent Matches */}
                            <div className="lg:col-span-4 mt-6 lg:mt-0">
                                <div className="lg:sticky lg:top-8 space-y-6">
                                    <RecentMatchesSection matches={stats?.recentMatches} />

                                    {/* Quick Team Info Card */}
                                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                        <div className="px-5 py-4 border-b border-gray-100">
                                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                                <span className="w-1 h-5 bg-kmff-blue rounded-full" />
                                                Информация
                                            </h3>
                                        </div>
                                        <div className="p-5 space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500 text-sm">Город</span>
                                                <span className="font-medium text-gray-900">Алматы</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500 text-sm">Турнир</span>
                                                <span className="font-medium text-gray-900">LLF 2024</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500 text-sm">Игроков</span>
                                                <span className="font-medium text-gray-900">{team.players?.length || 0}</span>
                                            </div>
                                            {stats && (
                                                <>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-500 text-sm">Разница голов</span>
                                                        <span className={`font-bold ${stats.goalsScored - stats.goalsConceded >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {stats.goalsScored - stats.goalsConceded >= 0 ? '+' : ''}{stats.goalsScored - stats.goalsConceded}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-500 text-sm">Голов за матч</span>
                                                        <span className="font-medium text-gray-900">
                                                            {stats.totalMatches > 0 ? (stats.goalsScored / stats.totalMatches).toFixed(1) : '0'}
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
