import BlogService from '../services/blog.service'
import { NextApiRequest, NextApiResponse } from 'next'
const { getBlogList, createBlog, getBlogDetail, updateBlog, deleteBlog } = BlogService

export default class BlogController {
    // 获取博客列表
    static async getBlogList(request: NextApiRequest, response: NextApiResponse) {
        const data = await getBlogList(request.body)
        const body = { code: 200, message: 'success', data }
        response.status(200).json(body)
    }
    // 获取博客列表
    static async createBlog(request: NextApiRequest, response: NextApiResponse) {
        const data = await createBlog(request.body)
        const body = { code: 200, message: 'success', data }
        response.status(200).json(body)
    }
    // 获取博客详情
    static async getBlogDetail(request: NextApiRequest, response: NextApiResponse) {
        const data = await getBlogDetail(request.body)
        const body = { code: 200, message: 'success', data }
        response.status(200).json(body)
    }
    // 更新博客
    static async updateBlog(request: NextApiRequest, response: NextApiResponse) {
        const data = await updateBlog(request.body)
        const body = { code: 200, message: 'success', data }
        response.status(200).json(body)
    }
    // 删除博客
    static async deleteBlog(request: NextApiRequest, response: NextApiResponse) {
        const data = await deleteBlog(request.body)
        const body = { code: 200, message: 'success', data }
        response.status(200).json(body)
    }
}
