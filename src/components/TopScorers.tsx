import Image from 'next/image';

const TopScorers = () => {
    const scorers = [
        { id: 1, name: 'Алиев А.', team: 'Кайрат', goals: 15, image: '/player-1.png' },
        { id: 2, name: 'Иванов С.', team: 'Астана', goals: 12, image: '/player-2.png' },
        { id: 3, name: 'Петров Д.', team: 'Ордабасы', goals: 10, image: null },
        { id: 4, name: 'Смаков С.', team: 'Актобе', goals: 9, image: null },
        { id: 5, name: 'Жумаев К.', team: 'Тобол', goals: 8, image: null },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-kmff-dark">Бомбардиры</h3>
                <button className="text-kmff-blue text-sm font-bold hover:underline">Все</button>
            </div>

            <div className="space-y-6">
                {/* Top Scorer Highlight */}
                <div className="relative bg-gradient-to-br from-kmff-blue to-blue-600 rounded-xl p-4 text-white overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative z-10 w-2/3">
                        <div className="text-4xl font-bold mb-1">{scorers[0].goals}</div>
                        <div className="text-xs opacity-80 mb-2">голов</div>
                        <div className="font-bold text-lg leading-tight mb-1">{scorers[0].name}</div>
                        <div className="text-xs opacity-80">{scorers[0].team}</div>
                    </div>

                    {/* Cutout Image */}
                    <div className="absolute -bottom-2 -right-4 w-32 h-40">
                        <Image
                            src={scorers[0].image || '/player-1.png'}
                            alt={scorers[0].name}
                            fill
                            className="object-contain object-bottom drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                </div>

                {/* List */}
                <div className="space-y-3">
                    {scorers.slice(1).map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-default">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400 font-bold w-4">{index + 2}</span>
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-800">{player.name}</span>
                                    <span className="text-xs text-gray-500">{player.team}</span>
                                </div>
                            </div>
                            <span className="font-bold text-kmff-blue">{player.goals}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopScorers;
