'use client';

import { useOrgSync } from '@/hooks/useOrgSync';
import Header from "@/components/Header";
import HomeContent from "@/components/HomeContent";
import AboutSection from "@/components/AboutSection";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { BackToTop } from '@/components/BackToTop';

interface CityPageContentProps {
    city: string;
}

export default function CityPageContent({ city }: CityPageContentProps) {
    // Синхронизируем URL slug с глобальным контекстом
    useOrgSync(city);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-grow bg-gray-50">
                <HomeContent />

                {/* About Section - Full Width (Outside Container) */}
                <AboutSection />
            </main>

            <Partners />
            <Footer />
            <BackToTop />
        </div>
    );
}
