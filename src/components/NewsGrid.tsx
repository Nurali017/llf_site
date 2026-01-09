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
        <section className="py-5 bg-neutral-50">
            <div className="w-full">
                {/* Header */}
                <div className="mb-8 pb-4 border-b border-neutral-200">
                    <h2 className="font-display text-h1 font-medium tracking-tight text-neutral-900">
                        Новости
                    </h2>
                </div>

                {news.length === 0 ? (
                    <div className="text-center py-16 rounded-lg border border-neutral-200 bg-white">
                        <div className="text-6xl mb-4">📰</div>
                        <p className="font-display text-lg font-medium mb-2 text-neutral-800">Новостей пока нет</p>
                        <p className="font-display text-sm text-neutral-600">Загляните позже</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {news.map((item) => (
                            <div key={item.id} className="group">
                                <article className="flex items-start p-5 rounded-lg border border-neutral-200 bg-white hover:border-primary-500 transition-colors h-full">
                                    {/* Image - Rounded */}
                                    <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg">
                                        <Image
                                            src={getImageUrl(item.image)}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform group-hover:scale-105"
                                            sizes="(max-width: 768px) 100px, 112px"
                                            onError={(e) => {
                                                // Fallback handled by next/image
                                            }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col justify-between pl-5 h-28">
                                        {/* Title */}
                                        <h3 className="font-display text-base font-medium leading-tight line-clamp-3 text-neutral-800">
                                            {item.title}
                                        </h3>

                                        {/* Date */}
                                        {item.date && (
                                            <div className="flex items-center gap-2 font-display text-sm text-neutral-500 mt-auto">
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
