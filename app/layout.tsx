import './global.css'
import { Metadata } from 'next'
import HeaderNavigation from '@/components/header/Navigation'
import { Kablammo } from 'next/font/google'

export const metadata: Metadata = {
    title: {
        template: '%s | example.com',
        default: 'Home | example.com',
    },
    description: 'My description',
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
            </body>
        </html>
    )
}