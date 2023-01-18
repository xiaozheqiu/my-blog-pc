import { post } from './request'

export function api_login(data: any) {
    return post('api/user/login', data)
}

export function api_register(data: any) {
    return post('api/user/register', data)
}
