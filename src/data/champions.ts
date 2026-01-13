export type Category = 'futsal' | 'mini';
export type AgeGroup = 'молодежь' | 'жастар' | '35+' | '40+' | '45+';

export interface Champion {
    year: number;
    category: Category;
    ageGroup: AgeGroup;
    team: {
        id: number;
        name: string;
        image: string;
    };
    tournament: 'league' | 'cup';
    tournamentName: string;
}

// Static data - can be replaced with API later
// TODO: Fill with real champion data for each city
const championsData: Record<string, Champion[]> = {
    astana: [
        // 2024 - Футзал
        { year: 2024, category: 'futsal', ageGroup: 'молодежь', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Футзал Молодежь' },
        { year: 2024, category: 'futsal', ageGroup: '35+', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Футзал 35+' },
        { year: 2024, category: 'futsal', ageGroup: '40+', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Футзал 40+' },
        { year: 2024, category: 'futsal', ageGroup: '45+', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Футзал 45+' },
        // 2024 - Мини
        { year: 2024, category: 'mini', ageGroup: 'молодежь', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Мини Молодежь' },
        { year: 2024, category: 'mini', ageGroup: '35+', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Мини 35+' },
        { year: 2024, category: 'mini', ageGroup: '40+', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Мини 40+' },
        { year: 2024, category: 'mini', ageGroup: '45+', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Мини 45+' },

        // 2023 - Футзал
        { year: 2023, category: 'futsal', ageGroup: 'молодежь', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Футзал Молодежь' },
        { year: 2023, category: 'futsal', ageGroup: '35+', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Футзал 35+' },
        { year: 2023, category: 'futsal', ageGroup: '40+', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Футзал 40+' },
        { year: 2023, category: 'futsal', ageGroup: '45+', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Футзал 45+' },
        // 2023 - Мини
        { year: 2023, category: 'mini', ageGroup: 'молодежь', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Мини Молодежь' },
        { year: 2023, category: 'mini', ageGroup: '35+', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Мини 35+' },
        { year: 2023, category: 'mini', ageGroup: '40+', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Мини 40+' },
        { year: 2023, category: 'mini', ageGroup: '45+', team: { id: 0, name: 'TBD', image: '' }, tournament: 'league', tournamentName: 'LLF Astana Мини 45+' },
    ],
    // Остальные организации из API (пока без данных)
    balkhash: [],
    karagandy: [], // Исправлено с 'karaganda' на 'karagandy'
    kokshetau: [],
    ulytau: [],
    qyzylorda: [],
    uralsk: [],
    shymkent: [],
    turkestan: [],
    aktobe: [],
    taldykorgan: [],
    'turkestan-region': [],
    kulsary: [],
    schuchinsk: [],
    oskemen: [],
    kostanay: [],
    'freedom-bfl': [],
    'qazaly-region': [],
};

export function getChampionsByCity(citySlug: string): Champion[] {
    return championsData[citySlug] || [];
}

export function getAllChampions(): Record<string, Champion[]> {
    return championsData;
}

// Группировка чемпионов по годам
export function getChampionsByYear(citySlug: string): Record<number, Champion[]> {
    const champions = championsData[citySlug] || [];
    return champions.reduce((acc, champion) => {
        if (!acc[champion.year]) acc[champion.year] = [];
        acc[champion.year].push(champion);
        return acc;
    }, {} as Record<number, Champion[]>);
}

// Получить текущий год (последний год с чемпионами)
export function getCurrentYear(citySlug: string): number | null {
    const championsByYear = getChampionsByYear(citySlug);
    const years = Object.keys(championsByYear).map(Number).sort((a, b) => b - a);
    return years.length > 0 ? years[0] : null;
}
