import useSWR from 'swr';
import { getPlayoffStages } from '@/services/playoffs';

export function usePlayoffStages(cupId: number | null) {
    return useSWR(
        cupId ? `playoff-stages-${cupId}` : null,
        () => cupId ? getPlayoffStages(cupId) : Promise.resolve([])
    );
}
