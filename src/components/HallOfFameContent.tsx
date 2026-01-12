"use client";

import { useState, useEffect } from 'react';
import { Trophy, Calendar, Filter, Loader2 } from 'lucide-react';
import { getHallOfFame, HallOfFameItem, HallOfFameParams } from '@/services/api';
import { getImageUrl } from '@/utils/image';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';

type AgeGroup = 'все' | 'молодежь' | '35+' | '40+' | '45+';

// Place badge colors
const placeColors: Record<number, string> = {
    1: 'bg-yellow-500 text-white',
    2: 'bg-gray-400 text-white',
    3: 'bg-amber-700 text-white',
    4: 'bg-gray-600 text-white',
};

// Champion Card
function ChampionCard({ item }: { item: HallOfFameItem }) {
    return (
        <Link href={`/team/${item.team.id}`} className="group">
            <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-900 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                    {/* Team Logo */}
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                            src={getImageUrl(item.team.image)}
                            alt={item.team.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/llf-logo.png'; }}
                        />
                    </div>

                    {/* Team Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${placeColors[item.place] || 'bg-gray-500 text-white'}`}>
                                {item.place} место
                            </span>
                            <span className="text-xs text-gray-500">
                                {item.tournament.sport_type === 'FUTSAL' ? 'Футзал' : item.tournament.sport_type}
                            </span>
                        </div>
                        <div className="text-gray-900 font-medium group-hover:text-gray-600 transition truncate">
                            {item.team.name}
                        </div>
                        <div className="text-gray-500 text-xs truncate">
                            {item.tournament.name}
                        </div>
                    </div>

                    {/* Year & Trophy */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <span className="text-sm font-semibold text-gray-700">{item.year}</span>
                        <Trophy className={`w-5 h-5 ${item.place === 1 ? 'text-yellow-500' : 'text-gray-400'}`} />
                    </div>
                </div>

                {/* Trophy Photo */}
                {item.trophy_photo && (
                    <div className="mt-3 rounded-lg overflow-hidden h-32">
                        <img
                            src={getImageUrl(item.trophy_photo)}
                            alt="Трофей"
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    </div>
                )}
            </div>
        </Link>
    );
}

// Main Component
export default function HallOfFameContent() {
    // State
    const [allData, setAllData] = useState<HallOfFameItem[]>([]);
    const [miniData, setMiniData] = useState<HallOfFameItem[]>([]);
    const [futsalData, setFutsalData] = useState<HallOfFameItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filters
    const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>('все');
    const [selectedYear, setSelectedYear] = useState<number | undefined>();
    const [selectedPlace, setSelectedPlace] = useState<number | undefined>(1); // По умолчанию только чемпионы

    // Available years for filter (last 10 years)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    // Fetch all data
    useEffect(() => {
        async function fetchAllData() {
            setLoading(true);
            try {
                const params: HallOfFameParams = {
                    limit: 100,
                    year: selectedYear,
                    place: selectedPlace,
                };
                const response = await getHallOfFame(params);
                setAllData(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        }
        fetchAllData();
    }, [selectedYear, selectedPlace]);

    // Filter by age group
    useEffect(() => {
        let filtered = allData;

        // Фильтр по возрастной группе
        if (selectedAgeGroup !== 'все') {
            filtered = filtered.filter(item => {
                const tournamentName = item.tournament.name;

                switch(selectedAgeGroup) {
                    case 'молодежь':
                        return !tournamentName.includes('35+') &&
                               !tournamentName.includes('40+') &&
                               !tournamentName.includes('45+');
                    case '35+':
                        return tournamentName.includes('35+');
                    case '40+':
                        return tournamentName.includes('40+');
                    case '45+':
                        return tournamentName.includes('45+');
                    default:
                        return true;
                }
            });
        }

        // Разделение на минифутбол и футзал
        const mini = filtered.filter(item => item.tournament.sport_type === 'MINIFOOTBALL');
        const futsal = filtered.filter(item => item.tournament.sport_type === 'FUTSAL');

        setMiniData(mini);
        setFutsalData(futsal);
    }, [allData, selectedAgeGroup]);

    const total = miniData.length + futsalData.length;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-grow bg-gray-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Trophy className="w-12 h-12 md:w-16 md:h-16 text-yellow-500" />
                            <h1 className="text-3xl md:text-5xl font-semibold">Зал славы</h1>
                            <Trophy className="w-12 h-12 md:w-16 md:h-16 text-yellow-500" />
                        </div>
                        <p className="text-center text-lg md:text-xl text-gray-300">
                            История чемпионов и призёров LLF
                        </p>
                        {total > 0 && (
                            <p className="text-center text-sm text-gray-400 mt-2">
                                Всего записей: {total}
                            </p>
                        )}
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="container mx-auto px-4 py-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Filters Section */}
                        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200 sticky top-20 z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Filter className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Чемпионаты</span>
                            </div>

                            {/* Age Group Tabs */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {(['все', 'молодежь', '35+', '40+', '45+'] as AgeGroup[]).map((ageGroup) => (
                                    <button
                                        key={ageGroup}
                                        onClick={() => setSelectedAgeGroup(ageGroup)}
                                        className={`px-4 py-2 rounded-lg font-medium transition text-sm ${
                                            selectedAgeGroup === ageGroup
                                                ? 'bg-primary-900 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {ageGroup === 'все' ? 'Все' : ageGroup === 'молодежь' ? 'Молодежь' : ageGroup}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3 items-center">
                                {/* Year Filter */}
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <select
                                        value={selectedYear || ''}
                                        onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : undefined)}
                                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    >
                                        <option value="">Все годы</option>
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Place Filter */}
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4].map(place => (
                                        <button
                                            key={place}
                                            onClick={() => setSelectedPlace(selectedPlace === place ? undefined : place)}
                                            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition ${
                                                selectedPlace === place
                                                    ? placeColors[place]
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {place} место
                                        </button>
                                    ))}
                                </div>

                                {/* Clear Filters */}
                                {(selectedYear || selectedPlace !== 1 || selectedAgeGroup !== 'все') && (
                                    <button
                                        onClick={() => {
                                            setSelectedYear(undefined);
                                            setSelectedPlace(1);
                                            setSelectedAgeGroup('все');
                                        }}
                                        className="px-3 py-1.5 text-sm rounded-lg font-medium text-red-600 hover:bg-red-50 transition"
                                    >
                                        Сбросить
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Error State */}
                        {error && (
                            <div className="text-center py-12 bg-white rounded-lg mb-6">
                                <p className="text-red-500 text-lg">{error}</p>
                            </div>
                        )}

                        {/* Loading State */}
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                            </div>
                        ) : (
                            <>
                                {/* Минифутбол Section */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold mb-4 px-4 py-2 rounded-lg bg-green-600 text-white inline-block">
                                        Минифутбол
                                    </h2>
                                    {miniData.length === 0 ? (
                                        <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                                            <p className="text-gray-500">Нет данных</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {miniData.map((item, index) => (
                                                <ChampionCard key={`mini-${item.team.id}-${item.tournament.id}-${index}`} item={item} />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Футзал Section */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold mb-4 px-4 py-2 rounded-lg bg-blue-600 text-white inline-block">
                                        Футзал
                                    </h2>
                                    {futsalData.length === 0 ? (
                                        <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                                            <p className="text-gray-500">Нет данных</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {futsalData.map((item, index) => (
                                                <ChampionCard key={`futsal-${item.team.id}-${item.tournament.id}-${index}`} item={item} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
