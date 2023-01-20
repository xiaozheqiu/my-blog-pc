import { IRouterKey, routerKey } from '../admin/components/admin-layout/components/my-menu'

// 获取并解析url参数
export function getQueryParams(url: string) {
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
export function getMyRoute(key: IRouterKey): Partial<IRouterKey> {
    if (!routerKey.includes(key)) {
        return '404'
    } else return key
}
