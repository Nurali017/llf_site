import type { Metadata } from 'next';

interface MatchPageProps {
    params: { id: string };
}

export async function generateMetadata({ params }: MatchPageProps): Promise<Metadata> {
    const matchId = params.id;

    // TODO: Fetch real match data when API is integrated
    // For now, using generic metadata
    return {
        title: `Матч #${matchId} | КФМФ`,
        description: `Детали матча мини-футбола, результаты и статистика. Казахстанская Федерация Мини-Футбола.`,
        keywords: [
            'матч мини-футбол',
            'результат матча',
            'КФМФ',
            'футзал Казахстан',
        ],
        openGraph: {
            title: `Матч #${matchId}`,
            description: `Информация о матче мини-футбола в Казахстане`,
            type: 'article',
            url: `https://yourdomain.com/match/${matchId}`,
        },
        twitter: {
            card: 'summary',
            title: `Матч #${matchId}`,
            description: `Детали матча мини-футбола`,
        },
        alternates: {
            canonical: `https://yourdomain.com/match/${matchId}`,
        },
    };
}

export default function MatchPage({ params }: MatchPageProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Матч #{params.id}</h1>
                <p className="text-gray-500">Страница матча в разработке</p>
            </div>
        </div>
    );
}
