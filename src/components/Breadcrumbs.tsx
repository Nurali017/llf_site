'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
    label: string;
    href: string;
}

export function Breadcrumbs() {
    const pathname = usePathname();

    const breadcrumbs = getBreadcrumbs(pathname);

    // BreadcrumbList Schema for SEO
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: `https://yourdomain.com${item.href}`,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4">
                <ol className="flex items-center space-x-2">
                    {breadcrumbs.map((item, index) => (
                        <li key={item.href} className="flex items-center">
                            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                            {index === breadcrumbs.length - 1 ? (
                                <span className="text-gray-900 font-medium">{item.label}</span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:text-kmff-blue transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
    const paths = pathname.split('/').filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Главная', href: '/' },
    ];

    let currentPath = '';

    // Маппинг путей на читаемые названия
    const labels: Record<string, string> = {
        'astana': 'Астана',
        'almaty': 'Алматы',
        'shymkent': 'Шымкент',
        'karaganda': 'Караганда',
        'aktobe': 'Актобе',
        'taraz': 'Тараз',
        'atyrau': 'Атырау',
        'kostanay': 'Костанай',
        'pavlodar': 'Павлодар',
        'semey': 'Семей',
        'news': 'Новости',
        'matches': 'Матчи',
        'match': 'Матч',
        'about': 'О нас',
        'tournaments': 'Турниры',
        'register': 'Регистрация',
    };

    paths.forEach((path) => {
        currentPath += `/${path}`;

        breadcrumbs.push({
            label: labels[path] || path,
            href: currentPath,
        });
    });

    return breadcrumbs;
}
