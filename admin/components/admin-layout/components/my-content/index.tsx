import React, { useEffect } from 'react'
import { Layout, theme } from 'antd'
import dynamic from 'next/dynamic'
import MyLoading from '../my-loading'
import MyBreadcrumb from '../my-breadcrumb'
import { useStore } from '../../index'
const { Content } = Layout

const DynamicPageA = dynamic(() => import('../../../../pageA'), { loading: () => <MyLoading /> })

const DynamicBlogList = dynamic(() => import('../../../../blog-list'), { loading: () => <MyLoading /> })

const DynamicPageC = dynamic(() => import('../../../../blog'), { loading: () => <MyLoading /> })

const Dynamic404 = dynamic(() => import('../../../../404'), { loading: () => <MyLoading /> })

const RenderContent = {
    pageA: <DynamicPageA />,
    'blog-list': <DynamicBlogList />,
    blog: <DynamicPageC />,
    '404': <Dynamic404 />
}

export default () => {
    const { token } = theme.useToken()
    const ContentStyle = { margin: '24px 16px', padding: 24, minHeight: 280, background: token.colorBgContainer }
    const { menuKey } = useStore()
    console.log()

    useEffect(() => {
        // setInterval(inc, 1000)
    }, [])
    // console.log(count, 'count')
    return (
        <Content style={ContentStyle}>
            <MyBreadcrumb value={menuKey[0]} />
            {RenderContent[menuKey[0]]}
        </Content>
    )
}
