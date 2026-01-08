import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TournamentsPageContent from '@/components/TournamentsPageContent';
import { BackToTop } from '@/components/BackToTop';

export const metadata: Metadata = {
    title: 'Турниры по мини-футболу | КФМФ',
    description: 'Актуальная информация о турнирах и чемпионатах по мини-футболу в Казахстане. Турнирные таблицы, бомбардиры, статистика и результаты турниров КФМФ.',
    keywords: [
        'турниры мини-футбола',
        'турнирная таблица',
        'чемпионат Казахстана',
        'соревнования КФМФ',
        'футзал турниры',
        'бомбардиры',
    ],
    openGraph: {
        title: 'Турниры мини-футбола | КФМФ',
        description: 'Турнирные таблицы и статистика по мини-футболу в Казахстане',
        type: 'website',
        url: 'https://llfsite.vercel.app/tournaments',
    },
    twitter: {
        card: 'summary',
        title: 'Турниры мини-футбола',
        description: 'Турнирные таблицы и статистика КФМФ',
    },
    alternates: {
        canonical: 'https://llfsite.vercel.app/tournaments',
    },
};

export default function TournamentsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
                <TournamentsPageContent />
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
}
