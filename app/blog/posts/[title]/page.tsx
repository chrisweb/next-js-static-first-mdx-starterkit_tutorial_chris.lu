import { sharedMetadata } from '@/shared/metadata'
import { notFound } from 'next/navigation'

const titlesAllowList = ['foo'] as string[]

export function generateMetadata({ params }: BlogPostsProps) {

    let title = '' as string

    if (titlesAllowList.includes(params.title)) {
        title = params.title
    }

    return {
        title: title,
        openGraph: {
            ...sharedMetadata.openGraph,
            url: `https://example.com/blog/posts/${title}`,
        }
    }

}

interface BlogPostsProps {
    params: {
        title: string
    }
}

export default function Blog({ params }: BlogPostsProps) {

    // as we are getting user data we need 
    // to sanitize it or use an allow list
    let title = '' as string

    if (titlesAllowList.includes(params.title)) {
        title = params.title
    } else {
        notFound()
    }

    return (
        <>
            I&apos;m the &quot;{title}&quot; blog post page
        </>
    )
}