import React from 'react'
import Layout from '../../components/layout'
import ProcessLine from '../../components/process-line'
import styles from './index.module.scss'

export default function Timeline() {
    return (
        <Layout>
            <div className={styles.timeLine}>
                <ProcessLine />
            </div>
        </Layout>
    )
}
