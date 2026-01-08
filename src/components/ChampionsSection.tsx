"use client";

import { useState } from 'react';
import { useOrganization } from '@/contexts/OrganizationContext';
import { getChampionsByYear, getCurrentYear, Champion } from '@/data/champions';
import { getImageUrl } from '@/utils/image';
import Link from 'next/link';

// Champion Card - Brutally Minimal
function ChampionCard({ champion }: { champion: Champion }) {
    return (
        <Link href={`/team/${champion.team.id}`} className="group">
            <div className="border-4 border-mono-100 p-6 hover:bg-accent-lime transition-colors">

                {/* Age Group - Top */}
                <div className="font-mono text-micro uppercase bg-mono-100 text-mono-0 px-2 py-1 inline-block mb-4">
                    {champion.ageGroup}
                </div>

                {/* Team Logo - Grayscale */}
                <div className="w-32 h-32 mx-auto mb-6">
                    <img
                        src={getImageUrl(champion.team.image)}
                        alt={champion.team.name}
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/llf-logo.png';
                        }}
                    />
                </div>

                {/* Team Name - Bold Typography */}
                <h3 className="font-display text-h3 font-bold text-center mb-2">
                    {champion.team.name}
                </h3>

                {/* Tournament - Monospace */}
                <p className="font-mono text-label text-center opacity-60">
                    {champion.tournamentName}
                </p>

            </div>
        </Link>
    );
}

// Main Component - Brutally Minimal
export default function ChampionsSection() {
    const { selectedOrganization } = useOrganization();
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const championsByYear = selectedOrganization
        ? getChampionsByYear(selectedOrganization.slug)
        : {};

    const currentYear = getCurrentYear(selectedOrganization?.slug || '');
    const displayYear = selectedYear || currentYear;

    const champions = displayYear ? championsByYear[displayYear] || [] : [];
    const years = Object.keys(championsByYear).map(Number).sort((a, b) => b - a);

    if (champions.length === 0) {
        return null;
    }

    return (
        <section className="relative py-20 border-t-4 border-mono-100">

            {/* Giant Year Watermark - Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <span className="absolute -top-20 -right-40 font-display text-[40rem] font-bold opacity-[0.02] -rotate-12 select-none">
                    {displayYear}
                </span>
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Asymmetric Header */}
                <div className="flex items-end justify-between mb-16 border-b-2 border-mono-100 pb-4">
                    <h2 className="font-display text-display font-bold uppercase tracking-tight">
                        Чемпионы
                    </h2>

                    {/* Year Selector - Brutalist */}
                    {years.length > 1 ? (
                        <select
                            value={displayYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className="font-mono text-h2 font-bold bg-transparent border-2 border-mono-100 px-4 py-2 transition-opacity hover:opacity-70"
                        >
                            {years.map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <div className="font-mono text-h2 font-bold">
                            {displayYear}
                        </div>
                    )}
                </div>

                {/* Champions Grid - 4px Borders */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {champions.map((champion, index) => (
                        <ChampionCard
                            key={`${champion.category}-${champion.ageGroup}-${index}`}
                            champion={champion}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
