"use client";

import Hero from "@/components/Hero";
import MatchWidget from "@/components/MatchWidget";
import NewsGrid from "@/components/NewsGrid";
import Aside from "@/components/Aside";
import { useOrganization } from "@/contexts/OrganizationContext";
import { getFeaturedNewsByBranch } from "@/data/news";
import { useNews } from "@/hooks/useNews";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function HomeContent() {
    const { selectedOrganization, isLoading } = useOrganization();
    const { news: apiNews } = useNews(selectedOrganization?.id);

    // Hero использует mock data (другой API)
    const featuredNews = selectedOrganization ? getFeaturedNewsByBranch(selectedOrganization.slug) : null;

    // NewsGrid использует API data
    const regularNews = apiNews || [];

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <div className="text-gray-500">Загрузка...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Desktop Sidebar - Sticky on the left */}
                <div className="hidden lg:block w-full lg:w-[30%]">
                    <Aside />
                </div>

                {/* Main Content Area */}
                <div className="w-full lg:w-[70%] flex flex-col gap-6">
                    {/* Hero Section */}
                    {featuredNews && (
                        <Hero
                            title={featuredNews.title}
                            description={featuredNews.description}
                            date={featuredNews.date}
                            category={featuredNews.category}
                            image={featuredNews.image}
                        />
                    )}

                    {/* Match Widget */}
                    <ErrorBoundary fallback={<div className="p-4 text-center text-gray-500 bg-white rounded-xl">Ошибка загрузки матчей</div>}>
                        <MatchWidget />
                    </ErrorBoundary>

                    {/* Mobile Sidebar - Appears between Match and News on mobile */}
                    <div className="block lg:hidden">
                        <Aside />
                    </div>

                    {/* News Grid */}
                    <NewsGrid news={regularNews} />
                </div>
            </div>
        </div>
    );
}
