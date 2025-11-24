import Header from "@/components/Header";
import HomeContent from "@/components/HomeContent";
import AboutSection from "@/components/AboutSection";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { OrganizationProvider } from '@/contexts/OrganizationContext';
import { BackToTop } from '@/components/BackToTop';
import type { Metadata } from 'next';

interface CityPageProps {
    params: {
        city: string;
    };
}

// Маппинг городов на читаемые названия
const cityNames: Record<string, string> = {
    'astana': 'Астана',
    'almaty': 'Алматы',
    'shymkent': 'Шымкент',
    'karaganda': 'Караганда',
    'aktobe': 'Актобе',
    'taraz': 'Тараз',
    'atyrau': 'Атырау',
    'kostanay': 'Костанай',
    'pavlodar': 'Павлодар',
    'semey': 'Семей',
};

// Описания для каждого города
const cityDescriptions: Record<string, string> = {
    'astana': 'Результаты матчей, турнирная таблица и статистика мини-футбола в Астане. Следите за командами столицы Казахстана в режиме реального времени.',
    'almaty': 'Мини-футбольная лига Алматы. Актуальные результаты матчей, турнирные таблицы, бомбардиры и последние новости мини-футбола южной столицы.',
    'shymkent': 'Чемпионат Шымкента по мини-футболу. Результаты игр, турнирная таблица, статистика команд и игроков города Шымкент.',
    'karaganda': 'Мини-футбол Караганды. Расписание матчей, турнирные таблицы, результаты и статистика команд Карагандинской области.',
    'aktobe': 'Лига мини-футбола Актобе. Результаты, турнирная таблица, календарь матчей и статистика лучших игроков.',
    'taraz': 'Мини-футбол Тараза. Актуальные результаты матчей, турнирные позиции команд и статистика игроков.',
    'atyrau': 'Чемпионат Атырау по мини-футболу. Результаты матчей, турнирная таблица и новости команд.',
    'kostanay': 'Мини-футбольная лига Костаная. Расписание, результаты матчей и турнирная таблица команд Костанайской области.',
    'pavlodar': 'Мини-футбол Павлодара. Результаты игр, статистика и турнирная таблица чемпионата Павлодарской области.',
    'semey': 'Лига мини-футбола Семея. Актуальные результаты матчей, турнирная таблица и статистика игроков.',
};

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
    const citySlug = params.city;
    const cityName = cityNames[citySlug] || citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
    const description = cityDescriptions[citySlug] ||
        `Результаты матчей, турнирная таблица и новости мини-футбола в городе ${cityName}. КФМФ - Казахстанская Федерация Мини-Футбола.`;

    return {
        title: `Мини-футбол ${cityName} - Результаты и Таблица | КФМФ`,
        description: description,
        keywords: [
            `мини-футбол ${cityName}`,
            `турнирная таблица ${cityName}`,
            `результаты матчей ${cityName}`,
            `футзал ${cityName}`,
            'КФМФ',
            `команды ${cityName}`,
            `лига ${cityName}`,
        ],

        openGraph: {
            title: `Мини-футбол ${cityName} | КФМФ`,
            description: description,
            url: `https://yourdomain.com/${citySlug}`,
            type: 'website',
            locale: 'ru_RU',
            siteName: 'КФМФ',
            images: [
                {
                    url: `https://yourdomain.com/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: `Мини-футбол ${cityName}`,
                },
            ],
        },

        twitter: {
            card: 'summary_large_image',
            title: `Мини-футбол ${cityName}`,
            description: description,
        },

        alternates: {
            canonical: `https://yourdomain.com/${citySlug}`,
        },
    };
}

// Генерация статических путей для лучшего SEO
export async function generateStaticParams() {
    const cities = Object.keys(cityNames);

    return cities.map(city => ({
        city: city,
    }));
}

export default function CityPage({ params }: CityPageProps) {
    const { city } = params;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <OrganizationProvider initialSlug={city}>
                <Header />

                <main className="flex-grow bg-gray-50">
                    <HomeContent />

                    {/* About Section - Full Width (Outside Container) */}
                    <AboutSection />
                </main>

                <Partners />
                <Footer />
                <BackToTop />
            </OrganizationProvider>
        </div>
    );
}
