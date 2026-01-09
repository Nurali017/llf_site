"use client";

import { useOrganization } from '@/contexts/OrganizationContext';
import TopScorers from './TopScorers';
import StandingsWidget from './StandingsWidget';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Aside() {
    const { selectedOrganization } = useOrganization();

    if (!selectedOrganization) {
        return (
            <aside className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="text-center py-5 text-gray-400">Загрузка...</div>
            </aside>
        );
    }

    return (
        <aside className="flex flex-col gap-4">
            <ErrorBoundary fallback={<div className="bg-white rounded-lg border border-gray-200 p-4 text-center text-gray-500">Ошибка загрузки таблицы</div>}>
                <StandingsWidget />
            </ErrorBoundary>
            <TopScorers />
        </aside>
    );
}
