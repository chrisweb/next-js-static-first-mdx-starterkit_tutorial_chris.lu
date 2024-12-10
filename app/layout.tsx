import './global.css'
import { Metadata } from 'next'
import HeaderNavigation from '@/components/header/Navigation'
import { Kablammo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
    title: {
        template: '%s | example.com',
        default: 'Home | example.com',
    },
    description: 'My description',
    openGraph: {
        url: 'https://example.com/',
        siteName: 'My website name',
        locale: 'en_US',
        type: 'website',
    },
}

const kablammo = Kablammo({
    subsets: ['latin'],
    variable: '--font-kablammo',
    weight: ['400'],
    display: 'swap',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={kablammo.variable}>
            <body>
                <header>
                    <HeaderNavigation />
                </header>
                <main>{children}</main>
                <footer>
                    <p>My Footer</p>
                </footer>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    )
}