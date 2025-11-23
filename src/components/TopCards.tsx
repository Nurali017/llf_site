"use client";

import Image from 'next/image';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useCards } from '@/hooks/useCards';
import { useMemo, useState } from 'react';
import { getImageUrl } from '@/utils/image';

const TopCards = () => {
    const { selectedOrganization } = useOrganization();
    const [cardType, setCardType] = useState<'yellow' | 'red'>('yellow');
    const { cards: apiCards, isLoading, isError } = useCards(selectedOrganization?.leagueId, cardType);

    // Маппинг API данных в формат компонента
    const cards = useMemo(() => {
        if (!apiCards) return [];

        return apiCards
            .map(card => ({
                id: card.player.id,
                name: `${card.player.firstname} ${card.player.lastname}`,
                team: card.team.name,
                count: card.card_count,
                image: card.player.image,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [apiCards]);

    return (
        <div className="space-y-6">
            {/* Card Type Selector */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setCardType('yellow')}
                    className={`flex-1 py-1 text-xs font-bold rounded transition-colors ${cardType === 'yellow' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                    Желтые
                </button>
                <button
                    onClick={() => setCardType('red')}
                    className={`flex-1 py-1 text-xs font-bold rounded transition-colors ${cardType === 'red' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                    Красные
                </button>
            </div>

            {isLoading ? (
                <div className="text-center py-8 text-gray-400">Загрузка...</div>
            ) : isError || cards.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                    {isError ? 'Ошибка загрузки' : 'Нет данных'}
                </div>
            ) : (
                <div className="space-y-3">
                    {cards.map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-default">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400 font-bold w-4">{index + 1}</span>
                                <div className="w-8 h-8 relative rounded-full overflow-hidden bg-gray-100">
                                    {player.image ? (
                                        <Image
                                            src={getImageUrl(player.image)}
                                            alt={player.name}
                                            fill
                                            sizes="32px"
                                            className="object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                const parent = target.parentElement;
                                                if (parent) {
                                                    parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">👤</div>';
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                            👤
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-800">{player.name}</span>
                                    <span className="text-xs text-gray-500">{player.team}</span>
                                </div>
                            </div>
                            <span className={`font-bold ${cardType === 'yellow' ? 'text-yellow-600' : 'text-red-600'}`}>
                                {player.count}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopCards;
