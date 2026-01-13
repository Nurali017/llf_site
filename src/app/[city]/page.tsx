import CityPageContent from "@/components/CityPageContent";
import type { Metadata } from 'next';
import { BRANCHES } from '@/lib/branches';
import { APP_CONFIG } from '@/config/constants';

interface CityPageProps {
    params: {
        city: string;
    };
}

// Получаем маппинг из branches.ts (динамически из API)
const cityNames: Record<string, string> = BRANCHES.reduce((acc, branch) => {
    acc[branch.slug] = branch.displayName;
    return acc;
}, {} as Record<string, string>);

// Генерируем описания для каждой организации
const cityDescriptions: Record<string, string> = BRANCHES.reduce((acc, branch) => {
    acc[branch.slug] = `Любительская лига футбола ${branch.displayName}. Результаты матчей, турнирная таблица и статистика команд в режиме реального времени.`;
    return acc;
}, {} as Record<string, string>);

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
            url: `${APP_CONFIG.siteUrl}/${citySlug}`,
            type: 'website',
            locale: 'ru_RU',
            siteName: 'КФМФ',
            images: [
                {
                    url: `${APP_CONFIG.siteUrl}/og-image.png`,
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
            canonical: `${APP_CONFIG.siteUrl}/${citySlug}`,
        },
    };
}

// Генерация статических путей для лучшего SEO (из API)
export async function generateStaticParams() {
    return BRANCHES.map(branch => ({
        city: branch.slug,
    }));
}

export default function CityPage({ params }: CityPageProps) {
    const { city } = params;

    return <CityPageContent city={city} />;
}
