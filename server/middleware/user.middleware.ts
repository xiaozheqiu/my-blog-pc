import UserService from '../services/user.service'
import { NextApiRequest, NextApiResponse } from 'next'
const { getUerInfo } = UserService
import bcrypt from 'bcryptjs'

//校验重名
export const verifyUserSameName = async (request: NextApiRequest, response: NextApiResponse, next: Function) => {
    const { account } = request.body
    if (await getUerInfo({ account })) {
        const data = { code: 500, msg: '账号名重复' }
        response.status(data.code).json(data)
    } else {
        next()
    }
}

// 校验字段是否缺失
export const userValidator = async (request: NextApiRequest, response: NextApiResponse, next: Function) => {
    const { account, password } = request.body
    if (!account || !password) {
        const data = { code: 500, msg: '账号或密码缺失' }
        response.status(data.code).json(data)
    } else {
        next()
    }
}

// 校验是否存在当前用户
export const hasUser = async (request: NextApiRequest, response: NextApiResponse, next: Function) => {
    const { account } = request.body
    const userInfo = await getUerInfo({ account })
    if (!userInfo) {
        const data = { code: 500, msg: '当前用户不存在' }
        response.status(data.code).json(data)
    } else {
        next()
    }
}

//校验账号密码错误
export const verifyUserPassword = async (request: NextApiRequest, response: NextApiResponse, next: Function) => {
    const { account, password } = request.body
    const userInfo = await getUerInfo({ account })
    let comparePwd = bcrypt.compareSync(password, userInfo?.password)
    if (!comparePwd) {
        const data = { code: 500, msg: '密码错误' }
        response.status(data.code).json(data)
    } else {
        next()
    }
}
