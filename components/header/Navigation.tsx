import type { Route } from 'next'
import Link from 'next/link'

interface IMainMenuItem {
    pathname: string
    text: string
}

const HeaderNavigation: React.FC = () => {

    const mainMenuItems: IMainMenuItem[] = [
        { pathname: '/', text: 'Home' },
        { pathname: '/blog', text: 'Blog' },
    ]

    return (
        <>
            <nav id="navigation">
                {mainMenuItems.map((menuItem) => {
                    return (
                        <Link
                            href={menuItem.pathname as Route}
                            key={menuItem.pathname}
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