'use client' // Error components must be Client Components

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

interface GlobalErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function GlobalError({
    error,
    reset,
}: GlobalErrorProps) {

    useEffect(() => {
        // log the error to Sentry.io
        Sentry.captureException(error)
    }, [error])

    return (
        <html lang="en">
            <body>
                <h1>Sorry, something went wrong 😞</h1>
                <button
                    onClick={() => {
                        // attempt to recover by trying to re-render the segment
                        reset()
                    }}
                >
                    Try again
                </button>
            </body>
        </html>
    )
}