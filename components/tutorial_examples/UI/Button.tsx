'use client'

import type { PropsWithChildren } from 'react'
import type { Route } from 'next'
import styles from './button.module.css'
import { useRouter } from 'next/navigation'

interface IProps extends PropsWithChildren {
    url?: Route
}

const UIButton: React.FC<IProps> = (props) => {

    const { url, children, ...rest } = props
    const router = useRouter()

    const clickHandler = () => {
        if (url) {
            router.push(url)
        }
    }

    return (
        <button onClick={clickHandler} id={styles.myIdStyle} className={`${styles.reset} ${styles.core}`} {...rest}>
            {children}
        </button>
    )
}

export default UIButton