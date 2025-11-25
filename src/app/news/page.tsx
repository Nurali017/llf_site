import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Новости мини-футбола Казахстана | КФМФ',
    description: 'Последние новости, анонсы матчей и события из мира мини-футбола Казахстана. Официальные новости Казахстанской Федерации Мини-Футбола.',
    keywords: [
        'новости мини-футбола',
        'новости КФМФ',
        'футзал Казахстан',
        'анонсы матчей',
        'спортивные новости Казахстан',
    ],
    openGraph: {
        title: 'Новости мини-футбола | КФМФ',
        description: 'Последние новости и события из мира казахстанского мини-футбола',
        type: 'website',
        url: 'https://llfsite.vercel.app/news',
    },
    twitter: {
        card: 'summary',
        title: 'Новости мини-футбола',
        description: 'Последние новости КФМФ',
    },
    alternates: {
        canonical: 'https://llfsite.vercel.app/news',
    },
};

export default function NewsPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="text-6xl mb-6">🚧</div>
                <h1 className="text-4xl font-bold text-kmff-dark mb-4">Страница в разработке</h1>
                <p className="text-gray-600 text-lg mb-8">Раздел "Новости" скоро будет доступен</p>
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
