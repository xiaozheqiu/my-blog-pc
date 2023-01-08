import styles from './index.module.scss'
import Image from 'next/image'
import React from 'react'

export default () => (
    <footer className={styles.footer}>
        <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
        >
            Powered by{' '}
            <span className={styles.logo}>
                <Image
                    src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5f7e3460-38bd-45dd-848a-d56d8287d2f9/06140aca-5f76-4c95-b171-cb67a84bb995.svg"
                    alt="Vercel Logo"
                    width={72}
                    height={16}
                />
            </span>
            <div>Copyright © 2022 xiaozheqiu</div>
        </a>
    </footer>
)
