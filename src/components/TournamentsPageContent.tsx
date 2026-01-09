"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useStandings } from '@/hooks/useStandings';
import { useScorers } from '@/hooks/useScorers';
import { useCards } from '@/hooks/useCards';
import { useCupGroups } from '@/hooks/useCupGroups';
import { usePlayoffStages } from '@/hooks/usePlayoffStages';
import { usePlayoffResults } from '@/hooks/usePlayoffResults';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Skeleton } from '@/components/ui/Skeleton';
import { getImageUrl } from '@/utils/image';
import { Trophy, ChevronDown, Users } from 'lucide-react';
import { CupGroup, PlayoffStage } from '@/types/api';

// Tournament Selector for page
function PageTournamentSelector() {
    const { tournaments, activeTournament, setActiveTournament } = useOrganization();
    const [isOpen, setIsOpen] = useState(false);

    if (tournaments.length <= 1) {
        return activeTournament ? (
            <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-gray-200">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {activeTournament.image ? (
                        <img
                            src={getImageUrl(activeTournament.image)}
                            alt={activeTournament.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Trophy size={16} className="text-gray-400" />
                    )}
                </div>
                <span className="font-semibold text-gray-900">{activeTournament.name}</span>
            </div>
        ) : null;
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-kmff-blue/30 transition-colors shadow-sm"
            >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {activeTournament?.image ? (
                        <img
                            src={getImageUrl(activeTournament.image)}
                            alt={activeTournament.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <Trophy size={16} className="text-gray-400" />
                    )}
                </div>
                <span className="font-semibold text-gray-900">{activeTournament?.name || 'Выберите турнир'}</span>
                <ChevronDown size={18} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {tournaments.map((tournament) => (
                        <button
                            key={`${tournament.type}-${tournament.id}`}
                            onClick={() => {
                                setActiveTournament(tournament);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                                activeTournament?.id === tournament.id && activeTournament?.type === tournament.type
                                    ? 'text-kmff-blue bg-blue-50'
                                    : 'text-gray-700'
                            }`}
                        >
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                {tournament.image ? (
                                    <img
                                        src={getImageUrl(tournament.image)}
                                        alt={tournament.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Trophy size={14} className="text-gray-400" />
                                )}
                            </div>
                            <div>
                                <span className="font-medium">{tournament.name}</span>
                                <span className="text-xs text-gray-400 ml-2">
                                    {tournament.type === 'league' ? 'Лига' : 'Кубок'}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// Full Standings Table for League
function FullStandingsTable({ leagueId }: { leagueId: number }) {
    const { standings, isLoading, isError } = useStandings(leagueId, undefined);

    if (isLoading) {
        return (
            <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
        );
    }

    if (isError || !standings || standings.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400">
                {isError ? 'Ошибка загрузки' : 'Таблица пока пуста'}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="text-xs text-gray-400 border-b border-white/10">
                        <th className="py-3 px-2 text-center w-8">#</th>
                        <th className="py-3 px-2 text-left">Команда</th>
                        <th className="py-3 px-2 text-center w-10">И</th>
                        <th className="py-3 px-2 text-center w-10">В</th>
                        <th className="py-3 px-2 text-center w-10">Н</th>
                        <th className="py-3 px-2 text-center w-10">П</th>
                        <th className="py-3 px-2 text-center w-12">ЗМ</th>
                        <th className="py-3 px-2 text-center w-12">ПМ</th>
                        <th className="py-3 px-2 text-center w-12">РМ</th>
                        <th className="py-3 px-2 text-center w-12">О</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.map((standing, index) => {
                        if (!standing.team) return null;

                        let borderClass = 'border-l-4 border-transparent';
                        if (index === 0) borderClass = 'border-l-4 border-yellow-400';
                        else if (index === 1) borderClass = 'border-l-4 border-gray-300';
                        else if (index === 2) borderClass = 'border-l-4 border-amber-600';
                        else if (index >= standings.length - 3) borderClass = 'border-l-4 border-red-500/50';

                        const diff = standing.scored - standing.missed;
                        const diffColor = diff > 0 ? 'text-emerald-400' : diff < 0 ? 'text-red-400' : 'text-gray-400';
                        const diffText = diff > 0 ? `+${diff}` : `${diff}`;

                        return (
                            <tr
                                key={standing.team.id}
                                className={`${borderClass} hover:bg-white/5 transition-colors border-b border-white/5`}
                            >
                                <td className="py-3 px-2 text-center text-gray-400 font-medium">{index + 1}</td>
                                <td className="py-3 px-2">
                                    <Link href={`/team/${standing.team.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                        <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white rounded-full p-1 overflow-hidden">
                                            <img
                                                src={getImageUrl(standing.team.image)}
                                                alt={standing.team.name}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/llf-logo.png';
                                                }}
                                            />
                                        </span>
                                        <span className="text-white font-semibold hover:text-blue-400 transition-colors">{standing.team.name}</span>
                                    </Link>
                                </td>
                                <td className="py-3 px-2 text-center text-gray-300">{standing.game_count}</td>
                                <td className="py-3 px-2 text-center text-emerald-400">{standing.wins}</td>
                                <td className="py-3 px-2 text-center text-gray-400">{standing.draw}</td>
                                <td className="py-3 px-2 text-center text-red-400">{standing.defeat}</td>
                                <td className="py-3 px-2 text-center text-gray-300">{standing.scored}</td>
                                <td className="py-3 px-2 text-center text-gray-300">{standing.missed}</td>
                                <td className={`py-3 px-2 text-center font-semibold ${diffColor}`}>{diffText}</td>
                                <td className="py-3 px-2 text-center text-white font-black text-lg">{standing.point}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-yellow-400 rounded-sm"></span>
                    <span className="text-gray-400">Чемпион</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gray-300 rounded-sm"></span>
                    <span className="text-gray-400">Серебро</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-amber-600 rounded-sm"></span>
                    <span className="text-gray-400">Бронза</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500/50 rounded-sm"></span>
                    <span className="text-gray-400">Зона вылета</span>
                </div>
            </div>
        </div>
    );
}

// Full Cup Standings with Groups and Playoffs
function FullCupStandings({ cupId }: { cupId: number }) {
    const { data: groups, isLoading: groupsLoading } = useCupGroups(cupId);
    const { data: playoffStages, isLoading: playoffLoading } = usePlayoffStages(cupId);
    const [activeTab, setActiveTab] = useState<'groups' | 'playoff'>('groups');

    useEffect(() => {
        if (!groupsLoading && !playoffLoading) {
            const hasGroups = groups && groups.length > 0;
            const hasPlayoff = playoffStages && playoffStages.length > 0;
            if (hasGroups) setActiveTab('groups');
            else if (hasPlayoff) setActiveTab('playoff');
        }
    }, [groups, playoffStages, groupsLoading, playoffLoading]);

    const hasGroups = groups && groups.length > 0;
    const hasPlayoff = playoffStages && playoffStages.length > 0;

    if (groupsLoading && playoffLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
        );
    }

    if (!hasGroups && !hasPlayoff) {
        return <div className="text-center py-12 text-gray-400">Нет данных</div>;
    }

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-2">
                {hasGroups && (
                    <button
                        onClick={() => setActiveTab('groups')}
                        className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
                            activeTab === 'groups'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-gray-400 hover:bg-white/20'
                        }`}
                    >
                        Группы
                    </button>
                )}
                {hasPlayoff && (
                    <button
                        onClick={() => setActiveTab('playoff')}
                        className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
                            activeTab === 'playoff'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-gray-400 hover:bg-white/20'
                        }`}
                    >
                        Плей-офф
                    </button>
                )}
            </div>

            {/* Content */}
            {activeTab === 'groups' && groups && <CupGroupsTables groups={groups} />}
            {activeTab === 'playoff' && playoffStages && <PlayoffBracket stages={playoffStages} />}
        </div>
    );
}

