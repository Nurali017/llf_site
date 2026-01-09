"use client";

import MatchWidget from "@/components/MatchWidget";
import Aside from "@/components/Aside";
import LiveBar from "@/components/LiveBar";
import QuickStatsBar from "@/components/QuickStatsBar";
import ChampionsSection from "@/components/ChampionsSection";
import FeaturedMatch from "@/components/FeaturedMatch";
import { useOrganization } from "@/contexts/OrganizationContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function HomeContent() {
    const { isLoading } = useOrganization();

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-5">
                <div className="rounded-lg shadow-md bg-white p-12">
                    <div className="font-display text-sm text-center text-neutral-600">
                        Загрузка...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Live Bar - Shows live matches ticker */}
            <LiveBar />

            {/* Quick Stats Bar - Dashboard stats */}
            <QuickStatsBar />

            {/* Main Content Area */}
            <div className="container mx-auto px-4 py-5">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Main Content LEFT (70%) */}
                    <div className="w-full lg:w-[70%] flex flex-col gap-5">
                        {/* Champions Section - Hall of Fame */}
                        <ChampionsSection />

                        {/* Match Widget */}
                        <ErrorBoundary
                            fallback={
                                <div className="rounded-lg shadow-md bg-white p-5">
                                    <div className="font-display text-sm text-center text-accent-red">
                                        Ошибка загрузки матчей
                                    </div>
                                </div>
                            }
                        >
                            <MatchWidget />
                        </ErrorBoundary>

                        {/* Featured Match - SLIDER category */}
                        <FeaturedMatch />
                    </div>

                    {/* Sidebar RIGHT (30%) - Desktop only */}
                    <div className="hidden lg:block w-full lg:w-[30%] sticky top-24 h-fit">
                        <Aside />
                    </div>
                </div>

                {/* Mobile Sidebar - Appears after matches on mobile */}
                <div className="block lg:hidden mt-8">
                    <Aside />
                </div>
            </div>
        </>
    );
}
