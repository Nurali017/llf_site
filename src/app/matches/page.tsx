import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Матчи мини-футбола - Результаты и Расписание | КФМФ',
    description: 'Расписание и результаты матчей мини-футбола по всему Казахстану. Live трансляции, прошедшие игры и предстоящие матчи чемпионата КФМФ.',
    keywords: [
        'матчи мини-футбола',
        'расписание матчей',
        'результаты игр',
        'live матчи',
        'футзал Казахстан',
        'календарь игр КФМФ',
    ],
    openGraph: {
        title: 'Матчи мини-футбола | КФМФ',
        description: 'Расписание и результаты матчей по всему Казахстану',
        type: 'website',
        url: 'https://llfsite.vercel.app/matches',
    },
    twitter: {
        card: 'summary',
        title: 'Матчи мини-футбола',
        description: 'Расписание и результаты игр',
    },
    alternates: {
        canonical: 'https://llfsite.vercel.app/matches',
    },
};

export default function MatchesPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="text-6xl mb-6">🚧</div>
                <h1 className="text-4xl font-bold text-kmff-dark mb-4">Страница в разработке</h1>
                <p className="text-gray-600 text-lg mb-8">Раздел "Матчи" скоро будет доступен</p>
                <a
                    href="/"
                    className="inline-block bg-kmff-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-kmff-blue/90 transition-colors"
                >
                    Вернуться на главную
                </a>
            </div>
        </div>
    );
}
