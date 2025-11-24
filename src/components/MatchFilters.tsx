'use client';

import { FilterType } from '@/hooks/useMatchFiltering';

interface MatchFiltersProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export function MatchFilters({ currentFilter, onFilterChange }: MatchFiltersProps) {
    return (
        <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
            <button
                onClick={() => onFilterChange('all')}
                className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${currentFilter === 'all'
                    ? 'bg-kmff-blue text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
            >
                Все матчи
            </button>
            <button
                onClick={() => onFilterChange('upcoming')}
                className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${currentFilter === 'upcoming'
                    ? 'bg-kmff-blue text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
            >
                Предстоящие
            </button>
            <button
                onClick={() => onFilterChange('finished')}
                className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${currentFilter === 'finished'
                    ? 'bg-kmff-blue text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
            >
                Прошедшие
            </button>
        </div>
    );
}
