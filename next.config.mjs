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
                hostname: "https://stream-scene-backend.onrender.com/"
            }
        ]
    }
};

export default nextConfig;
