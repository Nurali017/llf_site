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
            <div className="border-2 border-mono-100 p-8">
                <div className="font-mono text-micro uppercase tracking-wider text-center">
                    Загрузка...
                </div>
            </div>
        );
    }

    if (!hasGroups && !hasPlayoff) {
        return (
            <div className="border-2 border-mono-100 p-8">
                <div className="font-mono text-micro uppercase tracking-wider text-center">
                    Нет данных
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-0">
            {/* Brutalist Tabs */}
            <div className="flex border-2 border-mono-100 border-b-0">
                {hasGroups && (
                    <button
                        onClick={() => setActiveTab('groups')}
                        className={`flex-1 px-6 py-3 font-mono text-micro font-bold uppercase tracking-wider transition-colors duration-150 border-r-2 border-mono-100 last:border-r-0 ${
                            activeTab === 'groups'
                                ? 'bg-accent-lime text-mono-100'
                                : 'bg-mono-0 text-mono-100 hover:bg-mono-10'
                        }`}
                    >
                        Группы
                    </button>
                )}
                {hasPlayoff && (
                    <button
                        onClick={() => setActiveTab('playoff')}
                        className={`flex-1 px-6 py-3 font-mono text-micro font-bold uppercase tracking-wider transition-colors duration-150 ${
                            activeTab === 'playoff'
                                ? 'bg-accent-lime text-mono-100'
                                : 'bg-mono-0 text-mono-100 hover:bg-mono-10'
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
