import Image from 'next/image'
import type { ImageProps } from 'next/image'

function extractImageType(imageProps: ImageProps) {

    let imageType = ''

    if (imageProps !== null) {

        const imageTypeMatch = imageProps.title?.match(/\{(.*?)\}/)

        if (imageTypeMatch) {
            // the full match, for example "{ banner }"
            const imageTypeFull = imageTypeMatch[0]
            // the type only, for example "banner"
            imageType = imageTypeMatch[1].trim()
            // remove the image type info from the title
            const newTitle = imageProps.title?.replace(imageTypeFull, '').trim()

            if (newTitle !== '') {
                imageProps.title = newTitle
            } else {
                delete imageProps.title
            }
        }

    }

    return imageType

}

const BaseImage: React.FC<ImageProps> = (props) => {

    const newImageProps = { ...props }

    const imageType = extractImageType(newImageProps)

    return (
        <>
            {imageType === 'banner' ? (
                <>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                        priority
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        sizes="(max-width: 1120px) 100vw, 1088px"
                        placeholder="blur"
                        {...newImageProps}
                    />
                </>
            ) : (
                <>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                        {...newImageProps}
                    />
                </>
            )}
        </>
    )
}

export default BaseImage