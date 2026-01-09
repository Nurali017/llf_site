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

    // State для touch-свайпов
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

    // Обработчики touch-свайпов для мобильных
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();
    };

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

    const currentNews = slidesData[currentIndex];

    return (
        <section
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="rounded-lg shadow-md bg-white p-3 sm:p-4 md:p-5 relative overflow-hidden"
        >
            {/* Header */}
            <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-neutral-200">
                <h2 className="font-display text-xl sm:text-2xl md:text-h2 font-medium text-neutral-900">
                    Главные новости
                </h2>
            </div>

            {/* Main content: horizontal on desktop, vertical on mobile */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                {/* Image Slider */}
                <div
                    className="relative md:w-1/2 lg:w-2/5"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div className="relative aspect-[4/3] w-full rounded-lg shadow-md overflow-hidden">
                        {slidesData.map((news, index) => (
                            <div
                                key={news.id}
                                className={`absolute inset-0 transition-opacity duration-700 ${
                                    index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                            >
                                <Link href={`/news/${news.id}`} className="block h-full w-full group">
                                    <img
                                        src={getImageUrl(news.image)}
                                        alt={news.title}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/llf-logo.png';
                                        }}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    {slidesData.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-neutral-800 hover:bg-primary-700 hover:text-white transition-all duration-200"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-neutral-800 hover:bg-primary-700 hover:text-white transition-all duration-200"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                            </button>
                        </>
                    )}
                </div>

                {/* Text Content */}
                <div className="flex-1 flex flex-col justify-between">
                    {currentNews && (
                        <Link href={`/news/${currentNews.id}`} className="group">
                            <h3 className="font-display font-medium text-lg sm:text-xl md:text-2xl leading-tight text-neutral-900 group-hover:text-primary-700 transition-colors mb-3 md:mb-4">
                                {currentNews.title}
                            </h3>
                            {currentNews.description && (
                                <p className="font-display text-sm sm:text-base text-neutral-600 line-clamp-3 md:line-clamp-4 mb-3 md:mb-4">
                                    {currentNews.description}
                                </p>
                            )}
                            {currentNews.date && (
                                <div className="flex items-center gap-2 font-display text-xs sm:text-sm text-neutral-500">
                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span>{new Date(currentNews.date).toLocaleDateString('ru-RU')}</span>
                                </div>
                            )}
                        </Link>
                    )}

                    {/* Indicators */}
                    {slidesData.length > 1 && (
                        <div className="flex gap-1.5 sm:gap-2 mt-4 md:mt-auto pt-4 border-t border-neutral-200 md:border-0 md:pt-0">
                            {slidesData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`transition-all duration-200 rounded-full ${
                                        index === currentIndex
                                            ? 'w-6 sm:w-8 h-2 sm:h-3 bg-primary-700'
                                            : 'w-2 sm:w-3 h-2 sm:h-3 bg-neutral-300 hover:bg-neutral-400'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
