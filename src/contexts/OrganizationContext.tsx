"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useOrganizations } from '@/hooks/useOrganizations';
import { getCurrentSeason } from '@/services/seasons';
import { OrganizationWithSlug, SeasonLeague, SeasonCup } from '@/types/api';

export type TournamentType = 'league' | 'cup';

export interface Tournament {
    id: number;
    name: string;
    type: TournamentType;
    image?: string;
    priority?: number;
}

interface OrganizationContextType {
    selectedOrganization: OrganizationWithSlug | null;
    setSelectedOrganization: (organization: OrganizationWithSlug) => void;
    organizations: OrganizationWithSlug[];
    isLoading: boolean;
    isError: boolean;
    leagueId?: number;
    cupId?: number;
    tournaments: Tournament[];
    activeTournament: Tournament | null;
    setActiveTournament: (tournament: Tournament) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

interface OrganizationProviderProps {
    children: ReactNode;
    initialSlug?: string;
}

export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({
    children,
    initialSlug
}) => {
    const { organizations, isLoading, isError } = useOrganizations();
    const [selectedOrganization, setSelectedOrganization] = useState<OrganizationWithSlug | null>(null);

    // Инициализация выбранной организации
    useEffect(() => {
        if (!organizations || organizations.length === 0) return;

        if (initialSlug) {
            // Ищем организацию по slug из URL
            const org = organizations.find(o => o.slug === initialSlug);
            if (org) {
                setSelectedOrganization(org);
                return;
            }
        }

        // Если не нашли или не передан initialSlug, используем первую
        if (!selectedOrganization) {
            setSelectedOrganization(organizations[0]);
        }
    }, [organizations, initialSlug, selectedOrganization]);



    const [leagueId, setLeagueId] = useState<number | undefined>(undefined);
    const [cupId, setCupId] = useState<number | undefined>(undefined);
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [activeTournament, setActiveTournament] = useState<Tournament | null>(null);

    useEffect(() => {
        if (selectedOrganization) {
            getCurrentSeason(selectedOrganization.id)
                .then((response) => {
                    if (response && response.length > 0) {
                        const currentSeason = response[0];
                        console.log('Current Season Data:', currentSeason);

                        // Collect all tournaments
                        const leagues: Tournament[] = (currentSeason.leagues || []).map(l => ({
                            id: l.id,
                            name: l.name,
                            type: 'league',
                            image: l.image,
                            priority: l.priority
                        }));

                        const cups: Tournament[] = (currentSeason.cups || []).map(c => ({
                            id: c.id,
                            name: c.name,
                            type: 'cup',
                            image: c.image,
                            priority: c.priority
                        }));

                        const allTournaments = [...leagues, ...cups];

                        // Sort by priority (descending), then by name (optional fallback)
                        allTournaments.sort((a, b) => (b.priority || 0) - (a.priority || 0));

                        setTournaments(allTournaments);

                        // Set initial active tournament (highest priority)
                        if (allTournaments.length > 0) {
                            setActiveTournament(allTournaments[0]);
                        } else {
                            setActiveTournament(null);
                        }

                        // Keep legacy IDs for backward compatibility if needed, 
                        // but primarily rely on activeTournament now
                        setLeagueId(currentSeason.leagues?.[0]?.id);
                        setCupId(currentSeason.cups?.[0]?.id);
                    } else {
                        setLeagueId(undefined);
                        setCupId(undefined);
                        setTournaments([]);
                        setActiveTournament(null);
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch current season:', error);
                    setLeagueId(undefined);
                    setCupId(undefined);
                    setTournaments([]);
                    setActiveTournament(null);
                });
        }
    }, [selectedOrganization]);

    return (
        <OrganizationContext.Provider
            value={{
                selectedOrganization,
                setSelectedOrganization,
                organizations: organizations || [],
                isLoading,
                isError,
                leagueId,
                cupId,
                tournaments,
                activeTournament,
                setActiveTournament,
            }}
        >
            {children}
        </OrganizationContext.Provider>
    );
};

export const useOrganization = (): OrganizationContextType => {
    const context = useContext(OrganizationContext);
    if (!context) {
        throw new Error('useOrganization must be used within OrganizationProvider');
    }
    return context;
};
