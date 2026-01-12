import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getSingleNews } from '@/services/news';
import { getImageUrl } from '@/utils/image';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';

interface NewsPageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
    try {
        const news = await getSingleNews(parseInt(params.id));
        return {
            title: `${news.title} | КФМФ`,
            description: news.description.slice(0, 160),
            openGraph: {
                title: news.title,
                description: news.description.slice(0, 160),
                type: 'article',
            },
        };
    } catch {
        return {
            title: 'Новость не найдена | КФМФ',
        };
    }
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
    let news;

    try {
        news = await getSingleNews(parseInt(params.id));
    } catch {
        notFound();
    }

    const imageUrl = typeof news.image === 'string'
        ? getImageUrl(news.image)
        : Array.isArray(news.image) && news.image.length > 0
            ? getImageUrl(news.image[0].url)
            : '/placeholder-news.jpg';

    const displayDate = news.date ||
        (news.created_at ? new Date(news.created_at).toLocaleDateString('ru-RU') : undefined);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
                <div className="min-h-screen bg-gray-50">
                    <div className="container mx-auto px-4 py-5">
                        <Breadcrumbs />

                        <article className="bg-white rounded-lg overflow-hidden shadow-sm mt-6">
                            {/* Изображение */}
                            <div className="relative h-64 md:h-96 w-full bg-gray-100">
                                <Image
                                    src={imageUrl}
                                    alt={news.title}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                    priority
                                />
                            </div>

                            {/* Контент */}
                            <div className="p-6 md:p-8">
                                {/* Категория и дата */}
                                <div className="flex items-center gap-4 mb-4">
                                    {news.category && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-kmff-blue/10 text-kmff-blue">
                                            {news.category === 'DK' ? 'Решения КДК' :
                                             news.category === 'SLIDER' ? 'Анонс' : 'Новости'}
                                        </span>
                                    )}
                                    {displayDate && (
                                        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                            <Calendar className="w-4 h-4" />
                                            {displayDate}
                                        </div>
                                    )}
                                </div>

                                {/* Заголовок */}
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                                    {news.title}
                                </h1>

                                {/* Описание */}
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {news.description}
                                    </p>
                                </div>
                            </div>
                        </article>

                        {/* Back Link */}
                        <div className="text-center mt-6">
                            <Link
                                href="/news"
                                className="inline-flex items-center gap-2 text-kmff-blue hover:text-blue-700 font-medium transition-colors"
                            >
                                &#8592; Все новости
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
}
