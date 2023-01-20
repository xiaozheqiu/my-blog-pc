import MdEditor from 'md-editor-rt'
import styles from './index.module.scss'
import React from 'react'

export default ({ modelValue }: { modelValue: string }) => {
    console.log(modelValue, 'modelValue')
    return <MdEditor className={styles.mdEditor} modelValue={modelValue} previewOnly />
}
