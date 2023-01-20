import React from 'react'
import { Layout, theme } from 'antd'
import dynamic from 'next/dynamic'
import { IRouterKey } from '../my-menu'
import MyLoading from '../my-loading'
const { Content } = Layout

const DynamicPageA = dynamic(() => import('../../../../pageA'), { loading: () => <MyLoading /> })

const DynamicBlogList = dynamic(() => import('../../../../blog-list'), { loading: () => <MyLoading /> })

const DynamicPageC = dynamic(() => import('../../../../write-something'), { loading: () => <MyLoading /> })

const Dynamic404 = dynamic(() => import('../../../../404'), { loading: () => <MyLoading /> })

const RenderContent = {
    pageA: <DynamicPageA />,
    'blog-list': <DynamicBlogList />,
    'write-something': <DynamicPageC />,
    '404': <Dynamic404 />
}

export default ({ routerKey }: { routerKey: IRouterKey[] }) => {
    const { token } = theme.useToken()
    console.log(RenderContent[routerKey[0]], 'RenderContent[routerKey[0]]')
    const ContentStyle = { margin: '24px 16px', padding: 24, minHeight: 280, background: token.colorBgContainer }

    return <Content style={ContentStyle}>{RenderContent[routerKey[0]]}</Content>
}
