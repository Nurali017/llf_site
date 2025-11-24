import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Турниры по мини-футболу | КФМФ',
    description: 'Актуальная информация о турнирах и чемпионатах по мини-футболу в Казахстане. Календарь соревнований, регламенты и результаты турниров КФМФ.',
    keywords: [
        'турниры мини-футбола',
        'чемпионат Казахстана',
        'соревнования КФМФ',
        'футзал турниры',
        'календарь матчей',
    ],
    openGraph: {
        title: 'Турниры мини-футбола | КФМФ',
        description: 'Календарь турниров и чемпионатов по мини-футболу в Казахстане',
        type: 'website',
        url: 'https://yourdomain.com/tournaments',
    },
    twitter: {
        card: 'summary',
        title: 'Турниры мини-футбола',
        description: 'Актуальные турниры КФМФ',
    },
    alternates: {
        canonical: 'https://yourdomain.com/tournaments',
    },
};

export default function TournamentsPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="text-6xl mb-6">🚧</div>
                <h1 className="text-4xl font-bold text-kmff-dark mb-4">Страница в разработке</h1>
                <p className="text-gray-600 text-lg mb-8">Раздел "Турниры" скоро будет доступен</p>
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
