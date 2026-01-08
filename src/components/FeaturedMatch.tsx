"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useNews } from '@/hooks/useNews';
import { getImageUrl } from '@/utils/image';
import Link from 'next/link';

export default function FeaturedMatch() {
    const { selectedOrganization } = useOrganization();
    const { news: sliderNews, isLoading } = useNews(selectedOrganization?.id, 'SLIDER');

    // State для управления слайдером
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Ограничиваем до первых 5 новостей
    const slidesData = useMemo(() => {
        return sliderNews?.slice(0, 5) || [];
    }, [sliderNews]);

    // Функции навигации
    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % slidesData.length);
    }, [slidesData.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    }, [slidesData.length]);

    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index);
        setIsPaused(true);
        // Возобновить автопрокрутку через 10 секунд после ручной навигации
        setTimeout(() => setIsPaused(false), 10000);
    }, []);

    // Обработчики hover для паузы автопрокрутки
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    // Автопрокрутка каждые 5 секунд
    useEffect(() => {
        if (isPaused || !slidesData || slidesData.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slidesData.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, slidesData]);

    // Сброс индекса при изменении данных
    useEffect(() => {
        if (currentIndex >= slidesData.length && slidesData.length > 0) {
            setCurrentIndex(0);
        }
    }, [slidesData.length, currentIndex]);

    if (isLoading || !sliderNews || sliderNews.length === 0) {
        return null;
    }

    return (
        <section
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-4 border-mono-100 bg-mono-0 p-8 relative overflow-hidden"
        >
            {/* Brutalist Header */}
            <div className="mb-6 pb-4 border-b-2 border-mono-100">
                <h2 className="font-display text-h2 font-bold uppercase tracking-tight">
                    Главные новости
                </h2>
            </div>

            <div className="relative">
                {/* Контейнер слайдов с fade transition */}
                <div className="relative h-auto min-h-[400px]">
                    {slidesData.map((news, index) => (
                        <div
                            key={news.id}
                            className={`absolute inset-0 transition-opacity duration-700 ${
                                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        >
                            <Link href={`/news/${news.id}`} className="block group">
                                {/* Image Container - Sharp Corners, Grayscale */}
                                <div className="relative overflow-hidden mb-6 aspect-square w-full border-2 border-mono-100">
                                    <img
                                        src={getImageUrl(news.image)}
                                        alt={news.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/llf-logo.png';
                                        }}
                                    />
                                    {/* Simple black overlay - bottom only */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-mono-100/80 via-transparent to-transparent" />

                                    {/* Title overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-mono-0 font-display font-bold text-h3 leading-tight group-hover:text-accent-lime transition-colors">
                                            {news.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Description - Monospace */}
                                {news.description && (
                                    <p className="font-mono text-body mb-4 line-clamp-2 opacity-70">
                                        {news.description}
                                    </p>
                                )}

                                {/* Date - Monospace with icon */}
                                {news.date && (
                                    <div className="flex items-center gap-2 font-mono text-micro uppercase tracking-wider opacity-60">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(news.date).toLocaleDateString('ru-RU')}</span>
                                    </div>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Навигационные кнопки - Brutalist Square Buttons */}
                {slidesData.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-mono-0 border-2 border-mono-100 flex items-center justify-center text-mono-100 hover:bg-mono-100 hover:text-mono-0 transition-colors duration-150 hidden md:flex"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={24} strokeWidth={2} />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-mono-0 border-2 border-mono-100 flex items-center justify-center text-mono-100 hover:bg-mono-100 hover:text-mono-0 transition-colors duration-150 hidden md:flex"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={24} strokeWidth={2} />
                        </button>
                    </>
                )}
            </div>

            {/* Индикаторы - Brutalist Dots */}
            {slidesData.length > 1 && (
                <div className="flex justify-center gap-3 mt-8 pt-6 border-t-2 border-mono-100">
                    {slidesData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-150 ${
                                index === currentIndex
                                    ? 'w-8 h-3 bg-accent-lime border-2 border-mono-100'
                                    : 'w-3 h-3 bg-mono-0 border-2 border-mono-100 hover:bg-mono-10'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
