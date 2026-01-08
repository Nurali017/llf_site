/**
 * Hook для работы с карточками (желтые/красные)
 */

import { useAPIArray } from './useAPI';
import { getYellowCards, getRedCards } from '@/services/cards';
import { Card } from '@/types/api';
import { CACHE_STRATEGIES } from '@/config/cache';

/**
 * Hook для получения списка карточек турнира
 *
 * @param leagueId - ID лиги
 * @param type - Тип карточек ('yellow' или 'red')
 * @returns Объект с массивом карточек и состоянием загрузки
 *
 * @example
 * const { cards, isLoading } = useCards(1, 'yellow');
 * const { cards, isLoading } = useCards(1, 'red');
 */
export function useCards(leagueId?: number, type: 'yellow' | 'red' = 'yellow') {
    const result = useAPIArray<Card>(
        leagueId ? `cards-${type}-${leagueId}` : null,
        () => type === 'yellow' ? getYellowCards(leagueId!) : getRedCards(leagueId!),
        CACHE_STRATEGIES.STATIC
    );

    return {
        cards: result.data,
        isLoading: result.isLoading,
        isError: result.isError,
        error: result.error,
        refresh: result.refresh,
    };
}
