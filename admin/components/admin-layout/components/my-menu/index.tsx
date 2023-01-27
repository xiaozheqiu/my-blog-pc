import { Menu } from 'antd'
import React from 'react'
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useStore } from '../../index'
import Browser from '../../../../../tools/browser'
export type IRouterKey = 'pageA' | 'blog-list' | 'blog' | '404'
export const routerKey = ['pageA', 'blog-list', 'blog', '404']
type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}

export const items: MenuItem[] = [
    getItem('pageA', 'pageA', <PieChartOutlined />),
    getItem('文章列表', 'blog-list', <DesktopOutlined />),
    getItem('写文章', 'blog', <DesktopOutlined />)
]

export default () => {
    const { menuKey, setMenuKey } = useStore()
    const onMenuClick = ({ key }: { key: string }) => {
        setMenuKey([key])
        Browser.updateBowserUrl()
    }
    return <Menu theme="dark" mode="inline" items={items} onClick={onMenuClick} selectedKeys={menuKey} />
}
