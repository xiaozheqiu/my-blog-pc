import styles from './index.module.scss'
import { Spin } from 'antd'

export default () => (
    <div className={styles.myLoading}>
        <Spin
            wrapperClassName={styles.mySpin}
            tip="Loading"
            // indicator={<img src={'https://zheqiu.oss-cn-hangzhou.aliyuncs.com/my-blog-pc/loading-one.svg'} alt={''} />}
        />
    </div>
)
