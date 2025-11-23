import useSWR from 'swr';
import { getCupGroups } from '@/services/standings';

export function useCupGroups(cupId: number | null) {
    return useSWR(
        cupId ? `cup-groups-${cupId}` : null,
        () => cupId ? getCupGroups(cupId) : Promise.resolve([]),
        {
            revalidateOnFocus: false,
            dedupingInterval: 30000
        }
    );
}
