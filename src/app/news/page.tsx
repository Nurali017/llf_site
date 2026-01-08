import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsPageContent from '@/components/NewsPageContent';
import { BackToTop } from '@/components/BackToTop';

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
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
                <NewsPageContent />
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
}
