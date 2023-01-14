import React from 'react'

interface IProps {
    children: React.ReactNode
}

interface IState {
    hasError: boolean
}

class ErrorBoundary extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        // 定义状态变量以跟踪是否存在错误
        this.state = { hasError: false }
    }
    static getDerivedStateFromError() {
        // 当这个组件的子组件出现报错的时候，会触发，并返回error
        // 开发环境还是会报错，生产环境不会报错 直接显示 要显示的文字
        return { hasError: true }
    }
    componentDidCatch(error: any, errorInfo: any) {
        // 在此处使用自己的错误日志记录服务
        console.log({ error, errorInfo })
    }
    render() {
        // 检查是否抛出错误
        if (this.state.hasError) {
            // 自定义错误界面
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <button type="button" onClick={() => this.setState({ hasError: false })}>
                        Try again?
                    </button>
                </div>
            )
        }
        // 无错误返回子组件
        return this.props.children
    }
}

export default ErrorBoundary
