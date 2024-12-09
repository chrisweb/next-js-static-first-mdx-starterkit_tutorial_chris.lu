import type { ComponentPropsWithoutRef } from 'react'
import type { MDXComponents } from 'mdx/types'
import BaseLink from '@/components/base/Link'
import type { Route } from 'next'
import BaseImage from '@/components/base/Image'
import type { ImageProps } from 'next/image'
import TocHighlight from '@/components/toc/Highlight'
import BaseCheckbox from '@/components/base/Checkbox'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

type ListPropsType = ComponentPropsWithoutRef<'ul'>
type AnchorPropsType = ComponentPropsWithoutRef<'a'>
// Note: ImageProps get imported from 'next/image'
type AsidePropsType = ComponentPropsWithoutRef<'aside'>
type InputPropsType = ComponentPropsWithoutRef<'input'>

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        ul: ({ children, ...props }: ListPropsType) => (
            <ul className="listContainer" {...props}>
                {children}
            </ul>
        ),
        a: ({ children, href, ...props }: AnchorPropsType) => (
            <BaseLink href={href as Route} {...props}>
                {children}
            </BaseLink>
        ),
        img: (props) => (<BaseImage {...props as ImageProps} />),
        aside: ({ children, ...props }: AsidePropsType) => {
            const tocHighlightProps = {
                headingsToObserve: 'h1, h2, h3',
                rootMargin: '-5% 0px -50% 0px',
                threshold: 1,
                ...props
            }
            return (
                <>
                    {props.id === 'articleToc' ? (
                        <TocHighlight {...tocHighlightProps}>
                            {children}
                        </TocHighlight>
                    ) : (
                        <aside {...props}>
                            {children}
                        </aside>
                    )}
                </>
            )
        },
        input: (props: InputPropsType) => {
            if (props?.type === 'checkbox') {
                return <BaseCheckbox {...props} />
            } else {
                return <input {...props} />
            }
        },
        ...components,
    }
}