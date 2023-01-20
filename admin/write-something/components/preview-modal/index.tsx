import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal } from 'antd'
import PreviewMd from '../preview-md'
import styles from './index.module.scss'

interface IPreviewConfig {
    title: string
    mdData: string
}
const PreviewModal = (props: {}, ref: React.Ref<any>) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [previewConfig, setPreviewConfig] = useState<IPreviewConfig>({ title: '', mdData: '' })

    const showModal = (previewConfig: IPreviewConfig) => {
        setIsModalOpen(true)
        setPreviewConfig(previewConfig)
        console.log(previewConfig, 'previewConfig')
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => setIsModalOpen(false)

    useImperativeHandle(ref, () => ({ showModal }))

    return (
        <Modal
            destroyOnClose={true}
            className={styles.modal}
            title={previewConfig?.title || '未设置文章标题'}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            bodyStyle={{ maxHeight: '70vh', overflow: 'scroll' }}
        >
            <PreviewMd modelValue={previewConfig?.mdData} />
        </Modal>
    )
}

export default forwardRef(PreviewModal)
