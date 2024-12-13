import { sharedMetadata } from '@/shared/metadata'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface BlogPostsProps {
    params: Promise<{ title: string }>
}

const titlesAllowList = ['foo'] as string[]

export async function generateMetadata({ params }: BlogPostsProps): Promise<Metadata> {

    let title = '' as string

    const pageParams = await params

    if (titlesAllowList.includes(pageParams.title)) {
        title = pageParams.title
    }

    return {
        title: title,
        openGraph: {
            ...sharedMetadata.openGraph,
            url: `https://example.com/blog/posts/${title}`,
        },
    }

}

export default async function Blog({
    params,
}: BlogPostsProps) {
    // as we are getting user data we need 
    // to sanitize it or use an allow list
    let title = '' as string

    const pageParams = await params

    if (titlesAllowList.includes(pageParams.title)) {
        title = pageParams.title
    } else {
        notFound()
    }

    return (
        <>
            I&apos;m the &quot;{title}&quot; blog post page
        </>
    )
}