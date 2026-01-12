/** @type {import('next').NextConfig} */
const nextConfig = {
    // Production optimizations
    swcMinify: true,
    poweredByHeader: false,
    compress: true,
    output: 'standalone', // Для Docker деплоя

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '1sportkz.com',
            },
            {
                protocol: 'https',
                hostname: 'admin.1sportkz.com',
            },
            // localhost только для development
            ...(process.env.NODE_ENV === 'development' ? [{
                protocol: 'http',
                hostname: 'localhost',
            }] : []),
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
    },

    // Отключить source maps в production
    productionBrowserSourceMaps: false,

    // Security headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ],
            },
        ];
    },
}

module.exports = nextConfig
