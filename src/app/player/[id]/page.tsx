import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlayerPageContent from '@/components/PlayerPageContent';
import { BackToTop } from '@/components/BackToTop';

interface PlayerPageProps {
    params: { id: string };
}

export async function generateMetadata({ params }: PlayerPageProps): Promise<Metadata> {
    const playerId = params.id;

    return {
        title: `Игрок #${playerId} | КФМФ`,
        description: `Профиль игрока мини-футбола, статистика и достижения. Казахстанская Федерация Мини-Футбола.`,
        keywords: [
            'игрок мини-футбол',
            'статистика игрока',
            'КФМФ',
            'футзал Казахстан',
        ],
        openGraph: {
            title: `Игрок #${playerId}`,
            description: `Профиль игрока мини-футбола в Казахстане`,
            type: 'profile',
            url: `https://llfsite.vercel.app/player/${playerId}`,
        },
        twitter: {
            card: 'summary',
            title: `Игрок #${playerId}`,
            description: `Профиль игрока мини-футбола`,
        },
        alternates: {
            canonical: `https://llfsite.vercel.app/player/${playerId}`,
        },
    };
}

export default function PlayerPage({ params }: PlayerPageProps) {
    const playerId = parseInt(params.id, 10);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
                <PlayerPageContent playerId={playerId} />
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
}