// Cup Groups Tables
function CupGroupsTables({ groups }: { groups: CupGroup[] }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {groups.map((group) => (
                <div key={group.group.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="font-semibold text-white mb-4">{group.group.name}</h4>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-xs text-gray-400 border-b border-white/10">
                                <th className="py-2 px-1 text-center w-6">#</th>
                                <th className="py-2 px-1 text-left">Команда</th>
                                <th className="py-2 px-1 text-center w-8">И</th>
                                <th className="py-2 px-1 text-center w-10">РМ</th>
                                <th className="py-2 px-1 text-center w-8">О</th>
                            </tr>
                        </thead>
                        <tbody>
                            {group.group.results.map((team, idx) => {
                                const diff = team.scored - team.missed;
                                const diffText = diff > 0 ? `+${diff}` : `${diff}`;
                                const isQualified = idx < 2;

                                return (
                                    <tr
                                        key={team.team.id}
                                        className={`border-b border-white/5 ${isQualified ? 'border-l-2 border-l-emerald-500' : ''}`}
                                    >
                                        <td className="py-2 px-1 text-center text-gray-400">{idx + 1}</td>
                                        <td className="py-2 px-1">
                                            <Link href={`/team/${team.team.id}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                                <span className="w-5 h-5 flex-shrink-0 bg-white rounded-full p-0.5 overflow-hidden">
                                                    <img
                                                        src={getImageUrl(team.team.image)}
                                                        alt={team.team.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </span>
                                                <span className="text-gray-200 font-medium truncate hover:text-blue-400 transition-colors">{team.team.name}</span>
                                            </Link>
                                        </td>
                                        <td className="py-2 px-1 text-center text-gray-400">{team.game_count}</td>
                                        <td className="py-2 px-1 text-center text-gray-400">{diffText}</td>
                                        <td className="py-2 px-1 text-center text-white font-semibold">{team.point}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

// Playoff Bracket
function PlayoffBracket({ stages }: { stages: PlayoffStage[] }) {
    const [selectedStage, setSelectedStage] = useState<PlayoffStage | null>(stages[0] || null);

    return (
        <div className="space-y-4">
            {/* Stage selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {stages.map((stage) => (
                    <button
                        key={stage.id}
                        onClick={() => setSelectedStage(stage)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                            selectedStage?.id === stage.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-gray-400 hover:bg-white/20'
                        }`}
                    >
                        {stage.name}
                    </button>
                ))}
            </div>

            {/* Matches */}
            {selectedStage && <PlayoffMatches playoffId={selectedStage.id} />}
        </div>
    );
}

// Playoff Matches
function PlayoffMatches({ playoffId }: { playoffId: number }) {
    const { data: matches, isLoading } = usePlayoffResults(playoffId);

    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                ))}
            </div>
        );
    }

    if (!matches || matches.length === 0) {
        return <div className="text-center py-5 text-gray-400">Нет матчей</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map((match) => (
                <Link
                    key={match.id}
                    href={`/match/${match.id}`}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all block"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="w-8 h-8 flex-shrink-0 bg-white rounded-full p-1 overflow-hidden">
                                <img
                                    src={getImageUrl(match.team_1.image)}
                                    alt={match.team_1.name}
                                    className="w-full h-full object-contain"
                                />
                            </span>
                            <span className="text-gray-200 font-medium truncate text-sm">{match.team_1.name}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3">
                            <span className="text-white font-semibold text-lg">{match.team_1.goals}</span>
                            <span className="text-gray-500">-</span>
                            <span className="text-white font-semibold text-lg">{match.team_2.goals}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                            <span className="text-gray-200 font-medium truncate text-sm">{match.team_2.name}</span>
                            <span className="w-8 h-8 flex-shrink-0 bg-white rounded-full p-1 overflow-hidden">
                                <img
                                    src={getImageUrl(match.team_2.image)}
                                    alt={match.team_2.name}
                                    className="w-full h-full object-contain"
                                />
                            </span>
                        </div>
                    </div>
                    {match.penalty_status && (
                        <div className="text-center text-xs text-gray-500 mt-2">
                            ({match.team_1.penalty_goals} - {match.team_2.penalty_goals} пен.)
                        </div>
                    )}
                </Link>
            ))}
        </div>
    );
}

