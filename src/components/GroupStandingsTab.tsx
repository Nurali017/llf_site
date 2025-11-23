import { CupGroup } from '@/types/api';
import { getImageUrl } from '@/utils/image';

interface GroupStandingsTabProps {
    groups: CupGroup[];
}

const GroupStandingsTab = ({ groups }: GroupStandingsTabProps) => {
    if (!groups || groups.length === 0) {
        return <div className="text-center py-8 text-gray-400">Нет данных о группах</div>;
    }

    return (
        <div className="space-y-8">
            {groups.map((groupData) => (
                <div key={groupData.group.id} className="space-y-2">
                    <h3 className="text-lg font-bold text-white px-3 mb-2">{groupData.group.name}</h3>

                    {/* Table Header */}
                    <div className="grid grid-cols-[24px_1fr_28px_44px_32px] gap-2 items-center text-xs text-gray-400 font-medium px-2 py-2">
                        <div className="text-center">#</div>
                        <div>Команда</div>
                        <div className="text-center">И</div>
                        <div className="text-center">РМ</div>
                        <div className="text-center">О</div>
                    </div>

                    {/* Table Rows */}
                    <div className="space-y-1">
                        {groupData.group.results.map((standing, index) => {
                            // Qualification zones logic (Cups: Top 2 advance)
                            let borderClass = 'border-l-4 border-transparent';
                            if (index < 2) borderClass = 'border-l-4 border-green-500'; // Top 2 advance

                            // Goal Difference Calculation
                            const diff = standing.scored - standing.missed;
                            const diffColor = diff > 0 ? 'text-emerald-400' : diff < 0 ? 'text-red-400' : 'text-gray-400';
                            const diffText = diff > 0 ? `+${diff}` : `${diff}`;

                            return (
                                <div
                                    key={standing.team.id}
                                    className={`grid grid-cols-[24px_1fr_28px_44px_32px] gap-2 items-center ${borderClass} bg-transparent hover:bg-white/5 transition-colors duration-200 py-2 px-2 rounded-r-lg cursor-pointer`}
                                >
                                    <div className="text-gray-400 font-medium text-xs text-center">{index + 1}</div>
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-white/10 rounded-full p-0.5 overflow-hidden">
                                            <img
                                                src={getImageUrl(standing.team.image)}
                                                alt={standing.team.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/llf-logo.png';
                                                }}
                                            />
                                        </span>
                                        <span className="text-white font-semibold text-sm truncate">{standing.team.name}</span>
                                    </div>
                                    <div className="text-gray-400 text-xs text-center">{standing.game_count}</div>
                                    <div className={`text-xs font-medium text-center ${diffColor}`}>
                                        {diffText}
                                    </div>
                                    <div className="text-white font-bold text-base text-center">{standing.point}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GroupStandingsTab;
