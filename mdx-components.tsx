import type { MDXComponents } from 'mdx/types'
import BaseLink from '@/components/base/Link'
import type { Route } from 'next'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        ul: ({ children, ...props }) => (
            <ul className="listContainer" {...props}>
                {children}
            </ul>
        ),
        a: ({ children, href, ...props }) => (
            <BaseLink href={href as Route} {...props}>
                {children}
            </BaseLink>
        ),
        ...components,
    }
}