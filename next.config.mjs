/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'swiperjs.com',
                port: '',
                pathname: '/demos/images/**',
            },
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: '/**',
            },
        ],
    }
};

export default nextConfig;
