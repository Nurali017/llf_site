import useSWR from 'swr';
import { getYellowCards, getRedCards } from '@/services/cards';
import { Card } from '@/types/api';

export function useCards(leagueId?: number, type: 'yellow' | 'red' = 'yellow') {
    const { data, error, isLoading } = useSWR<Card[]>(
        leagueId ? `/api/page/table/table/${type}?league=${leagueId}` : null,
        () => type === 'yellow' ? getYellowCards(leagueId!) : getRedCards(leagueId!),
        {
            revalidateOnFocus: false,
            dedupingInterval: 30000,
            revalidateOnReconnect: true,
        }
    );

    return {
        cards: data,
        isLoading,
        isError: !!error,
        error,
    };
}
