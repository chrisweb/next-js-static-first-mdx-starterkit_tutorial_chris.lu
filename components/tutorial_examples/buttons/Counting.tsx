'use client'

import { useState } from 'react'

const Counting: React.FC = () => {

    const [count, setCount] = useState(0)

    const handleClick = () => {
        setCount(count + 1)
    }

    return (
        <>
            <button onClick={handleClick}>
                Clicked {count} times
            </button>
        </>
    )
}

export default Counting