import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutPageContent from '@/components/AboutPageContent';
import { BackToTop } from '@/components/BackToTop';

export const metadata: Metadata = {
    title: 'О KLLF - Казахстанская Лига Любителей Футбола',
    description: 'История, миссия и цели Казахстанской Лиги Любителей Футбола. Развитие любительского мини-футбола в Казахстане, структура организации и контактная информация.',
    keywords: [
        'KLLF',
        'о лиге',
        'мини-футбол Казахстан',
        'любительский футбол',
        'футзал',
        'лига футбола',
    ],
    openGraph: {
        title: 'О KLLF',
        description: 'Казахстанская Лига Любителей Футбола - развитие любительского мини-футбола в Казахстане',
        type: 'website',
        url: 'https://llfsite.vercel.app/about',
    },
    twitter: {
        card: 'summary',
        title: 'О KLLF',
        description: 'История и миссия лиги любителей футбола',
    },
    alternates: {
        canonical: 'https://llfsite.vercel.app/about',
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
                <AboutPageContent />
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
}
