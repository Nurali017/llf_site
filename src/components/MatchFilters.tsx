'use client';

import { FilterType } from '@/hooks/useMatchFiltering';

interface MatchFiltersProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export function MatchFilters({ currentFilter, onFilterChange }: MatchFiltersProps) {
    return (
        <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-2 md:pb-0 border-2 border-mono-100">
            <button
                onClick={() => onFilterChange('all')}
                className={`px-6 py-3 font-mono text-micro font-bold uppercase tracking-wider transition-colors duration-150 whitespace-nowrap border-r-2 border-mono-100 last:border-r-0 ${
                    currentFilter === 'all'
                        ? 'bg-accent-lime text-mono-100'
                        : 'bg-mono-0 text-mono-100 hover:bg-mono-10'
                }`}
            >
                Все матчи
            </button>
            <button
                onClick={() => onFilterChange('upcoming')}
                className={`px-6 py-3 font-mono text-micro font-bold uppercase tracking-wider transition-colors duration-150 whitespace-nowrap border-r-2 border-mono-100 last:border-r-0 ${
                    currentFilter === 'upcoming'
                        ? 'bg-accent-lime text-mono-100'
                        : 'bg-mono-0 text-mono-100 hover:bg-mono-10'
                }`}
            >
                Предстоящие
            </button>
            <button
                onClick={() => onFilterChange('finished')}
                className={`px-6 py-3 font-mono text-micro font-bold uppercase tracking-wider transition-colors duration-150 whitespace-nowrap ${
                    currentFilter === 'finished'
                        ? 'bg-accent-lime text-mono-100'
                        : 'bg-mono-0 text-mono-100 hover:bg-mono-10'
                }`}
            >
                Прошедшие
            </button>
        </div>
    );
}
