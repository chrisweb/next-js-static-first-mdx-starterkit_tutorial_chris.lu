'use client'

import { usePathname } from 'next/navigation'
import type { Route } from 'next'
import Link from 'next/link'
import styles from './navigation.module.css'

interface IMainMenuItem {
    pathname: string
    text: string
}

const HeaderNavigation: React.FC = () => {

    const currentPagePathname = usePathname()

    const mainMenuItems: IMainMenuItem[] = [
        { pathname: '/', text: 'Home' },
        { pathname: '/blog', text: 'Blog' },
    ]

    const isActiveCheck = (menuItemPathname: string) => {

        let isActiveClass = ''

        if (menuItemPathname.length > 1) {
            if (currentPagePathname.startsWith(menuItemPathname)) {
                isActiveClass = styles.active
            }
        } else {
            // exception for homepage path which is "/"
            // in that case the page path needs to be equal
            if (currentPagePathname === menuItemPathname) {
                isActiveClass = styles.active
            }
        }

        return isActiveClass
    }

    return (
        <>
            <nav id="navigation" className={styles.navigation}>
                {mainMenuItems.map((menuItem) => {
                    return (
                        <Link
                            href={menuItem.pathname as Route}
                            key={menuItem.pathname}
                            className={`${isActiveCheck(menuItem.pathname)} ${styles.link}`}
                            title={menuItem.text}
                        >
                            {menuItem.text}
                        </Link>
                    )
                })}
            </nav>
        </>
    )
}

export default HeaderNavigation