import React from 'react'
import { Layout, theme } from 'antd'
import dynamic from 'next/dynamic'
import { IRouterKey } from '../my-menu'
const { Content } = Layout

const DynamicPageA = dynamic(() => import('../../../../pageA'), {
    loading: () => <div>'Loading...'</div>
})

const DynamicPageB = dynamic(() => import('../../../../pageB'), {
    loading: () => <div>'Loading...'</div>
})
const DynamicPageC = dynamic(() => import('../../../../pageC'), {
    loading: () => <div>'Loading...'</div>
})
const RenderContent = {
    pageA: <DynamicPageA />,
    pageB: <DynamicPageB />,
    pageC: <DynamicPageC />
}

export default ({ routerKey }: { routerKey: IRouterKey[] }) => {
    const { token } = theme.useToken()

    const ContentStyle = { margin: '24px 16px', padding: 24, minHeight: 280, background: token.colorBgContainer }

    return <Content style={ContentStyle}>{RenderContent[routerKey[0]]}</Content>
}
