import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

const nextConfig = (phase: string) => {

    if (phase === PHASE_DEVELOPMENT_SERVER) {
        console.log('happy development session ;)')
    }

    const nextConfigOptions: NextConfig = {
        reactStrictMode: true,
        poweredByHeader: false,
        experimental: {
            // experimental typescript "statically typed links"
            // https://nextjs.org/docs/app/api-reference/next-config-js/typedRoutes
            typedRoutes: true,
        }
    };

    return nextConfigOptions

}

export default nextConfig