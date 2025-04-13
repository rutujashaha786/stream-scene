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
    async rewrites() {
        return [
          {
            source: "/api/:path*", // frontend route
            destination: "https://api.streamscene.stream/api/:path*", // backend route
          },
        ];
      },
};

export default nextConfig;
