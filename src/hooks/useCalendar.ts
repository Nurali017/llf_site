import useSWR from 'swr';
import { getMatchDates, getMatchesByDate } from '@/services/calendar';
import { Match } from '@/types/api';

export function useMatchDates(leagueId?: number, cupId?: number) {
    const { data, error, isLoading } = useSWR<string[]>(
        `/api/page/matches/dates?league=${leagueId}&cup=${cupId}`,
        () => getMatchDates(leagueId, cupId),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000, // 1 minute cache
        }
    );

    return {
        dates: data || [],
        isLoading,
        isError: !!error,
        error,
    };
}

export function useMatchesByDate(date: string | null, leagueId?: number, cupId?: number) {
    const { data, error, isLoading } = useSWR<Match[]>(
        date ? `/api/page/matches?date=${date}&league=${leagueId}&cup=${cupId}` : null,
        () => getMatchesByDate(date!, leagueId, cupId),
        {
            revalidateOnFocus: false,
            dedupingInterval: 30000, // 30 seconds cache
        }
    );

    return {
        matches: data || [],
        isLoading,
        isError: !!error,
        error,
    };
}
