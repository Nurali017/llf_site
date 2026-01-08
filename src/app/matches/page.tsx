import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MatchesPageContent from '@/components/MatchesPageContent';
import { BackToTop } from '@/components/BackToTop';

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
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
                <MatchesPageContent />
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
}
