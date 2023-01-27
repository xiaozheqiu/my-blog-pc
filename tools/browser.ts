import { IRouterKey, routerKey } from '../admin/components/admin-layout/components/my-menu'

export default class Browser {
    // 获取并解析url参数
    static getQueryParams(url: string) {
        const paramArr = url.slice(url.indexOf('?') + 1).split('&')
        const params: { [key: string]: any } = {}
        if (paramArr[0] === '') return params
        paramArr.map((param) => {
            const [key, val] = param.split('=')
            params[key] = decodeURIComponent(val)
        })
        return params
    }

    // 判断是否为未知路由
    static getMyRoute(key: IRouterKey): Partial<IRouterKey> {
        if (!routerKey.includes(key)) {
            return '404'
        } else return key
    }

    // 向当前url添加参数，没有历史记录
    static updateBowserUrl(data?: { [key: string]: string }) {
        let newUrl: string
        if (!data) {
            newUrl = window.location.href.split('?')[0]
        } else {
            newUrl = window.location.href
            for (const key in data) {
                newUrl = this.updateQueryStringParameter(newUrl, key, data[key])
            }
        }

        window.history.replaceState({ path: newUrl }, '', newUrl)
    }
    // 补充bowser url参数
    static updateQueryStringParameter(url: string, key: string, value: string) {
        if (!value) {
            return url
        }
        const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
        const separator = url.indexOf('?') !== -1 ? '&' : '?'
        if (url.match(re)) {
            return url.replace(re, '$1' + key + '=' + value + '$2')
        } else {
            return url + separator + key + '=' + value
        }
    }
}
