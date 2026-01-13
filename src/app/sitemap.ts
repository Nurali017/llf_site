import { MetadataRoute } from 'next';
import { APP_CONFIG } from '@/config/constants';
import { getOrganizations } from '@/services/organizations';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = APP_CONFIG.siteUrl;

    // Статические страницы
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/news`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/matches`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/tournaments`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/register`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/hall-of-fame`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ];

    // Динамические страницы организаций из API
    let organizationPages: MetadataRoute.Sitemap = [];
    try {
        const organizations = await getOrganizations();
        organizationPages = organizations.map(org => ({
            url: `${baseUrl}/${org.slug}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        }));
    } catch (error) {
        console.error('Error fetching organizations for sitemap:', error);
        // Fallback: используем slug из всех организаций в базе
        const fallbackSlugs = [
            'astana', 'balkhash', 'karagandy', 'kokshetau', 'ulytau',
            'qyzylorda', 'uralsk', 'shymkent', 'turkestan', 'aktobe',
            'taldykorgan', 'turkestan-region', 'kulsary', 'schuchinsk',
            'oskemen', 'kostanay', 'freedom-bfl', 'qazaly-region'
        ];
        organizationPages = fallbackSlugs.map(slug => ({
            url: `${baseUrl}/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        }));
    }

    // TODO: Add dynamic match pages when API is integrated
    // const matches = await getMatches();
    // const matchPages = matches.map(match => ({
    //   url: `${baseUrl}/match/${match.id}`,
    //   lastModified: new Date(match.date),
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // }));

    return [...staticPages, ...organizationPages];
}
