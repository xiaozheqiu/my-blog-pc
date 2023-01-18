import '../styles/globals.css'
import 'antd/dist/reset.css'
import type { AppProps } from 'next/app'
import ErrorBoundary from '../components/error-boundary'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'

dayjs.locale('zh-cn')

export { reportWebVitals } from 'next-axiom'

export default function App({ Component, pageProps }: AppProps) {
    return (
        // 添加错误监听
        <ErrorBoundary>
            <ConfigProvider theme={{ token: { wireframe: false, colorPrimary: '#2c3e50' } }} locale={zhCN}>
                <Component {...pageProps} />
            </ConfigProvider>
        </ErrorBoundary>
    )
}
