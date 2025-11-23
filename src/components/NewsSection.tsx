import Image from "next/image";

export default function NewsSection() {
    return (
        <section className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-qjl-dark">Новости</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main News Item */}
                <div className="group">
                    <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">IMAGE</div>
                    </div>
                    <h4 className="font-bold text-lg text-qjl-dark group-hover:text-qjl-pink transition-colors mb-2">
                        Freedom QJ League W: Team of the Year
                    </h4>
                    <p className="text-gray-400 text-sm">21 November 2025</p>
                </div>

                {/* News List */}
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4 group">
                            <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
                            <div>
                                <h4 className="font-bold text-sm text-qjl-dark group-hover:text-qjl-pink transition-colors mb-2 line-clamp-2">
                                    Дана Кульманова: «Поддержка нужна всем спортсменам»
                                </h4>
                                <p className="text-gray-400 text-xs">18 November 2025</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
