import type { Route } from 'next'

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
                        <a
                            href={menuItem.pathname as Route}
                            key={menuItem.pathname}
                            title={menuItem.text}
                        >
                            {menuItem.text}
                        </a>
                    )
                })}
            </nav>
        </>
    )
}

export default HeaderNavigation