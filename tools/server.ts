import { post } from './request'

// 后台登录接口
export function api_login(data: any) {
    return post('api/user/login', data)
}

// 后台注册接口
export function api_register(data: any) {
    return post('api/user/register', data)
}

// 获取博客列表接口
export function getBlogList(data: any) {
    return post('api/blog/list', data)
}

// 创建博客
export function createBlog(data: any) {
    return post('api/blog/create', data)
}

// 获取博客详情
export function getBlogDetail(id: string) {
    return post('api/blog/get', { id })
}

// 获取博客详情
export function updateBlog(data: any) {
    console.log(66)
    return post('api/blog/update', data)
}

// 获取博客详情
export function deleteBlog(id: string) {
    console.log(66)
    return post('api/blog/delete', { id })
}
