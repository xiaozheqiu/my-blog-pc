// 配置展示菜单
import React from 'react'

export const toolbars: any = [
    'bold',
    'underline',
    'italic',
    '-',
    'strikeThrough',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    'task',
    '-',
    'codeRow',
    'code',
    'link',
    'image',
    'table',
    'mermaid',
    'katex',
    '-',
    'revoke',
    'next',
    'save',
    '=',
    'pageFullscreen',
    'fullscreen',
    'htmlPreview',
    'catalog',
    0
]

// 自定义工具配置项
export const myPreviewConfigToolbar = {
    title: '预览',
    key: 'my-preview-md',
    trigger: (
        <img
            src="https://zheqiu.oss-cn-hangzhou.aliyuncs.com/my-blog-pc/md-editer-preview.svg"
            alt=""
            style={{ height: 24 }}
        />
    )
}
