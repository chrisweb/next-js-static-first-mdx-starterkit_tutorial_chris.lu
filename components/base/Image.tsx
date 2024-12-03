import Image from 'next/image'
import type { ImageProps } from 'next/image'

const BaseImage: React.FC<ImageProps> = (props) => {

    const newImageProps = { ...props }

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
                {...newImageProps}
            />
        </>
    )
}

export default BaseImage