import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
    return (
        <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="flex-1">
                        <span className="inline-block text-kmff-blue font-bold uppercase tracking-widest text-sm mb-4">
                            О Лиге
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-kmff-dark mb-6 leading-tight">
                            Развиваем любительский футбол в Казахстане вместе
                        </h2>
                        <div className="space-y-4 text-gray-500 leading-relaxed">
                            <p>
                                Казахстанская Лига Любителей Футбола (LLF) совместно с Казахстанской Федерацией Мини-футбола (KMFF) создает уникальную экосистему для развития массового спорта.
                            </p>
                            <p>
                                Мы объединяем тысячи игроков, сотни команд и десятки городов в едином турнирном пространстве. Наша цель — сделать футбол доступным, зрелищным и профессионально организованным для каждого любителя.
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 text-kmff-blue font-bold hover:gap-3 transition-all"
                            >
                                <span>Подробнее о нас</span>
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Stats / Visuals */}
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="bg-white shadow-sm p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="text-4xl font-bold text-kmff-pink mb-2">4 932</div>
                            <div className="text-sm text-gray-500 font-medium">Команд</div>
                        </div>
                        <div className="bg-white shadow-sm p-6 rounded-2xl text-center mt-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="text-4xl font-bold text-kmff-dark mb-2">32</div>
                            <div className="text-sm text-gray-500 font-medium">Филиалов</div>
                        </div>
                        <div className="bg-white shadow-sm p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="text-4xl font-bold text-kmff-blue mb-2">51 320</div>
                            <div className="text-sm text-gray-500 font-medium">Игроков</div>
                        </div>
                        <div className="bg-white shadow-sm p-6 rounded-2xl text-center mt-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="text-4xl font-bold text-kmff-pink mb-2">2009</div>
                            <div className="text-sm text-gray-500 font-medium">Год основания</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
