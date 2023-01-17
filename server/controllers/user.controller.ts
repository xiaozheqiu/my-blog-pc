import UserService from '../services/user.service'
import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'

const { createUser, getUerInfo } = UserService

export default class AuthController {
    // 登录
    static async login(request: NextApiRequest, response: NextApiResponse) {
        const { account } = request.body
        const data = await getUerInfo({ account })
        const body = { code: 200, message: '登录成功', data }
        response.status(200).json(body)
    }

    // 注册
    static async register(request: NextApiRequest, response: NextApiResponse) {
        const { account, password } = request.body
        // 密码加密
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        console.log(hashPassword, 'hashPassword')
        await createUser(account, hashPassword)
        const body = { code: 200, message: '用户注册成功' }
        response.status(200).json(body)
    }
}
