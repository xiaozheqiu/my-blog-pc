import styles from './index.module.scss'
import React from 'react'

const items = [
    { label: '首页', link: '' },
    { label: '归档', link: '' },
    { label: '技术', link: '' },
    { label: '评测', link: '' },
    { label: '随想', link: '' },
    { label: '生活', link: '' },
    { label: '关于', link: '' },
    { label: '更多', link: '' }
]

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <div className={styles.homeName}> Zhe Qiu </div>
            </div>
            <div className={styles.right}>
                {items.map((item, index) => (
                    <span className={styles.option} key={index}>
                        {item.label}
                    </span>
                ))}
            </div>
        </div>
    )
}
