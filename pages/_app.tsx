import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import type { NextWebVitalsMetric } from 'next/app'
import ErrorBoundary from '../components/error-boundary'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'
import 'antd/dist/reset.css'
dayjs.locale('zh-cn')

// // 性能测试
// export function reportWebVitals(metric: NextWebVitalsMetric) {
//     // 第一个字节的时间(TTFB)
//     // First Contentful Paint（FCP）
//     // 最大内容绘画(LCP)
//     // 第一输入延迟(FID)
//     // 累积布局偏移(CLS)
//     // 与 Next Paint (INP)的交互（实验性）
//     // The metric object ({ id, name, startTime, value, label }) is logged to the console
//     console.log(metric, 'metric')
// }

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
