import React, { useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, theme } from 'antd'
import styles from './index.module.scss'
import Head from 'next/head'
import MyMenu, { IRouterKey } from './components/my-menu'
import MyContent from './components/my-content'
import dynamic from 'next/dynamic'
import MyLoading from './components/my-loading'
import { getAdminToken } from '../../../tools/storage'
import { getMyRoute, getQueryParams } from '../../../tools/browser'
const { Header, Sider } = Layout

const DynamicLogin = dynamic(() => import('../../login'), { loading: () => <MyLoading /> })

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [menuKey, setMenuKey] = useState<Partial<IRouterKey>[]>(['write-something'])
    const [adminToken, setAdminToken] = useState('none')
    const { token } = theme.useToken()

    useEffect(() => {
        const { componentName } = getQueryParams(window.location.search)
        setMenuKey([getMyRoute(componentName || 'write-something')])
        setAdminToken(getAdminToken() || '')
    }, [])

    const LayoutComponent = (
        <Layout className={styles.layout}>
            <Head>
                <title>小折秋</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <link
                    rel="icon"
                    href="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5f7e3460-38bd-45dd-848a-d56d8287d2f9/54907a64-8c8b-476e-898b-31c5b64a0313.ico"
                />
            </Head>

            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={styles.logo}>
                    <img
                        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5f7e3460-38bd-45dd-848a-d56d8287d2f9/54907a64-8c8b-476e-898b-31c5b64a0313.ico"
                        alt={'logo'}
                    />
                    <span> blog-admin </span>
                </div>
                <MyMenu menuKey={menuKey} setMenuKey={setMenuKey} />
            </Sider>

            <Layout className="site-layout">
                <Header style={{ padding: 0, background: token?.colorBgContainer }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: styles.trigger,
                        onClick: () => setCollapsed(!collapsed)
                    })}
                </Header>
                <MyContent routerKey={menuKey} />
            </Layout>
        </Layout>
    )

    return adminToken ? LayoutComponent : <DynamicLogin />
}

export default App
