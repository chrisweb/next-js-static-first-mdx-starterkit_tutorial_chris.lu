import styles from './button.module.css'

const UIButton: React.FC = () => {

    return (
        <button className={`${styles.reset} ${styles.core}`}>
            I&apos;m a UI button
        </button>
    )
}

export default UIButton