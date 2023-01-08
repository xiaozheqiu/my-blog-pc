import styles from '../styles/index.module.scss'
import Layout from './components/layout'
import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'
import { items } from './static'
import TimeTools from './tools/timetools'
import DropDown from './components/widgets/dropDown'

const { getWebsiteRuntime } = new TimeTools()

/*
 * 首页
 * */
export default function Index() {
    const [websiteRuntime, setWebsiteRuntime] = useState('')
    // 使用canvas画布背景
    useEffect(() => {
        const CanvasNest = require('canvas-nest.js')
        const config = { count: 300, zIndex: 1, color: '169,169,169', opacity: 1 }
        // 在指定元素使用 config 渲染效果
        const cn = new CanvasNest(window.document.getElementById('__next'), config)
        // destroy
        return () => cn.destroy()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => setWebsiteRuntime(getWebsiteRuntime()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <Layout>
            <div className={styles.index}>
                <div className={styles.introduce}>
                    <h1 className={styles.user}>zheqiu</h1>
                    <h2 className={styles.motto}>Do what you say,say what you do.</h2>
                    <div className={styles.items}>
                        {items.map((item, index) => (
                            <Fragment key={index}>
                                <Image src={item.src} height={20} width={20} alt={''} />
                                <span className={styles.itemsLabel}>{item.label}</span>
                                {index < items.length - 1 && <span> | </span>}
                            </Fragment>
                        ))}
                    </div>
                    <div className={styles.myGithub}>
                        <a href="https://github.com/xiaozheqiu/my-blog-pc" target={'_blank'}>
                            How this page works.
                        </a>
                    </div>
                    <div className={styles.about}>
                        <div className={styles.howCreate}>
                            📝博客主题
                            <a href="https://github.com/idealclover/Clover" target={'_blank'}>
                                clover
                            </a>
                            由
                            <a href="https://idealclover.top/" target={'_blank'}>
                                idealclover
                            </a>
                            用<span style={{ color: 'red' }}>❤</span> 制作
                        </div>
                        <div className={styles.power}>
                            © 2023{' '}
                            <a href="https://xiaozheqiu.vercel.app/" target={'_blank'}>
                                zheqiu
                            </a>
                            . Powered by<a href={'https://vercel.com/'}> Vercel</a>
                        </div>
                        <div>网站已悄悄运行{websiteRuntime}</div>
                    </div>
                    <DropDown />
                </div>
                <div style={{ height: 2000, background: '#fff' }} id={'test'}></div>
            </div>
        </Layout>
    )
}
