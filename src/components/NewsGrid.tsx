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
        <section className="py-8 bg-mono-0">
            <div className="w-full">
                {/* Brutalist Header */}
                <div className="mb-8 pb-4 border-b-2 border-mono-100">
                    <h2 className="font-display text-h1 font-bold uppercase tracking-tight">
                        Новости
                    </h2>
                </div>

                {news.length === 0 ? (
                    <div className="text-center py-16 border-2 border-mono-100">
                        <div className="text-6xl mb-4">📰</div>
                        <p className="font-display text-body font-bold mb-2">Новостей пока нет</p>
                        <p className="font-mono text-micro uppercase opacity-60">Загляните позже</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {news.map((item) => (
                            <div key={item.id} className="group">
                                <article className="flex items-start p-5 border-2 border-mono-100 bg-mono-0 hover:bg-accent-lime transition-colors duration-150 h-full">
                                    {/* Image - Sharp Corners, Grayscale */}
                                    <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden border-2 border-mono-100">
                                        <Image
                                            src={getImageUrl(item.image)}
                                            alt={item.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                            sizes="(max-width: 768px) 100px, 112px"
                                            onError={(e) => {
                                                // Fallback handled by next/image
                                            }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col justify-between pl-5 h-28">
                                        {/* Title - Display Font */}
                                        <h3 className="font-display text-body font-bold leading-tight line-clamp-3 uppercase">
                                            {item.title}
                                        </h3>

                                        {/* Date - Monospace */}
                                        {item.date && (
                                            <div className="flex items-center gap-2 font-mono text-micro uppercase tracking-wider opacity-60 mt-auto">
                                                <Calendar className="w-4 h-4" />
                                                {item.date}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewsGrid;
