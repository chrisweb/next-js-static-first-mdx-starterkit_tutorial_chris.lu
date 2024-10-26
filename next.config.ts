import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    experimental: {
        // experimental typescript "statically typed links"
        // https://nextjs.org/docs/app/api-reference/next-config-js/typedRoutes
        typedRoutes: true,
    }
};

export default nextConfig