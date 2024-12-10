'use client'

import React from 'react'

interface PropsInterface {
    clickCallback?: () => void
}

const Button: React.FC<PropsInterface> = (props) => {

    const { clickCallback, ...rest } = props

    const foo = 'bar'

    const buttonClickHandler = (/*event: React.MouseEvent<HTMLButtonElement>*/) => {

        if (typeof clickCallback === 'function') {
            clickCallback()
        }

    }

    return (
        <>
            <button
                onClick={buttonClickHandler}
                {...rest}
            >
                I'm a test button
            </button>
        </>
    )
}

export default Button

/* linting errors I should see in this test component
- line 13: 'foo' is assigned a value but never used. (@typescript-eslint/no-unused-vars)
- line 29: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. (react/no-unescaped-entities)
*/