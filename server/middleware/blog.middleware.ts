// 是否存在cookie
import { NextApiRequest, NextApiResponse } from 'next'

// 是否有cookie
export async function hasCookie(request: NextApiRequest, response: NextApiResponse, next: Function) {
    let cookie = request.cookies?.my_blog_admin_token
    if (!cookie) {
        const data = { code: 500, message: '权限不足' }
        response.status(data.code).json(data)
    } else next()
}

//校验创建接口参数是否缺失
export async function verifyCreateQuery(request: NextApiRequest, response: NextApiResponse, next: Function) {
    const { title, releaseTime, status, type } = request.body
    if (!title || !releaseTime || !status || !type) {
        const data = { code: 500, message: '参数缺失' }
        response.status(data.code).json(data)
    } else {
        next()
    }
}

//校验博客相关接口id参数是否缺失
export async function verifyIdQuery(request: NextApiRequest, response: NextApiResponse, next: Function) {
    const { id } = request.body
    if (!id) {
        const data = { code: 500, message: '参数缺失' }
        response.status(data.code).json(data)
    } else {
        next()
    }
}
