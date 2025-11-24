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
        return <div className="text-center py-8 text-gray-400">Загрузка...</div>;
    }

    if (!hasGroups && !hasPlayoff) {
        return <div className="text-center py-8 text-gray-400">Нет данных</div>;
    }

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex p-1 bg-black/20 rounded-full w-fit mx-auto border border-white/5">
                {hasGroups && (
                    <button
                        onClick={() => setActiveTab('groups')}
                        className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === 'groups'
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        Группы
                    </button>
                )}
                {hasPlayoff && (
                    <button
                        onClick={() => setActiveTab('playoff')}
                        className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === 'playoff'
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
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
