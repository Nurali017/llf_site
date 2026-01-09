import { useState, useEffect } from 'react';
import { useCupGroups } from '@/hooks/useCupGroups';
import { usePlayoffStages } from '@/hooks/usePlayoffStages';
import GroupStandingsTab from './GroupStandingsTab';
import PlayoffTab from './PlayoffTab';

interface CupStandingsWidgetProps {
    cupId: number;
}

const CupStandingsWidget = ({ cupId }: CupStandingsWidgetProps) => {
    const { data: groups, isLoading: groupsLoading } = useCupGroups(cupId);
    const { data: playoffStages, isLoading: playoffLoading } = usePlayoffStages(cupId);
    const [activeTab, setActiveTab] = useState<'groups' | 'playoff'>('groups');

    // Determine default tab based on data availability
    useEffect(() => {
        if (!groupsLoading && !playoffLoading) {
            const hasGroups = groups && groups.length > 0;
            const hasPlayoff = playoffStages && playoffStages.length > 0;

            if (hasGroups) {
                setActiveTab('groups');
            } else if (hasPlayoff) {
                setActiveTab('playoff');
            }
        }
    }, [groups, playoffStages, groupsLoading, playoffLoading]);

    const hasGroups = groups && groups.length > 0;
    const hasPlayoff = playoffStages && playoffStages.length > 0;

    if (groupsLoading && playoffLoading) {
        return (
            <div className="rounded-lg shadow-md bg-kmff-dark p-5">
                <div className="font-display text-sm text-center text-white/60">
                    Загрузка...
                </div>
            </div>
        );
    }

    if (!hasGroups && !hasPlayoff) {
        return (
            <div className="rounded-lg shadow-md bg-kmff-dark p-5">
                <div className="font-display text-sm text-center text-white/60">
                    Нет данных
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg shadow-md bg-kmff-dark overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
                {hasGroups && (
                    <button
                        onClick={() => setActiveTab('groups')}
                        className={`flex-1 px-6 py-3 font-display text-sm font-medium transition-all duration-200 ${
                            activeTab === 'groups'
                                ? 'bg-primary-700 text-white'
                                : 'bg-kmff-dark text-white/70 hover:bg-white/5'
                        }`}
                    >
                        Группы
                    </button>
                )}
                {hasPlayoff && (
                    <button
                        onClick={() => setActiveTab('playoff')}
                        className={`flex-1 px-6 py-3 font-display text-sm font-medium transition-all duration-200 ${
                            activeTab === 'playoff'
                                ? 'bg-primary-700 text-white'
                                : 'bg-kmff-dark text-white/70 hover:bg-white/5'
                        }`}
                    >
                        Плэй-офф
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="min-h-[300px]">
                {activeTab === 'groups' && groups && <GroupStandingsTab groups={groups} />}
                {activeTab === 'playoff' && <PlayoffTab cupId={cupId} />}
            </div>
        </div>
    );
};

export default CupStandingsWidget;
