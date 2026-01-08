import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamPageContent from '@/components/TeamPageContent';
import { BackToTop } from '@/components/BackToTop';

interface TeamPageProps {
    params: { id: string };
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
    const teamId = params.id;

    return {
        title: `Команда #${teamId} | КФМФ`,
        description: `Профиль команды мини-футбола, статистика, матчи и состав. Казахстанская Федерация Мини-Футбола.`,
        keywords: [
            'команда мини-футбол',
            'статистика команды',
            'КФМФ',
            'футзал Казахстан',
        ],
        openGraph: {
            title: `Команда #${teamId}`,
            description: `Профиль команды мини-футбола в Казахстане`,
            type: 'website',
            url: `https://llfsite.vercel.app/team/${teamId}`,
        },
        twitter: {
            card: 'summary',
            title: `Команда #${teamId}`,
            description: `Профиль команды мини-футбола`,
        },
        alternates: {
            canonical: `https://llfsite.vercel.app/team/${teamId}`,
        },
    };
}

export default function TeamPage({ params }: TeamPageProps) {
    const teamId = parseInt(params.id, 10);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
                <TeamPageContent teamId={teamId} />
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
}