// Full Scorers Table (top 10)
function FullScorersTable({ leagueId, cupId }: { leagueId?: number; cupId?: number }) {
    const { scorers: apiScorers, isLoading, isError } = useScorers(leagueId, cupId);

    const scorers = useMemo(() => {
        if (!apiScorers) return [];
        return apiScorers
            .map(scorer => ({
                id: scorer.player.id,
                name: `${scorer.player.firstname} ${scorer.player.lastname}`,
                team: scorer.team.name,
                goals: scorer.scored,
                games: scorer.game_count,
                image: scorer.player.image,
            }))
            .sort((a, b) => b.goals - a.goals)
            .slice(0, 10);
    }, [apiScorers]);

    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
        );
    }

    if (isError || scorers.length === 0) {
        return (
            <div className="text-center py-5 text-gray-400">
                {isError ? 'Ошибка загрузки' : 'Нет данных'}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Top Scorer Card */}
            <Link href={`/player/${scorers[0].id}`} className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-5 overflow-hidden block hover:from-blue-500 hover:to-blue-700 transition-all">
                <div className="relative z-10 w-2/3">
                    <div className="text-5xl font-black text-white mb-1">{scorers[0].goals}</div>
                    <div className="text-sm text-blue-200 mb-3">голов</div>
                    <div className="font-semibold text-xl text-white mb-1">{scorers[0].name}</div>
                    <div className="text-sm text-blue-200">{scorers[0].team}</div>
                    <div className="text-xs text-blue-300 mt-2">{scorers[0].games} игр</div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-36 h-44">
                    <Image
                        src={getImageUrl(scorers[0].image) || '/player-1.png'}
                        alt={scorers[0].name}
                        fill
                        sizes="150px"
                        className="object-contain object-bottom"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/player-1.png';
                        }}
                    />
                </div>
            </Link>

            {/* Rest of scorers */}
            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="text-xs text-gray-400 border-b border-gray-100 bg-gray-50">
                            <th className="py-3 px-3 text-center w-8">#</th>
                            <th className="py-3 px-3 text-left">Игрок</th>
                            <th className="py-3 px-3 text-left">Команда</th>
                            <th className="py-3 px-3 text-center w-12">Игр</th>
                            <th className="py-3 px-3 text-center w-12">Голы</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scorers.slice(1).map((player, index) => (
                            <tr key={player.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-3 text-center text-gray-400 font-medium">{index + 2}</td>
                                <td className="py-3 px-3">
                                    <Link href={`/player/${player.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                                            {player.image ? (
                                                <img
                                                    src={getImageUrl(player.image)}
                                                    alt={player.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Users size={14} />
                                                </div>
                                            )}
                                        </div>
                                        <span className="font-medium text-gray-900 hover:text-blue-600 transition-colors">{player.name}</span>
                                    </Link>
                                </td>
                                <td className="py-3 px-3 text-gray-500 text-sm">{player.team}</td>
                                <td className="py-3 px-3 text-center text-gray-500">{player.games}</td>
                                <td className="py-3 px-3 text-center font-semibold text-blue-600">{player.goals}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Full Cards Table (top 10)
function FullCardsTable({ leagueId }: { leagueId?: number }) {
    const [cardType, setCardType] = useState<'yellow' | 'red'>('yellow');
    const { cards: apiCards, isLoading, isError } = useCards(leagueId, cardType);

    const cards = useMemo(() => {
        if (!apiCards) return [];
        return apiCards
            .map(card => ({
                id: card.player.id,
                name: `${card.player.firstname} ${card.player.lastname}`,
                team: card.team.name,
                count: card.card_count,
                games: card.game_count,
                image: card.player.image,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }, [apiCards]);

    return (
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
                <button
                    onClick={() => setCardType('yellow')}
                    className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                        cardType === 'yellow'
                            ? 'bg-yellow-50 text-yellow-700 border-b-2 border-yellow-400'
                            : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    Желтые карточки
                </button>
                <button
                    onClick={() => setCardType('red')}
                    className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                        cardType === 'red'
                            ? 'bg-red-50 text-red-700 border-b-2 border-red-400'
                            : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    Красные карточки
                </button>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="p-4 space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </div>
            ) : isError || cards.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    {isError ? 'Ошибка загрузки' : 'Нет данных'}
                </div>
            ) : (
                <table className="w-full">
                    <thead>
                        <tr className="text-xs text-gray-400 border-b border-gray-100 bg-gray-50">
                            <th className="py-3 px-3 text-center w-8">#</th>
                            <th className="py-3 px-3 text-left">Игрок</th>
                            <th className="py-3 px-3 text-left">Команда</th>
                            <th className="py-3 px-3 text-center w-12">Игр</th>
                            <th className="py-3 px-3 text-center w-12">Карт.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map((player, index) => (
                            <tr key={player.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-3 text-center text-gray-400 font-medium">{index + 1}</td>
                                <td className="py-3 px-3">
                                    <Link href={`/player/${player.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                                            {player.image ? (
                                                <img
                                                    src={getImageUrl(player.image)}
                                                    alt={player.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Users size={14} />
                                                </div>
                                            )}
                                        </div>
                                        <span className="font-medium text-gray-900 hover:text-blue-600 transition-colors">{player.name}</span>
                                    </Link>
                                </td>
                                <td className="py-3 px-3 text-gray-500 text-sm">{player.team}</td>
                                <td className="py-3 px-3 text-center text-gray-500">{player.games}</td>
                                <td className={`py-3 px-3 text-center font-semibold ${cardType === 'yellow' ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {player.count}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

// Skeleton for loading state
function TournamentsSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </div>
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Main Component
export default function TournamentsPageContent() {
    const { activeTournament, isLoading: orgLoading, tournaments } = useOrganization();

    const leagueId = activeTournament?.type === 'league' ? activeTournament.id : undefined;
    const cupId = activeTournament?.type === 'cup' ? activeTournament.id : undefined;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-5">
                <Breadcrumbs />

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-semibold text-kmff-dark flex items-center gap-3">
                        <span className="w-1.5 h-10 bg-kmff-blue rounded-full"></span>
                        Турниры
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Турнирные таблицы, бомбардиры и статистика
                    </p>
                </div>

                {orgLoading ? (
                    <TournamentsSkeleton />
                ) : tournaments.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
                        <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">Турниры не найдены</p>
                        <p className="text-gray-400 text-sm mt-2">Попробуйте выбрать другой город</p>
                    </div>
                ) : (
                    <>
                        {/* Tournament Selector */}
                        <div className="mb-8">
                            <PageTournamentSelector />
                        </div>

                        {/* Main Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Left Column - Standings */}
                            <div className="lg:col-span-2">
                                <div className="bg-gradient-to-br from-[#1e3a8a] via-[#172554] to-[#1e3a8a] rounded-lg p-4 shadow-lg">
                                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-blue-400 rounded-full"></span>
                                        Турнирная таблица
                                    </h2>
                                    {leagueId && <FullStandingsTable leagueId={leagueId} />}
                                    {cupId && <FullCupStandings cupId={cupId} />}
                                </div>
                            </div>

                            {/* Right Column - Scorers & Cards */}
                            <div className="space-y-6">
                                {/* Scorers */}
                                <div>
                                    <h2 className="text-lg font-semibold text-kmff-dark mb-4 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-kmff-blue rounded-full"></span>
                                        Бомбардиры
                                    </h2>
                                    <FullScorersTable leagueId={leagueId} cupId={cupId} />
                                </div>

                                {/* Cards - only for leagues */}
                                {leagueId && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-kmff-dark mb-4 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-kmff-blue rounded-full"></span>
                                            Карточки
                                        </h2>
                                        <FullCardsTable leagueId={leagueId} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
