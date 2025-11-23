import { useState, useEffect } from 'react';
import { usePlayoffStages } from '@/hooks/usePlayoffStages';
import { usePlayoffResults } from '@/hooks/usePlayoffResults';
import { getImageUrl } from '@/utils/image';
import { PlayoffStage } from '@/types/api';



interface PlayoffTabProps {
    cupId: number;
}

const PlayoffTab = ({ cupId }: PlayoffTabProps) => {
    const { data: stages, isLoading: stagesLoading } = usePlayoffStages(cupId);
    const [selectedStageId, setSelectedStageId] = useState<number | null>(null);

    // Set default stage when stages are loaded
    useEffect(() => {
        if (stages && stages.length > 0 && !selectedStageId) {
            // Sort stages if needed, or just take the first one/last one
            // Usually we want the latest stage or the first one. Let's pick the first one for now.
            setSelectedStageId(stages[0].id);
        }
    }, [stages, selectedStageId]);

    const { data: matches, isLoading: matchesLoading } = usePlayoffResults(selectedStageId);

    if (stagesLoading) {
        return <div className="text-center py-8 text-gray-400">Загрузка стадий...</div>;
    }

    if (!stages || stages.length === 0) {
        return <div className="text-center py-8 text-gray-400">Нет данных о плей-офф</div>;
    }

    return (
        <div className="space-y-6">
            {/* Stage Selector - Horizontal Scroll */}
            <div className="flex overflow-x-auto pb-2 -mx-2 px-2 gap-2 no-scrollbar">
                {stages.map((stage) => (
                    <button
                        key={stage.id}
                        onClick={() => setSelectedStageId(stage.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${selectedStageId === stage.id
                            ? 'bg-white text-qjl-dark shadow-sm'
                            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {stage.name}
                    </button>
                ))}
            </div>

            {/* Matches List */}
            {matchesLoading ? (
                <div className="text-center py-8 text-gray-400">Загрузка матчей...</div>
            ) : matches && matches.length > 0 ? (
                <div className="space-y-3">
                    {matches.map((match) => (
                        <div
                            key={match.id}
                            className="bg-white/5 border border-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between gap-4">
                                {/* Team 1 */}
                                <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                                    <div className="w-12 h-12 flex-shrink-0 bg-white/10 rounded-full p-2 border border-white/5 group-hover:border-white/20 transition-colors">
                                        <img
                                            src={getImageUrl(match.team_1.image)}
                                            alt={match.team_1.name}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/llf-logo.png';
                                            }}
                                        />
                                    </div>
                                    <span className="font-bold text-xs text-white text-center leading-tight line-clamp-2 h-8 flex items-center justify-center w-full">
                                        {match.team_1.name}
                                    </span>
                                </div>

                                {/* Score */}
                                <div className="flex flex-col items-center shrink-0">
                                    <div className="text-3xl font-black text-white whitespace-nowrap tracking-tight">
                                        {match.team_1.goals} <span className="text-gray-500 mx-1">:</span> {match.team_2.goals}
                                    </div>
                                    {match.penalty_status && (
                                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1 bg-white/10 px-2 py-0.5 rounded-full">
                                            пен. {match.team_1.penalty_goals}:{match.team_2.penalty_goals}
                                        </div>
                                    )}
                                </div>

                                {/* Team 2 */}
                                <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                                    <div className="w-12 h-12 flex-shrink-0 bg-white/10 rounded-full p-2 border border-white/5 group-hover:border-white/20 transition-colors">
                                        <img
                                            src={getImageUrl(match.team_2.image)}
                                            alt={match.team_2.name}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/llf-logo.png';
                                            }}
                                        />
                                    </div>
                                    <span className="font-bold text-xs text-white text-center leading-tight line-clamp-2 h-8 flex items-center justify-center w-full">
                                        {match.team_2.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-400">Нет матчей для этой стадии</div>
            )}
        </div>
    );
};

export default PlayoffTab;
