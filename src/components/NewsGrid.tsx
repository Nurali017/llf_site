import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { NewsItem } from '@/data/news';

interface NewsGridProps {
    news: NewsItem[];
}

const NewsGrid = ({ news }: NewsGridProps) => {
    return (
        <section className="py-4 bg-white">
            <div className="w-full">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-kmff-dark">Новости</h2>
                    <Link href="/news" className="text-kmff-blue font-medium hover:underline text-sm md:text-base">
                        Все новости
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                    {news.map((item) => (
                        <Link key={item.id} href={`/news/${item.id}`} className="group">
                            <article className="flex items-start p-3 bg-white hover:bg-gray-50 transition-all duration-300 rounded-lg hover:-translate-y-2 hover:shadow-2xl border border-transparent hover:border-qjl-blue/20">
                                {/* Image - Fixed size 100x100 with skew */}
                                <div className="relative w-[100px] h-[100px] flex-shrink-0 overflow-hidden transform -skew-x-6 ml-2">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transform skew-x-6 scale-110 transition-transform duration-500 group-hover:scale-125" // Counter-skew image to keep it straight
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-center pl-3">
                                    {/* Title */}
                                    <h3 className="text-[16px] font-bold text-qjl-dark group-hover:text-qjl-blue transition-colors line-clamp-3 leading-tight mb-1">
                                        {item.title}
                                    </h3>

                                    {/* Date */}
                                    <div className="text-[#999999] text-[12px] mt-1">
                                        {item.date}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsGrid;
