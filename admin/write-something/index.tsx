import React, { useRef } from 'react'
import MdEditor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import styles from './index.module.scss'
import { Input, Form, Button, Select } from 'antd'
import { HeadList } from 'md-editor-rt/lib/MdEditor/type'
import { myPreviewConfigToolbar, toolbars } from './md-editer-config'
import PreviewModal from './components/preview-modal'

const WriteSomething = () => {
    const [form] = Form.useForm()
    const formTitleValue = Form.useWatch('title', form)
    const contentTitleValue = Form.useWatch('content', form)

    const previewModalRef = useRef(null)
    const onFinish = (values: any) => {
        console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    const openPreviewModal = () => {
        // @ts-ignore
        previewModalRef?.current?.showModal({ title: formTitleValue, mdData: contentTitleValue })
    }

    return (
        <div className={styles.writeSomething}>
            <div className={styles.left}>
                <Form layout={'vertical'} form={form}>
                    <Form.Item label="文章标题" name={'title'} rules={[{ required: true, message: '请输入文章标题' }]}>
                        <Input placeholder="请输入文章标题" />
                    </Form.Item>
                    <Form.Item valuePropName={'modelValue'} label="文章内容" name={'content'}>
                        <MdEditor
                            className={styles.mdEditor}
                            placeholder={'来写点什么吧~'}
                            historyLength={10} // 最大记录操作数
                            modelValue={''}
                            onGetCatalog={(list: HeadList[]) => console.log(list, 'onGetCatalog')} // 获取目录
                            onError={(err) => alert(err.message)} //捕获执行错误事件
                            showCodeRowNumber //代码展示行号
                            toolbars={toolbars}
                            // preview={false} //取消预览
                            defToolbars={[
                                <MdEditor.NormalToolbar
                                    onClick={openPreviewModal}
                                    title={myPreviewConfigToolbar.title}
                                    key={myPreviewConfigToolbar.key}
                                    trigger={myPreviewConfigToolbar.trigger}
                                />
                            ]}
                        />
                    </Form.Item>
                </Form>
            </div>
            <div className={styles.right}>
                <Form layout={'vertical'} form={form} onFinishFailed={onFinishFailed} onFinish={onFinish}>
                    <Form.Item label="文章类别" name={'type'} rules={[{ required: true, message: '请输入文章类别' }]}>
                        <Select placeholder="请选择文章类别" />
                    </Form.Item>
                    <Form.Item
                        label="发布时间"
                        name={'releaseTime'}
                        rules={[{ required: true, message: '请选择发布时间' }]}
                    >
                        <Input placeholder="请选择发布时间" />
                    </Form.Item>
                    <Form.Item label="文章状态" name={'status'} rules={[{ required: true, message: '请选择文章状态' }]}>
                        <Input placeholder="请选择文章状态" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <PreviewModal ref={previewModalRef} />
        </div>
    )
}

export default WriteSomething
