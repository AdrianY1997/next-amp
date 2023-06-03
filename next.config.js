/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/inicio',
                permanent: true,
            },
        ];
    },
}

module.exports = nextConfig
