import Blog from '../models/blog.model'
import { formatMySqlQuery } from '../../tools/format'
const { Op } = require('sequelize')

interface IBlogParams {
    title: string
    releaseTime: string
    status: number
    type: number
    content: string
    startTime: number
    endTime: number
    page: number
    size: number
    date: string
    id: string
}

class BlogService {
    async getBlogList(Params: Partial<IBlogParams>) {
        const { title, date, status, type } = Params
        let whereQuery = {
            title: { [Op.like]: `%${title || ''}%` },
            releaseTime: date ? { [Op.between]: date.split(',') } : null,
            status,
            type
        }
        whereQuery = formatMySqlQuery(whereQuery)
        return await Blog.findAll({ where: whereQuery })
    }

    async createBlog(Params: Partial<IBlogParams>) {
        const { title, releaseTime, status, type, content } = Params
        const res = await Blog.create({ title, releaseTime, status, type, content })
        return res.dataValues
    }

    async getBlogDetail(Params: Partial<IBlogParams>) {
        const { id } = Params
        const res = await Blog.findOne({ where: { id } })
        return res?.dataValues
    }

    async updateBlog(Params: Partial<IBlogParams>) {
        const { title, date, status, type, releaseTime, id, content } = Params
        const updateData = formatMySqlQuery({ title, date, status, type, releaseTime, content })
        return await Blog.update(updateData, { where: { id } })
    }

    async deleteBlog(Params: Partial<IBlogParams>) {
        const { id } = Params
        return await Blog.destroy({ where: { id } })
    }
}

export default new BlogService()
