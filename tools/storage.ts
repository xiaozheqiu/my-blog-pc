import Cookies from 'js-cookie'

// 设置后台校验token
export function setAdminToken(value: any) {
    Cookies.set('my_blog_admin_token', value)
}

// 获取后台校验token
export function getAdminToken() {
    return Cookies.get('my_blog_admin_token')
}
