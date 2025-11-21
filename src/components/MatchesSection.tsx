export default function MatchesSection() {
    return (
        <section className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-qjl-dark">Матчи</h3>
                <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-qjl-blue hover:text-white transition-colors">
                        ←
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-qjl-blue hover:text-white transition-colors">
                        →
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Match Card */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="text-center text-xs text-gray-400 mb-4">21 Ноября, 15:00</div>
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex flex-col items-center gap-2 w-1/3">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">🟡</div>
                                <span className="font-bold text-sm text-qjl-dark">Кайрат</span>
                            </div>
                            <div className="font-bold text-2xl text-qjl-dark">2 : 1</div>
                            <div className="flex flex-col items-center gap-2 w-1/3">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">🔴</div>
                                <span className="font-bold text-sm text-qjl-dark">Актобе</span>
                            </div>
                        </div>
                        <div className="text-center text-xs text-green-500 font-bold mt-2">Матч завершен</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
