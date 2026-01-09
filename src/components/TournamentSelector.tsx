"use client";

import { useOrganization, Tournament } from '@/contexts/OrganizationContext';
import { ChevronDown, Trophy } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { getImageUrl, handleImageError } from '@/utils/image';

export default function TournamentSelector() {
    const { tournaments, activeTournament, setActiveTournament } = useOrganization();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    if (tournaments.length <= 1) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg border border-white/10 hover:bg-white/20 transition-colors"
            >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {activeTournament?.image ? (
                        <img
                            src={getImageUrl(activeTournament.image)}
                            alt={activeTournament.name}
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                        />
                    ) : (
                        <Trophy size={12} className="text-white/70" />
                    )}
                </div>
                <span className="font-medium text-white text-xs truncate max-w-[120px]">
                    {activeTournament?.name || 'Выберите турнир'}
                </span>
                <ChevronDown size={14} className={`text-white/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-kmff-dark rounded-lg shadow-lg border border-white/20 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 text-xs font-medium text-white/40 uppercase tracking-wider">
                        Турниры
                    </div>
                    {tournaments.map((tournament) => (
                        <button
                            key={`${tournament.type}-${tournament.id}`}
                            onClick={() => {
                                setActiveTournament(tournament);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors flex items-center gap-3 ${activeTournament?.id === tournament.id && activeTournament?.type === tournament.type
                                ? 'text-primary-400 font-semibold bg-primary-900/30'
                                : 'text-white/80'
                                }`}
                        >
                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {tournament.image ? (
                                    <img
                                        src={getImageUrl(tournament.image)}
                                        alt={tournament.name}
                                        className="w-full h-full object-cover"
                                        onError={handleImageError}
                                    />
                                ) : (
                                    <Trophy size={12} className="text-white/40" />
                                )}
                            </div>
                            <span className="truncate">{tournament.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
