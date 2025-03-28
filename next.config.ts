import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'
import createMdx from '@next/mdx'
import rehypeMDXImportMedia from 'rehype-mdx-import-media'
import { rehypePrettyCode, type Options as rehypePrettyCodeOptionsType } from 'rehype-pretty-code'
//import { readFileSync } from 'fs'
import rehypeSlug from 'rehype-slug'
import { remarkTableOfContents, type IRemarkTableOfContentsOptions as remarkTableOfContentsOptionsType } from 'remark-table-of-contents'
import remarkGfm from 'remark-gfm'
import { rehypeGithubAlerts } from 'rehype-github-alerts'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { transformerNotationDiff } from '@shikijs/transformers'

const nextConfig = (phase: string) => {

    //const themePath = new URL('./node_modules/material-theme/themes/OneDark-Pro.json', import.meta.url)
    //const themeFileContent = readFileSync(themePath, 'utf-8')

    const rehypePrettyCodeOptions: rehypePrettyCodeOptionsType = {
        //theme: JSON.parse(themeFileContent),
        theme: 'one-dark-pro',
        keepBackground: false,
        defaultLang: {
            block: 'js',
            inline: 'js',
        },
        tokensMap: {
            fn: 'entity.name.function',
            cmt: 'comment',
            str: 'string',
            var: 'entity.name.variable',
            obj: 'variable.other.object',
            prop: 'meta.property.object',
            int: 'constant.numeric',
        },
        transformers: [transformerNotationDiff({
            matchAlgorithm: 'v3',
        })],
    }

    const remarkTableOfContentsOptions: remarkTableOfContentsOptionsType = {
        containerAttributes: {
            id: 'articleToc',
        },
        navAttributes: {
            'aria-label': 'table of contents'
        },
        maxDepth: 3,
    }

    const withMDX = createMdx({
        extension: /\.mdx$/,
        options: {
            // optional remark and rehype plugins
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm, [remarkTableOfContents, remarkTableOfContentsOptions]],
            rehypePlugins: [rehypeGithubAlerts, rehypeSlug, [rehypePrettyCode, rehypePrettyCodeOptions], rehypeMDXImportMedia],
            //\ @ts-expect-error wrong types
            //remarkPlugins: [['remark-frontmatter'], ['remark-mdx-frontmatter'], ['remark-gfm'], ['remark-table-of-contents', remarkTableOfContentsOptions]],
            //\ @ts-expect-error wrong types
            //rehypePlugins: [['rehype-github-alerts'], ['rehype-slug'], ['rehype-pretty-code', rehypePrettyCodeOptions], ['rehype-mdx-import-media']],
            remarkRehypeOptions: {
                footnoteLabel: 'Notes',
                footnoteLabelTagName: 'span',
            },
        },
    })

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
            // use experimental rust compiler for MDX
            // as of now (Oct 2024) there is no support for rehype & remark plugins
            // this is why it is currently commented out
            //mdxRs: true,
        },
        headers: async () => {
            return [
                {
                    source: '/(.*)',
                    headers: securityHeadersConfig(phase)
                },
            ]
        },
        // configure `pageExtensions` to include MDX files
        pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
        eslint: {
            // we have added a lint command to the package.json build script
            // which is why we disable the default next lint (during builds) here
            ignoreDuringBuilds: true,
        },
        images: {
            // file formats for next/image
            formats: ['image/avif', 'image/webp'],
            deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920, 2176, 3840],
        },
    }

    return withMDX(nextConfigOptions)

}

