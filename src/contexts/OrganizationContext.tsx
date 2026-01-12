"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { mutate } from 'swr';
import { useOrganizations } from '@/hooks/useOrganizations';
import { getTournaments, Tournament } from '@/services/tournaments';
import { OrganizationWithSlug } from '@/types/api';
import { getStoredOrgSlug, setStoredOrgSlug, removeStoredOrgSlug } from '@/utils/localStorage';

export type TournamentType = 'league' | 'cup';

// Re-export Tournament for backward compatibility
export type { Tournament };

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
            getTournaments(selectedOrganization.id)
                .then((allTournaments) => {
                    // Sort by priority (ascending - lower number = higher priority)
                    // Priority 1 = highest, should be first in list
                    allTournaments.sort((a, b) => a.priority - b.priority);

                    setTournaments(allTournaments);

                    // Set initial active tournament (highest priority = lowest number)
                    if (allTournaments.length > 0) {
                        setActiveTournament(allTournaments[0]);
                    } else {
                        setActiveTournament(null);
                    }

                    // Keep legacy IDs for backward compatibility if needed
                    const firstLeague = allTournaments.find(t => t.type === 'league');
                    const firstCup = allTournaments.find(t => t.type === 'cup');
                    setLeagueId(firstLeague?.id);
                    setCupId(firstCup?.id);
                })
                .catch((error) => {
                    console.error('Failed to load tournaments:', error);
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
