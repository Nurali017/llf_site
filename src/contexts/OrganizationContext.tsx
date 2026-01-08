"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { mutate } from 'swr';
import { useOrganizations } from '@/hooks/useOrganizations';
import { getCurrentSeason } from '@/services/seasons';
import { OrganizationWithSlug, SeasonLeague, SeasonCup } from '@/types/api';
import { getStoredOrgSlug, setStoredOrgSlug, removeStoredOrgSlug } from '@/utils/localStorage';

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
    isHydrated: boolean;
    leagueId?: number;
    cupId?: number;
    tournaments: Tournament[];
    activeTournament: Tournament | null;
    setActiveTournament: (tournament: Tournament) => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

interface OrganizationProviderProps {
    children: ReactNode;
}

export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({
    children
}) => {
    const { organizations, isLoading, isError } = useOrganizations();
    const [selectedOrganization, setSelectedOrganizationState] = useState<OrganizationWithSlug | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    // Кастомный сеттер который также сохраняет в localStorage
    // и инвалидирует SWR кеш
    const setSelectedOrganization = useCallback((org: OrganizationWithSlug) => {
        setSelectedOrganizationState(org);
        setStoredOrgSlug(org.slug);

        // Инвалидируем все кеши, связанные с организацией
        // Это заставит все hooks перезагрузить данные для новой организации
        mutate(
            (key) => {
                if (typeof key === 'string') {
                    // Инвалидируем кеши которые зависят от организации
                    return (
                        key.includes('news-') ||
                        key.includes('matches-') ||
                        key.includes('live-matches-') ||
                        key.includes('standings-') ||
                        key.includes('scorers-') ||
                        key.includes('cards-')
                    );
                }
                // Для array keys (используется в useMatches)
                if (Array.isArray(key)) {
                    return key[0] === 'matches-upcoming' || key[0] === 'matches-finished';
                }
                return false;
            },
            undefined,
            { revalidate: true }
        );
    }, []);

    // Эффект гидратации - запускается только на клиенте
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Инициализация выбранной организации из localStorage
    useEffect(() => {
        if (!organizations || organizations.length === 0 || !isHydrated) return;

        // Если организация уже выбрана, не перезаписываем
        if (selectedOrganization) return;

        // Приоритет 1: Сохранённый slug из localStorage
        const storedSlug = getStoredOrgSlug();
        if (storedSlug) {
            const orgFromStorage = organizations.find(o => o.slug === storedSlug);
            if (orgFromStorage) {
                setSelectedOrganizationState(orgFromStorage);
                return;
            }
            // Невалидный сохранённый slug - очищаем
            removeStoredOrgSlug();
        }

        // Приоритет 2: По умолчанию - первая организация с городом (у них обычно есть контент)
        const defaultOrg = organizations.find(org => org.city !== null) || organizations[0];
        setSelectedOrganizationState(defaultOrg);
        setStoredOrgSlug(defaultOrg.slug);
    }, [organizations, isHydrated, selectedOrganization]);



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
                isHydrated,
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
