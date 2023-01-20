import { Result, Button } from 'antd'
import styles from './index.module.scss'
export default () => (
    <div className={styles.notfound}>
        <Result
            status="404"
            title="404"
            subTitle="抱歉，您访问的页面不存在。"
            extra={
                <Button type="primary" onClick={() => window.open('/admin', '_self')}>
                    返回首页
                </Button>
            }
        />
    </div>
)
