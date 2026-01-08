import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MatchDetailContent from '@/components/MatchDetailContent';
import { BackToTop } from '@/components/BackToTop';

interface MatchPageProps {
    params: { id: string };
}

export async function generateMetadata({ params }: MatchPageProps): Promise<Metadata> {
    const matchId = params.id;

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
            url: `https://llfsite.vercel.app/match/${matchId}`,
        },
        twitter: {
            card: 'summary',
            title: `Матч #${matchId}`,
            description: `Детали матча мини-футбола`,
        },
        alternates: {
            canonical: `https://llfsite.vercel.app/match/${matchId}`,
        },
    };
}

export default function MatchPage({ params }: MatchPageProps) {
    const matchId = parseInt(params.id, 10);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
                <MatchDetailContent matchId={matchId} />
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
}
