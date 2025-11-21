import { Calendar, MapPin } from 'lucide-react';

const MatchWidget = () => {
    const matches = [
        {
            id: 1,
            homeTeam: 'Кайрат',
            awayTeam: 'Астана',
            score: '3 : 1',
            date: '22 Ноября',
            time: '18:00',
            stadium: 'Сайран Арена',
            status: 'Finished'
        },
        {
            id: 2,
            homeTeam: 'Ордабасы',
            awayTeam: 'Актобе',
            score: '2 : 2',
            date: '22 Ноября',
            time: '20:00',
            stadium: 'Сайран Арена',
            status: 'Finished'
        },
        {
            id: 3,
            homeTeam: 'Елимай',
            awayTeam: 'Тобол',
            score: '- : -',
            date: '23 Ноября',
            time: '14:00',
            stadium: 'Астана Арена',
            status: 'Upcoming'
        },
        {
            id: 4,
            homeTeam: 'Шахтер',
            awayTeam: 'Жетысу',
            score: '- : -',
            date: '23 Ноября',
            time: '16:00',
            stadium: 'Астана Арена',
            status: 'Upcoming'
        }
    ];

    return (
        <section className="py-4 bg-white">
            <div className="w-full">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-kmff-dark">Матч-центр</h2>
                    <button className="text-kmff-blue font-medium hover:underline">Все матчи</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {matches.map((match) => (
                        <div key={match.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100">
                            <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    <span>{match.date}</span>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${match.status === 'Finished' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                                    {match.status === 'Finished' ? 'Завершен' : match.time}
                                </span>
                            </div>

                            <div className="flex flex-col gap-3 mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-800">{match.homeTeam}</span>
                                    <span className="font-bold text-lg text-kmff-dark">{match.score.split(':')[0]}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-800">{match.awayTeam}</span>
                                    <span className="font-bold text-lg text-kmff-dark">{match.score.split(':')[1]}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-3 mt-2">
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                    <MapPin size={12} />
                                    <span>{match.stadium}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MatchWidget;
