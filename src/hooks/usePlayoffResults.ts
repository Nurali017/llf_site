import useSWR from 'swr';
import { getPlayoffResults } from '@/services/playoffs';

export function usePlayoffResults(playoffId: number | null) {
    return useSWR(
        playoffId ? `playoff-results-${playoffId}` : null,
        () => playoffId ? getPlayoffResults(playoffId) : Promise.resolve([])
    );
}
