import React, { useEffect, useRef } from 'react'
import MdEditor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import styles from './index.module.scss'
import { Input, Form, Button, Select, DatePicker, message, Spin } from 'antd'
import { myPreviewConfigToolbar, toolbars } from './md-editer-config'
import PreviewModal from '../components/preview-modal'
import { useRequest } from 'ahooks'
import { createBlog, getBlogDetail, updateBlog } from '../../tools/server'
import { blogStatusList, blogTypeList } from '../../constant/blog'
import Browser from '../../tools/browser'
import dayjs from 'dayjs'

export const dateFormat = 'YYYY-MM-DD HH:mm:ss'

const WriteSomething = () => {
    const [form] = Form.useForm()
    const formTitleValue = Form.useWatch('title', form)
    const contentTitleValue = Form.useWatch('content', form)
    const previewModalRef = useRef(null)
    const { blogId } = Browser.getQueryParams(window.location.search)

    // 创建博客
    const { loading: createBlog_loading, run: createBlog_request } = useRequest(createBlog, {
        manual: true,
        onSuccess: () => {
            Browser.updateBowserUrl()
            form.resetFields()
            message.success('保存成功').then(() => {})
        }
    })

    // 获取博客详情
    const { loading: getBlogDetail_loading, run: getBlogDetail_request } = useRequest(getBlogDetail, {
        manual: true,
        // @ts-ignore
        onSuccess: ({ data }) => {
            const initFormValues = {
                releaseTime: dayjs(data?.releaseTime, dateFormat),
                content: decodeURI(data?.content),
                title: data?.title,
                date: data?.date,
                status: data?.status,
                type: data?.type
            }
            form.setFieldsValue(initFormValues)
        }
    })

    // 更新博客
    const { loading: updateBlog_loading, run: updateBlog_request } = useRequest(updateBlog, {
        manual: true,
        onSuccess: () => {
            Browser.updateBowserUrl()
            form.resetFields()
            message.success('保存成功').then(() => {})
        }
    })

    const onFinish = (values: any) => {
        const releaseTime = values?.releaseTime?.format('YYYY-MM-DD HH:mm:ss')
        // utf8不支持表情（4个字符导致的原因） 所以需要先编码
        const content = encodeURI(values?.content)
        const query = { ...values, ...{ content, releaseTime }, ...{ id: blogId } }

        if (blogId) {
            console.log(1)
            updateBlog_request(query)
        } else {
            createBlog_request(query)
        }
    }

    const openPreviewModal = () => {
        // @ts-ignore
        previewModalRef?.current?.showModal({ title: formTitleValue, mdData: contentTitleValue })
    }

    useEffect(() => {
        if (blogId) getBlogDetail_request(blogId)
    }, [])

    return (
        <Spin spinning={getBlogDetail_loading || updateBlog_loading || createBlog_loading}>
            <div className={styles.writeSomething}>
                <div className={styles.left}>
                    <Form layout={'vertical'} form={form}>
                        <Form.Item
                            label="文章标题"
                            name={'title'}
                            rules={[{ required: true, message: '请输入文章标题' }]}
                        >
                            <Input placeholder="请输入文章标题" />
                        </Form.Item>
                        <Form.Item valuePropName={'modelValue'} label="文章内容" name={'content'}>
                            <MdEditor
                                className={styles.mdEditor}
                                placeholder={'来写点什么吧~'}
                                historyLength={10} // 最大记录操作数
                                modelValue={''}
                                onError={(err) => alert(err.message)} //捕获执行错误事件
                                showCodeRowNumber //代码展示行号
                                toolbars={toolbars}
                                preview={false} //取消预览
                                maxLength={100000} // 文本最大长度
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
                    <Form layout={'vertical'} form={form} onFinish={onFinish}>
                        <Form.Item
                            label="文章类别"
                            name={'type'}
                            rules={[{ required: true, message: '请输入文章类别' }]}
                        >
                            <Select placeholder="请选择文章类别" options={blogTypeList} />
                        </Form.Item>

                        <Form.Item
                            label="发布时间"
                            name={'releaseTime'}
                            rules={[{ required: true, message: '请选择发布时间' }]}
                        >
                            <DatePicker placeholder="请选择发布时间" style={{ width: '100%' }} showTime />
                        </Form.Item>

                        <Form.Item
                            label="文章状态"
                            name={'status'}
                            rules={[{ required: true, message: '请选择文章状态' }]}
                        >
                            <Select placeholder="请选择文章状态" options={blogStatusList} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={createBlog_loading || updateBlog_loading}>
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <PreviewModal ref={previewModalRef} />
            </div>
        </Spin>
    )
}

export default WriteSomething