const securityHeadersConfig = (phase: string) => {

    const cspReportOnly = true

    const reportingUrl = 'INSET_YOUR_SENTRY_REPORT_URI_HERE'
    const reportingDomainWildcard = 'https://*.ingest.us.sentry.io'
    // if in the EU, uncomment next line, and comment out previous one
    //const reportingDomainWildcard = 'https://*.ingest.eu.sentry.io'

    const cspHeader = () => {

        const upgradeInsecure = (phase !== PHASE_DEVELOPMENT_SERVER && !cspReportOnly) ? 'upgrade-insecure-requests;' : ''

        // reporting uri (CSP v1)
        const reportCSPViolations = `report-uri ${reportingUrl};`

        // we commented out the trusted types directive:
        // require-trusted-types-for 'script';
        // because of the following error in the browser console:
        // This document requires 'TrustedScript' assignment
        
        // worker-src is for sentry replay
        // child-src is because safari <= 15.4 does not support worker-src
        const defaultCSPDirectives = `
            default-src 'none';
            media-src 'self';
            object-src 'none';
            worker-src 'self' blob:;
            child-src 'self' blob:;
            manifest-src 'self';
            base-uri 'none';
            form-action 'none';
            frame-ancestors 'none';
            ${upgradeInsecure}
        `

        // when environment is preview enable unsafe-inline scripts for vercel preview feedback/comments feature
        // and allow vercel's domains based on:
        // https://vercel.com/docs/workflow-collaboration/comments/specialized-usage#using-a-content-security-policy
        // and white-list vitals.vercel-insights
        // based on: https://vercel.com/docs/speed-insights#content-security-policy
        if (process.env.VERCEL_ENV === 'preview') {
            return `
                ${defaultCSPDirectives}
                font-src 'self' https://vercel.live/ https://assets.vercel.com https://fonts.gstatic.com;
                style-src 'self' 'unsafe-inline' https://vercel.live/fonts;
                script-src 'self' 'unsafe-inline' https://vercel.live/;
                connect-src 'self' https://vercel.live/ https://vitals.vercel-insights.com https://*.pusher.com/ wss://*.pusher.com/ ${reportingDomainWildcard};
                img-src 'self' data: https://vercel.com/ https://vercel.live/;
                frame-src 'self' https://vercel.live/;
                ${reportCSPViolations}
            `
        }

        // for production environment white-list vitals.vercel-insights
        // based on: https://vercel.com/docs/speed-insights#content-security-policy
        if (process.env.VERCEL_ENV === 'production') {
            return `
                ${defaultCSPDirectives}
                font-src 'self';
                style-src 'self' 'unsafe-inline';
                script-src 'self' 'unsafe-inline';
                connect-src 'self' https://vitals.vercel-insights.com ${reportingDomainWildcard};
                img-src 'self' data:;
                frame-src 'none';
                ${reportCSPViolations}
            `
        }

        // for dev environment enable unsafe-eval for hot-reload
        return `
            ${defaultCSPDirectives}
            font-src 'self';
            style-src 'self' 'unsafe-inline';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;
            connect-src 'self';
            img-src 'self' data:;
            frame-src 'none';
        `

    }

    // security headers for preview & production
    const extraSecurityHeaders = []

    if (phase !== PHASE_DEVELOPMENT_SERVER) {
        extraSecurityHeaders.push(
            {
                key: 'Strict-Transport-Security',
                value: 'max-age=31536000', // 1 year
            },
        )
    }

    const headers = [
        ...extraSecurityHeaders,
        {
            key: cspReportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy',
            value: cspHeader().replace(/\n/g, ''),
        },
        {
            key: 'Referrer-Policy',
            value: 'same-origin',
        },
        {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
        },
        {
            key: 'X-Frame-Options',
            value: 'DENY'
        },
    ]

    return headers

}

export default withSentryConfig(
    nextConfig,
    {
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options

        org: 'chrisweb',
        project: 'debug_sentry_undefined',

        // Only print logs for uploading source maps in CI
        silent: !process.env.CI,

        // For all available options, see:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,

        // Automatically annotate React components to show their full name in breadcrumbs and session replay
        reactComponentAnnotation: {
            enabled: true,
        },

        // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
        // This can increase your server load as well as your hosting bill.
        // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
        // side errors will fail.
        tunnelRoute: '/monitoring',

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,

        // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
        // See the following for more information:
        // https://docs.sentry.io/product/crons/
        // https://vercel.com/docs/cron-jobs
        automaticVercelMonitors: true,
    }
)