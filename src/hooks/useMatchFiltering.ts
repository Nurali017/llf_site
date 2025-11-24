import { useMemo } from 'react';
import { DisplayMatch } from '@/components/MatchCard';

export type FilterType = 'all' | 'finished' | 'upcoming';

export function useMatchFiltering(matches: DisplayMatch[], filter: FilterType) {
    return useMemo(() => {
        if (filter === 'all') {
            // For 'all', we want a specific order:
            // [Finished (Old -> New)] -> [Live] -> [Upcoming (Soon -> Far)]
            // But wait, the requirement says:
            // "Timeline view: [Past (Old -> New)] -> [Live] -> [Future (Soon -> Far)]"
            // Actually, usually past matches are sorted New -> Old (most recent first) or Old -> New?
            // In the original code:
            // finished.sort((a, b) => (b.rawDate?.getTime() || 0) - (a.rawDate?.getTime() || 0)); // Descending (New -> Old)
            // Then: return [...[...finished].reverse(), ...live, ...upcoming];
            // So finished are reversed back to Ascending (Old -> New).
            // Let's keep this logic.

            const live = matches.filter(m => m.status === 'live');
            const upcoming = matches.filter(m => m.status === 'upcoming');
            const finished = matches.filter(m => m.status === 'finished');

            // Sort logic should ideally be passed in or handled before, but let's handle it here if matches are just a flat list
            // Assuming matches are already processed into DisplayMatch objects but maybe not sorted?
            // Let's sort them here to be safe.

            const sortedLive = [...live].sort((a, b) => (a.rawDate?.getTime() || 0) - (b.rawDate?.getTime() || 0));
            const sortedUpcoming = [...upcoming].sort((a, b) => (a.rawDate?.getTime() || 0) - (b.rawDate?.getTime() || 0));

            // Finished: Old -> New for timeline
            const sortedFinished = [...finished].sort((a, b) => (a.rawDate?.getTime() || 0) - (b.rawDate?.getTime() || 0));

            return [...sortedFinished, ...sortedLive, ...sortedUpcoming];
        }

        if (filter === 'finished') {
            // Finished tab: Most recent first (Descending)
            return matches
                .filter(m => m.status === 'finished')
                .sort((a, b) => (b.rawDate?.getTime() || 0) - (a.rawDate?.getTime() || 0));
        }

        if (filter === 'upcoming') {
            // Upcoming tab: Soonest first (Ascending)
            return matches
                .filter(m => m.status === 'upcoming')
                .sort((a, b) => (a.rawDate?.getTime() || 0) - (b.rawDate?.getTime() || 0));
        }

        return matches;
    }, [matches, filter]);
}
