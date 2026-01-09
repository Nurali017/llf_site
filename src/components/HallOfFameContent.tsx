"use client";

import { useState, useMemo } from 'react';
import { Trophy, Star, Calendar } from 'lucide-react';
import { useOrganization } from '@/contexts/OrganizationContext';
import { getChampionsByYear, getCurrentYear, Champion, Category, AgeGroup } from '@/data/champions';
import { getImageUrl } from '@/utils/image';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';

// Champion Card for timeline
function TimelineChampionCard({ champion }: { champion: Champion }) {
    return (
        <Link href={`/team/${champion.team.id}`} className="group">
            <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-900 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                    {/* Team Logo */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                            src={getImageUrl(champion.team.image)}
                            alt={champion.team.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/llf-logo.png'; }}
                        />
                    </div>

                    {/* Team Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                                {champion.ageGroup}
                            </span>
                            <span className="text-xs text-gray-500">
                                {champion.category === 'futsal' ? 'Футзал' : 'MiniFootball'}
                            </span>
                        </div>
                        <div className="text-gray-900 font-medium group-hover:text-gray-600 transition truncate">
                            {champion.team.name}
                        </div>
                        <div className="text-gray-500 text-xs truncate">
                            {champion.tournamentName}
                        </div>
                    </div>

                    {/* Trophy Icon */}
                    <Trophy className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
            </div>
        </Link>
    );
}

// Year Section Component
function YearSection({
    year,
    champions,
    isCurrentYear,
    categoryFilter,
    ageGroupFilter
}: {
    year: number;
    champions: Champion[];
    isCurrentYear: boolean;
    categoryFilter: 'all' | Category;
    ageGroupFilter: AgeGroup | null;
}) {
    // Apply filters
    const filteredChampions = champions.filter(c => {
        if (categoryFilter !== 'all' && c.category !== categoryFilter) return false;
        if (ageGroupFilter && c.ageGroup !== ageGroupFilter) return false;
        return true;
    });

    if (filteredChampions.length === 0) return null;

    // Group by category
    const futsalChampions = filteredChampions.filter(c => c.category === 'futsal');
    const miniChampions = filteredChampions.filter(c => c.category === 'mini');

    return (
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
                <h3 className="text-3xl font-semibold text-gray-900">{year}</h3>
                {isCurrentYear && (
                    <span className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Текущий
                    </span>
                )}
            </div>

            {/* Futsal Champions */}
            {futsalChampions.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Футзал</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {futsalChampions.map((champion) => (
                            <TimelineChampionCard
                                key={`${champion.category}-${champion.ageGroup}`}
                                champion={champion}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Mini Champions */}
            {miniChampions.length > 0 && (
                <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">MiniFootball</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {miniChampions.map((champion) => (
                            <TimelineChampionCard
                                key={`${champion.category}-${champion.ageGroup}`}
                                champion={champion}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Main Component
export default function HallOfFameContent() {
    const { selectedOrganization } = useOrganization();
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<'all' | Category>('all');
    const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | null>(null);

    const championsByYear = selectedOrganization
        ? getChampionsByYear(selectedOrganization.slug)
        : {};

    const years = Object.keys(championsByYear).map(Number).sort((a, b) => b - a);
    const currentYear = getCurrentYear(selectedOrganization?.slug || '');

    // Calculate statistics
    const stats = useMemo(() => {
        const allChampions = Object.values(championsByYear).flat();
        const futsalCount = allChampions.filter(c => c.category === 'futsal').length;
        const miniCount = allChampions.filter(c => c.category === 'mini').length;

        return {
            total: allChampions.length,
            futsal: futsalCount,
            mini: miniCount
        };
    }, [championsByYear]);

    // Filter years
    const yearsToDisplay = selectedYear ? [selectedYear] : years;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-grow bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Trophy className="w-12 h-12 md:w-16 md:h-16 text-white" />
                            <h1 className="text-3xl md:text-5xl font-semibold">Зал славы</h1>
                            <Trophy className="w-12 h-12 md:w-16 md:h-16 text-white" />
                        </div>
                        <p className="text-center text-lg md:text-xl text-gray-300">
                            История чемпионов {selectedOrganization?.name || 'LLF'}
                        </p>
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="container mx-auto px-4 py-5">
                    <div className="max-w-4xl mx-auto">
                        {/* Filters Section */}
                        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200 sticky top-20 z-10">
                            <div className="flex flex-wrap gap-3 items-center justify-between">
                                {/* Year Filter */}
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <select
                                        value={selectedYear || 'all'}
                                        onChange={(e) => setSelectedYear(e.target.value === 'all' ? null : Number(e.target.value))}
                                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    >
                                        <option value="all">Все годы</option>
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Category Filter */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedCategory('all')}
                                        className={`px-3 py-1.5 text-sm rounded-lg font-medium transition ${
                                            selectedCategory === 'all'
                                                ? 'bg-gray-800 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        Все
                                    </button>
                                    <button
                                        onClick={() => setSelectedCategory('futsal')}
                                        className={`px-3 py-1.5 text-sm rounded-lg font-medium transition ${
                                            selectedCategory === 'futsal'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        Футзал
                                    </button>
                                    <button
                                        onClick={() => setSelectedCategory('mini')}
                                        className={`px-3 py-1.5 text-sm rounded-lg font-medium transition ${
                                            selectedCategory === 'mini'
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        MiniFootball
                                    </button>
                                </div>

                                {/* Age Group Filter */}
                                <div className="flex flex-wrap gap-2">
                                    {(['молодежь', '35+', '40+', '45+'] as AgeGroup[]).map(age => (
                                        <button
                                            key={age}
                                            onClick={() => setSelectedAgeGroup(selectedAgeGroup === age ? null : age)}
                                            className={`px-2.5 py-1 text-xs rounded-full font-medium transition ${
                                                selectedAgeGroup === age
                                                    ? 'bg-gray-800 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {age}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Champions Timeline */}
                        {yearsToDisplay.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg">
                                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Нет данных о чемпионах</p>
                            </div>
                        ) : (
                            yearsToDisplay.map(year => (
                                <YearSection
                                    key={year}
                                    year={year}
                                    champions={championsByYear[year] || []}
                                    isCurrentYear={year === currentYear}
                                    categoryFilter={selectedCategory}
                                    ageGroupFilter={selectedAgeGroup}
                                />
                            ))
                        )}

                        {/* Statistics Cards */}
                        <div className="mt-8 bg-gradient-to-br from-gray-900/30 via-gray-800/20 to-gray-900/30 rounded-lg p-4 border border-gray-500/30">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
                                <Trophy className="w-6 h-6 text-gray-600" />
                                Статистика
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                                    <h3 className="text-gray-500 text-sm font-medium mb-2">Всего чемпионов</h3>
                                    <p className="text-4xl font-semibold text-gray-900">{stats.total}</p>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                                    <h3 className="text-gray-500 text-sm font-medium mb-2">Футзал чемпионатов</h3>
                                    <p className="text-4xl font-semibold text-gray-900">{stats.futsal}</p>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                                    <h3 className="text-gray-500 text-sm font-medium mb-2">MiniFootball чемпионатов</h3>
                                    <p className="text-4xl font-semibold text-gray-900">{stats.mini}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
