'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div>
            <h1>Sorry, something went wrong 😞</h1>
            <button
                // Attempt to recover by trying to re-render the segment
                onClick={() => reset()} 
            >
                Try again
            </button>
        </div>
    )
}