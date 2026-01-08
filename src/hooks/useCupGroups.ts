/**
 * Hook для работы с группами кубка
 */

import { useAPIArray } from './useAPI';
import { getCupGroups } from '@/services/standings';
import { CACHE_STRATEGIES } from '@/config/cache';
import { CupGroup } from '@/types/api';

/**
 * Hook для получения групп кубка
 *
 * @param cupId - ID кубка
 * @returns Объект с группами кубка и состоянием загрузки
 *
 * @example
 * const { data: groups, isLoading, isError } = useCupGroups(5);
 */
export function useCupGroups(cupId: number | null) {
    return useAPIArray<CupGroup>(
        cupId ? `cup-groups-${cupId}` : null,
        () => cupId ? getCupGroups(cupId) : Promise.resolve([]),
        CACHE_STRATEGIES.STATIC
    );
}
