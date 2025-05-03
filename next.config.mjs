/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "image.tmdb.org"
            },
            {
                hostname: "localhost"
            },
            {
                hostname: "api.streamscene.stream"
            }
        ]
    },
    swcMinify: true
};

export default nextConfig;
