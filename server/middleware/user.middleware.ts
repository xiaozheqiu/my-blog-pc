import UserService from '../services/user.service'
import { NextApiRequest, NextApiResponse } from 'next'
const { getUerInfo } = UserService
import bcrypt from 'bcryptjs'
import dayjs from 'dayjs'

//校验重名
export async function verifyUserSameName(request: NextApiRequest, response: NextApiResponse, next: Function) {
    const { account } = request.body
    if (await getUerInfo({ account })) {
        const data = { code: 500, message: '账号名重复' }
        response.status(data.code).json(data)
    } else {
        next()
    }
}

// 校验字段是否缺失
export async function userValidator(request: NextApiRequest, response: NextApiResponse, next: Function) {
    const { account, password } = request.body
    if (!account || !password) {
        const data = { code: 500, message: '账号或密码缺失' }
        response.status(data.code).json(data)
    } else {
        next()
    }
}

// 校验是否存在当前用户
export async function hasUser(request: NextApiRequest, response: NextApiResponse, next: Function) {
    const { account } = request.body
    const userInfo = await getUerInfo({ account })
    if (!userInfo) {
        const data = { code: 500, message: '当前用户不存在' }
        response.status(data.code).json(data)
    } else {
        next()
    }
}

//校验账号密码错误
export async function verifyUserPassword(request: NextApiRequest, response: NextApiResponse, next: Function) {
    const { account, password } = request.body
    const userInfo = await getUerInfo({ account })
    let comparePwd = bcrypt.compareSync(password, userInfo?.password)
    if (!comparePwd) {
        const data = { code: 500, message: '密码错误' }
        response.status(data.code).json(data)
    } else {
        next()
    }
}

// 校验字段是否缺失
export async function hasAdmin(request: NextApiRequest, response: NextApiResponse, next: Function) {
    const { account } = request.body
    const userInfo = await getUerInfo({ account })
    if (!userInfo.is_admin) {
        const data = { code: 500, message: '当前账号无登录权限，请联系管理员' }
        response.status(data.code).json(data)
    } else {
        next()
    }
}

//生成随机字符串
export function getToken() {
    const length = 64
    // 大小写及数字和特殊符组合
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '12345678' + '!@#$%^&*'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    const expirationTime = dayjs().add(1, 'day')
    // 把令牌和过期时间用'/'组合在一起
    return result + '/' + expirationTime
}
