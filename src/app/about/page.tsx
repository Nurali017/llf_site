import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'О КФМФ - Казахстанская Федерация Мини-Футбола',
    description: 'История, миссия и цели Казахстанской Федерации Мини-Футбола. Развитие футзала в Казахстане, структура организации и контактная информация.',
    keywords: [
        'КФМФ',
        'о федерации',
        'мини-футбол Казахстан',
        'история КФМФ',
        'футзал',
        'федерация футбола',
    ],
    openGraph: {
        title: 'О КФМФ',
        description: 'Казахстанская Федерация Мини-Футбола - развитие футзала в Казахстане',
        type: 'website',
        url: 'https://yourdomain.com/about',
    },
    twitter: {
        card: 'summary',
        title: 'О КФМФ',
        description: 'История и миссия федерации мини-футбола',
    },
    alternates: {
        canonical: 'https://yourdomain.com/about',
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="text-6xl mb-6">🚧</div>
                <h1 className="text-4xl font-bold text-kmff-dark mb-4">Страница в разработке</h1>
                <p className="text-gray-600 text-lg mb-8">Раздел "О нас" скоро будет доступен</p>
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
