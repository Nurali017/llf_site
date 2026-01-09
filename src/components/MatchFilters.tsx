'use client';

import { FilterType } from '@/hooks/useMatchFiltering';

interface MatchFiltersProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export function MatchFilters({ currentFilter, onFilterChange }: MatchFiltersProps) {
    return (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
            <button
                onClick={() => onFilterChange('all')}
                className={`px-6 py-2 font-display text-sm font-medium transition-all duration-200 whitespace-nowrap rounded-lg ${
                    currentFilter === 'all'
                        ? 'bg-primary-900 text-white shadow-md'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                }`}
            >
                Все матчи
            </button>
            <button
                onClick={() => onFilterChange('upcoming')}
                className={`px-6 py-2 font-display text-sm font-medium transition-all duration-200 whitespace-nowrap rounded-lg ${
                    currentFilter === 'upcoming'
                        ? 'bg-primary-900 text-white shadow-md'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                }`}
            >
                Предстоящие
            </button>
            <button
                onClick={() => onFilterChange('finished')}
                className={`px-6 py-2 font-display text-sm font-medium transition-all duration-200 whitespace-nowrap rounded-lg ${
                    currentFilter === 'finished'
                        ? 'bg-primary-900 text-white shadow-md'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                }`}
            >
                Прошедшие
            </button>
        </div>
    );
}
