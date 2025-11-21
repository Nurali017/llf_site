import TopScorers from './TopScorers';

export default function Aside() {
    return (
        <aside className="bg-white rounded-2xl p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-qjl-dark">Турнирная таблица</h3>
                <select className="bg-gray-100 rounded-lg px-3 py-1 text-sm font-bold text-qjl-dark border-none outline-none">
                    <option>QJ League</option>
                </select>
            </div>

            <div className="space-y-4">
                {/* Mock Table Header */}
                <div className="grid grid-cols-12 text-xs text-gray-400 font-bold px-2">
                    <div className="col-span-1">#</div>
                    <div className="col-span-7">Команда</div>
                    <div className="col-span-2 text-center">И</div>
                    <div className="col-span-2 text-center">О</div>
                </div>

                {/* Mock Table Rows */}
                {[
                    { id: 1, name: "Кайрат", games: 22, points: 58, logo: "🟡" },
                    { id: 2, name: "Актобе", games: 22, points: 45, logo: "🔴" },
                    { id: 3, name: "Астана", games: 22, points: 42, logo: "🔵" },
                    { id: 4, name: "Ордабасы", games: 22, points: 39, logo: "⚪" },
                    { id: 5, name: "Шахтер", games: 22, points: 35, logo: "🟠" },
                    { id: 6, name: "Тобол", games: 22, points: 32, logo: "🟢" },
                    { id: 7, name: "Атырау", games: 22, points: 28, logo: "🔵" },
                    { id: 8, name: "Тараз", games: 22, points: 25, logo: "🟡" },
                    { id: 9, name: "Каспий", games: 22, points: 22, logo: "⚪" },
                    { id: 10, name: "Жетысу", games: 22, points: 19, logo: "🔴" },
                    { id: 11, name: "Кызылжар", games: 22, points: 16, logo: "🟠" },
                    { id: 12, name: "Окжетпес", games: 22, points: 12, logo: "🟢" },
                ].map((team) => (
                    <div key={team.id} className="grid grid-cols-12 items-center text-sm font-bold text-qjl-dark hover:bg-gray-50 p-2 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer">
                        <div className="col-span-1 text-gray-400">{team.id}</div>
                        <div className="col-span-7 flex items-center gap-2">
                            <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-xs">{team.logo}</span>
                            {team.name}
                        </div>
                        <div className="col-span-2 text-center">{team.games}</div>
                        <div className="col-span-2 text-center">{team.points}</div>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <TopScorers />
            </div>
        </aside>
    );
}
