import type { PropsWithChildren } from 'react'
import Link from 'next/link'
import type { Route } from 'next'

export interface IBaseLinkProps extends PropsWithChildren {
    href: Route | URL
    target?: string
    rel?: string
    className?: string
}

const isExternalUrl = (url: string, domain: string): boolean => {

    const urlLowerCase = url.toLowerCase()

    const firstCharacter = urlLowerCase.charAt(0)

    if (firstCharacter === '#' || firstCharacter === '/') {
        return false
    }

    if (urlLowerCase.startsWith('http://') || urlLowerCase.startsWith('https://')) {

        const urlNoProtocol = urlLowerCase.replace('http://', '').replace('https://', '')

        const potentialDomain = urlNoProtocol.split('/')[0]

        if (potentialDomain !== domain) {
            return true
        }

    }

    return false

}

const BaseLink: React.FC<IBaseLinkProps> = (props) => {

    const { href, children, ...linkProps } = props

    const isExternal = isExternalUrl(href.toString(), 'example.com')

    const newLinkProps = { ...linkProps }

    if (isExternal) {
        newLinkProps.rel = 'noopener noreferrer'
        newLinkProps.target = '_blank'
    }

    return (
        <>
            {isExternal ? (
                <>
                    <a href={href.toString()} {...newLinkProps}>
                        {children}
                    </a>
                    <svg xmlns="http://www.w3.org/2000/svg" className="iconSmall" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                    </svg>
                </>
            ) : (
                <Link href={href} {...newLinkProps}>
                    {children}
                </Link>
            )}
        </>
    )
}

export default BaseLink