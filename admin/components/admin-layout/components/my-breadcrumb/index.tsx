import React, { Fragment } from 'react'
import { Breadcrumb, Divider } from 'antd'
import { items } from '../my-menu'

const MyBreadcrumb = ({ value }: { value: string }) => {
    const findIndex = items.findIndex((item) => item?.key === value)
    const renderValue = findIndex === -1 ? '404' : (items[findIndex] as { label: string })?.label
    return (
        <Fragment>
            <Breadcrumb style={{ marginBottom: 10 }}>
                <Breadcrumb.Item>
                    <span style={{ cursor: 'pointer' }}>首页</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{renderValue}</Breadcrumb.Item>
            </Breadcrumb>
            <Divider style={{ margin: '16px 0' }} />
        </Fragment>
    )
}

export default MyBreadcrumb
