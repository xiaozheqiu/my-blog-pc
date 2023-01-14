import React from 'react'
import Layout from '../../components/layout'
import ProcessLine from '../../components/process-line'
import styles from '../../styles/timeline.module.scss'

export default function Timeline() {
    return (
        <Layout>
            <div className={styles.timeLine}>
                <ProcessLine />
            </div>
        </Layout>
    )
}
