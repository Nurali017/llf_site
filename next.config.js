/** @type {import('next').NextConfig} */
const nextConfig = {
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
            {
                protocol: 'http',
                hostname: 'localhost',
            }
        ],
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
}

module.exports = nextConfig
