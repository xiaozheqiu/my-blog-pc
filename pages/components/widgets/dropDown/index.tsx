import styles from './index.module.scss'

const url = 'https://zheqiu.oss-cn-hangzhou.aliyuncs.com/my-blog-pc/drop-down.svg'

function showMe() {
    const fatherElement = window?.document?.getElementById('showContainer')
    const sonElement = window?.document?.getElementById('test')

    console.log('6')
    if (!fatherElement || !sonElement) {
        return
    }
    const space = sonElement.offsetTop / 20
    let scrollHeight = 0
    const timer = setInterval(() => {
        scrollHeight = space + scrollHeight
        if (sonElement.offsetTop > scrollHeight) {
            fatherElement?.scrollTo(0, scrollHeight || 0)
        } else {
            clearInterval(timer)
        }
    }, 40)
}

export default () => (
    <div className={styles.dropDown} onClick={() => showMe()}>
        <img src={url} alt="" />
    </div>
)
