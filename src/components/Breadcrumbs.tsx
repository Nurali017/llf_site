'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRANCHES } from '@/lib/branches';
import { APP_CONFIG } from '@/config/constants';

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
            item: `${APP_CONFIG.siteUrl}${item.href}`,
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

    // Маппинг путей на читаемые названия (динамически из API + статические страницы)
    const labels: Record<string, string> = {
        ...BRANCHES.reduce((acc, branch) => {
            acc[branch.slug] = branch.displayName;
            return acc;
        }, {} as Record<string, string>),
        'news': 'Новости',
        'matches': 'Матчи',
        'match': 'Матч',
        'about': 'О нас',
        'tournaments': 'Турниры',
        'register': 'Регистрация',
        'hall-of-fame': 'Зал славы',
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
