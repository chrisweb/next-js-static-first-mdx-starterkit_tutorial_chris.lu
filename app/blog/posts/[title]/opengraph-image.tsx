import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

const size = {
    width: 1200,
    height: 630,
}

interface OpenGraphImageProps {
    params: {
        title: string
    }
}

export function generateImageMetadata({ params }: OpenGraphImageProps) {

    return [
        {
            id: 'blog_opengraph',
            alt: `${params.title} | example.com`,
            size: size,
            contentType: 'image/png',
        },
    ]
}

export default async function OGImage(props: OpenGraphImageProps) {

    const { title } = props.params

    // Font
    const kablammoFont = fetch(
        new URL('/public/fonts/Kablammo-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    // Background Image
    const backgroundImage = await fetch(
        new URL('/public/images/og_background.jpg', import.meta.url)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
        // ImageResponse JSX element
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {
                    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element 
                    <img
                        // @ts-expect-error: this is fine 🔥
                        src={backgroundImage}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                }
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 0,
                        fontFamily: 'Kablammo',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '80',
                        background: 'rgb(0, 0, 0, 0.5)',
                        color: 'rgb(255, 255, 255)',
                    }}
                >
                    <span>{title}</span>
                </div>
            </div >
        ),
        // ImageResponse options
        {
            // For convenience, we can reuse the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
            fonts: [
                {
                    name: 'Kablammo',
                    data: await kablammoFont,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    )
}