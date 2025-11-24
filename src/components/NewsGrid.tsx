"use client";

import { NewsItem } from '@/types/api';
import { getImageUrl } from '@/utils/image';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

interface NewsGridProps {
    news: NewsItem[];
}

const NewsGrid = ({ news }: NewsGridProps) => {
    return (
        <section className="py-8 bg-white">
            <div className="w-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-kmff-dark flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-kmff-blue rounded-full"></span>
                        Новости
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {news.map((item) => (
                        <div key={item.id} className="group">
                            <article className="flex items-start p-4 bg-white hover:bg-gray-50 transition-all duration-300 rounded-xl border border-gray-100 hover:shadow-lg hover:border-kmff-blue/20 h-full">
                                {/* Image - Standard rounded */}
                                <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                    <Image
                                        src={getImageUrl(item.image)}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100px, 112px"
                                        onError={(e) => {
                                            // Fallback handled by next/image if configured, or we can use a placeholder
                                            // For now, relying on getImageUrl to provide valid URL or fallback
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-between pl-4 h-28 py-1">
                                    {/* Title */}
                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-kmff-blue transition-colors line-clamp-3 leading-snug">
                                        {item.title}
                                    </h3>

                                    {/* Date */}
                                    {item.date && (
                                        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium mt-auto">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {item.date}
                                        </div>
                                    )}
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsGrid;
