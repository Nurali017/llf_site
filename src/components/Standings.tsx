const Standings = () => {
    const teams = [
        { pos: 1, name: 'Кайрат', games: 10, wins: 8, draws: 1, losses: 1, points: 25 },
        { pos: 2, name: 'Астана', games: 10, wins: 7, draws: 2, losses: 1, points: 23 },
        { pos: 3, name: 'Ордабасы', games: 10, wins: 6, draws: 3, losses: 1, points: 21 },
        { pos: 4, name: 'Актобе', games: 10, wins: 5, draws: 2, losses: 3, points: 17 },
        { pos: 5, name: 'Тобол', games: 10, wins: 4, draws: 3, losses: 3, points: 15 },
        { pos: 6, name: 'Шахтёр', games: 10, wins: 4, draws: 2, losses: 4, points: 14 },
        { pos: 7, name: 'Атырау', games: 10, wins: 3, draws: 4, losses: 3, points: 13 },
        { pos: 8, name: 'Тараз', games: 10, wins: 3, draws: 3, losses: 4, points: 12 },
        { pos: 9, name: 'Каспий', games: 10, wins: 3, draws: 2, losses: 5, points: 11 },
        { pos: 10, name: 'Жетысу', games: 10, wins: 2, draws: 3, losses: 5, points: 9 },
        { pos: 11, name: 'Кызылжар', games: 10, wins: 2, draws: 2, losses: 6, points: 8 },
        { pos: 12, name: 'Окжетпес', games: 10, wins: 1, draws: 3, losses: 6, points: 6 },
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-kmff-dark">Турнирная таблица</h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-kmff-dark text-white font-medium border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 w-16 text-center">#</th>
                                    <th className="px-6 py-4">Команда</th>
                                    <th className="px-6 py-4 text-center">И</th>
                                    <th className="px-6 py-4 text-center">В</th>
                                    <th className="px-6 py-4 text-center">Н</th>
                                    <th className="px-6 py-4 text-center">П</th>
                                    <th className="px-6 py-4 text-center font-bold text-white">О</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {teams.map((team) => (
                                    <tr key={team.pos} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-center font-medium text-gray-400">{team.pos}</td>
                                        <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                                            {/* Placeholder for team logo */}
                                            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                                            {team.name}
                                        </td>
                                        <td className="px-6 py-4 text-center">{team.games}</td>
                                        <td className="px-6 py-4 text-center">{team.wins}</td>
                                        <td className="px-6 py-4 text-center">{team.draws}</td>
                                        <td className="px-6 py-4 text-center">{team.losses}</td>
                                        <td className="px-6 py-4 text-center font-bold text-kmff-blue text-base">{team.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Standings;
