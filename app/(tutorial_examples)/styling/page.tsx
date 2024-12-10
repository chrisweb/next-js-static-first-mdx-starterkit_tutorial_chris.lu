import UIButton from '@/components/tutorial_examples/UI/Button'

export default function StylingExamplePage() {

    const goTo = '/'

    return (
        <>
            <UIButton url={goTo}>I&apos;m a UI button, that will open the homepage</UIButton>
        </>
    )

}