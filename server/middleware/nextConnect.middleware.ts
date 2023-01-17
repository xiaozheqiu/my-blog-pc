import { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment/moment'
const Console = require('Console')

// 错误监听
export const onError = (err: any, request: NextApiRequest, response: NextApiResponse) => {
    console.error(err.stack)
    response.status(500).end('Something broke!')
}

// 匹配错误
export const onNoMatch = (request: NextApiRequest, response: NextApiResponse) => {
    response.status(404).end('api is not found')
}

// 请求日志
export const logger = (request: NextApiRequest, response: NextApiResponse, next: Function) => {
    const { body, query, url, method } = request
    Console.success(
        moment().format('YYYY-MM-DD HH:mm:ss'),
        method,
        url,
        `query:${JSON.stringify(query)}`,
        `body:${JSON.stringify(body)}`
    )
    next()
}
