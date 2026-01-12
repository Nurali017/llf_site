import { MetadataRoute } from 'next';
import { APP_CONFIG } from '@/config/constants';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',           // API routes не нужны в индексе
                    '/debug/',         // Debug страницы
                    '/_next/',         // Next.js internal files
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/', '/debug/'],
            },
            {
                userAgent: 'Yandex',
                allow: '/',
                disallow: ['/api/', '/debug/'],
            },
        ],
        sitemap: `${APP_CONFIG.siteUrl}/sitemap.xml`,
    };
}
