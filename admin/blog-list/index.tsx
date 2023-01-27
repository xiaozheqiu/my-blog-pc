import styles from './index.module.scss'
import { Button, Form, Input, Select, Space, Row, Col, Table, Spin, DatePicker, Popconfirm, message } from 'antd'
import React, { useEffect, useRef } from 'react'
import { useRequest } from 'ahooks'
import { getBlogList, deleteBlog } from '../../tools/server'
import { blogStatusList, blogTypeList } from '../../constant/blog'
import { ShowStatus, ShowType } from './components/widget'
import { EyeOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import PreviewModal from '../components/preview-modal'
import dayjs from 'dayjs'
import { dateFormat } from '../blog'
import { useStore } from '../components/admin-layout'
import Browser from '../../tools/browser'
const { RangePicker } = DatePicker

interface IBlogData {
    title: string
    releaseTime: string
    createdAt: string
    updatedAt: string
    status: number
    type: number
    content: string
    id: string
}

const pageConfig = {
    total: 85,
    showTotal: (total: number) => `共 ${total} 条`,
    defaultPageSize: 20,
    defaultCurrent: 1
}

const blogList = () => {
    const [form] = Form.useForm()
    const { setMenuKey } = useStore()
    const previewModalRef = useRef(null)

    const {
        loading: loading_getBlogList,
        data: response,
        run: get_blogList_request
    } = useRequest(getBlogList, { manual: true, debounceWait: 500 })

    const { loading: deleteBlog_loading, run: deleteBlog_request } = useRequest(deleteBlog, {
        manual: true,
        onSuccess: () => {
            message.success('删除成功').then(() => {})
            const values = form.getFieldsValue(true)
            get_blogList_request(values)
        }
    })

    useEffect(() => get_blogList_request({}), [])

    const onFinish = (values: any) => {
        const date = {
            date: values?.date
                ? [values?.date[0]?.format('YYYY-MM-DD'), values?.date[1]?.format('YYYY-MM-DD')].toString()
                : undefined
        }
        const query = { ...values, ...date }
        get_blogList_request(query)
    }

    const onFormReset = () => {
        form.resetFields()
        get_blogList_request({})
    }

    const openPreviewModal = (record: IBlogData) => {
        // @ts-ignore
        previewModalRef?.current?.showModal({ title: record?.title, mdData: decodeURI(record?.content) })
    }

    const onEditBlog = (record: IBlogData) => {
        Browser.updateBowserUrl({ componentName: 'blog', blogId: record?.id })
        setMenuKey(['blog'])
    }

    const onDeleteConfirm = (record: IBlogData) => {
        deleteBlog_request(record.id)
    }

    const columns = [
        { title: '标题', dataIndex: 'title', ellipsis: true, width: 300 },
        {
            title: '内容',
            dataIndex: 'content',
            ellipsis: true,
            width: 300,
            render: (val: string) => decodeURI(val).slice(0, 100)
        },
        { title: '文章状态', dataIndex: 'status', render: (val: 1 | 2 | 3) => ShowStatus(val) },
        { title: '发布时间', dataIndex: 'releaseTime', render: (val: string) => dayjs(val).format(dateFormat) },
        { title: '文章类型', dataIndex: 'type', render: (val: 1 | 2 | 3) => ShowType(val) },
        { title: '最近更新时间', dataIndex: 'updatedAt', render: (val: string) => dayjs(val).format(dateFormat) },

        {
            title: '操作',
            dataIndex: 'action',
            render: (val: any, record: IBlogData) => (
                <Space>
                    <Button icon={<EyeOutlined />} onClick={() => openPreviewModal(record)}></Button>
                    <Button icon={<FormOutlined />} onClick={() => onEditBlog(record)}></Button>
                    <Popconfirm
                        title="删除此文章"
                        description="确定要执行此项操作吗?"
                        onConfirm={() => onDeleteConfirm(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <Spin spinning={loading_getBlogList || deleteBlog_loading}>
            <div className={styles.blogList}>
                <div className={styles.selectFrom}>
                    <Form layout={'inline'} form={form} onFinish={onFinish}>
                        <Row gutter={[24, 20]}>
                            <Col span={8}>
                                <Form.Item label="标题" name="title">
                                    <Input placeholder={'请输入文章标题'} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="发布时间" name={'date'}>
                                    <RangePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="文章状态" name={'status'}>
                                    <Select placeholder="请选择文章状态" options={blogStatusList} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="类别" name={'type'}>
                                    <Select placeholder="请选择文章类别" options={blogTypeList} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item>
                                    <Space>
                                        <Button type="primary" htmlType={'submit'} loading={loading_getBlogList}>
                                            筛选
                                        </Button>
                                        <Button type="default" onClick={onFormReset}>
                                            重置
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
                {/*@ts-ignore*/}
                <Table dataSource={response?.data} columns={columns} pagination={pageConfig} rowKey={'id'} />

                <PreviewModal ref={previewModalRef} />
            </div>
        </Spin>
    )
}

export default blogList
