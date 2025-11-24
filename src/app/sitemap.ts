import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://yourdomain.com';

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
    ];

    // Городские страницы
    const cities = [
        'astana',
        'almaty',
        'shymkent',
        'karaganda',
        'aktobe',
        'taraz',
        'atyrau',
        'kostanay',
        'pavlodar',
        'semey',
    ];

    const cityPages: MetadataRoute.Sitemap = cities.map(city => ({
        url: `${baseUrl}/${city}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
    }));

    // TODO: Add dynamic match pages when API is integrated
    // const matches = await getMatches();
    // const matchPages = matches.map(match => ({
    //   url: `${baseUrl}/match/${match.id}`,
    //   lastModified: new Date(match.date),
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // }));

    return [...staticPages, ...cityPages];
}
