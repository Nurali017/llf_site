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
            <div className="container mx-auto px-4 py-8">
                <div className="border-2 border-mono-100 p-12">
                    <div className="font-mono text-micro uppercase tracking-wider text-center">
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

            {/* Main Content Area - Brutalist Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-1">
                    {/* Main Content LEFT (70%) */}
                    <div className="w-full lg:w-[70%] flex flex-col gap-8">
                        {/* Champions Section - Hall of Fame */}
                        <ChampionsSection />

                        {/* Match Widget */}
                        <ErrorBoundary
                            fallback={
                                <div className="border-2 border-mono-100 p-8">
                                    <div className="font-mono text-micro uppercase tracking-wider text-center text-accent-red">
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

                    {/* Sidebar RIGHT (30%) - Desktop only with black border separator */}
                    <div className="hidden lg:block w-full lg:w-[30%] sticky top-24 h-fit border-l-4 border-mono-100 pl-1">
                        <Aside />
                    </div>
                </div>

                {/* Mobile Sidebar - Appears after matches on mobile */}
                <div className="block lg:hidden mt-8 pt-8 border-t-4 border-mono-100">
                    <Aside />
                </div>
            </div>
        </>
    );
}
