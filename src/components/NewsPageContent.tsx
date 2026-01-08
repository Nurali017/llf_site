"use client";

import React from 'react';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useNews } from '@/hooks/useNews';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Skeleton } from '@/components/ui/Skeleton';
import { NewsItem } from '@/types/api';
import { getImageUrl } from '@/utils/image';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { mutate } from 'swr';

const ITEMS_PER_PAGE = 8;

function NewsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <Skeleton className="h-48 md:h-56 w-full" />
                    <div className="p-5">
                        <Skeleton className="h-5 w-full mb-2" />
                        <Skeleton className="h-5 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3 mb-4" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function EmptyState() {
    return (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-6xl mb-4">📰</div>
            <p className="text-gray-500 font-medium">Новостей пока нет</p>
            <p className="text-gray-400 text-sm mt-2">Загляните позже</p>
        </div>
    );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="text-center py-12 bg-red-50 rounded-xl border border-red-100">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            <p className="text-gray-700 font-medium mb-2">Ошибка загрузки новостей</p>
            <p className="text-gray-500 text-sm mb-4">Не удалось загрузить данные</p>
            <button
                onClick={onRetry}
                className="bg-kmff-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Повторить
            </button>
        </div>
    );
}

/**
 * Карточка новости
 * Обернута в React.memo для оптимизации производительности
 */
const NewsCard = React.memo(function NewsCard({ item }: { item: NewsItem }) {
    return (
        <article className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-kmff-blue/20 transition-all duration-300">
            <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
                <Image
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-kmff-blue transition-colors line-clamp-2 mb-3">
                    {item.title}
                </h3>

                {item.description && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {item.description}
                    </p>
                )}

                {item.date && (
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                    </div>
                )}
            </div>
        </article>
    );
});

export default function NewsPageContent() {
    const { selectedOrganization, isLoading: orgLoading } = useOrganization();
    const { news, isLoading, isError } = useNews(selectedOrganization?.id);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const visibleNews = news.slice(0, visibleCount);
    const hasMore = visibleCount < news.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    };

    const handleRetry = () => {
        if (selectedOrganization?.id) {
            mutate(`/api/page/tape?organization=${selectedOrganization.id}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs />

                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-kmff-dark flex items-center gap-3">
                        <span className="w-1.5 h-10 bg-kmff-blue rounded-full"></span>
                        Новости
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Последние новости и события мини-футбола Казахстана
                    </p>
                </div>

                {(orgLoading || isLoading) ? (
                    <NewsGridSkeleton />
                ) : isError ? (
                    <ErrorState onRetry={handleRetry} />
                ) : news.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {visibleNews.map((item) => (
                                <NewsCard key={item.id} item={item} />
                            ))}
                        </div>

                        {hasMore && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={handleLoadMore}
                                    className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 hover:border-kmff-blue/30 transition-all duration-300"
                                >
                                    Показать ещё
                                </button>
                            </div>
                        )}

                        <p className="text-center text-gray-400 text-sm mt-4">
                            Показано {visibleNews.length} из {news.length} новостей
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
